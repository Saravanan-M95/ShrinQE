import { sequelize } from './src/models/index.js';

async function finalRepair() {
  try {
    console.log('--- 🔨 Final DB Identity Removal & Serial Link ---');

    const tables = ['users', 'urls', 'clicks'];

    for (const table of tables) {
      console.log(`\nRepairing table: ${table}...`);
      
      // 1. Remove Identity property
      // We do this because Identity seems to be failing to drive the DEFAULT keyword in this environment.
      await sequelize.query(`
        ALTER TABLE "${table}" ALTER COLUMN "id" DROP IDENTITY IF EXISTS;
      `);

      // 2. Ensure sequence exists and is owned by the column
      const sequenceName = `${table}_id_seq`;
      console.log(`Linking sequence: ${sequenceName}`);
      
      await sequelize.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = '${sequenceName}' AND relkind = 'S') THEN
            CREATE SEQUENCE ${sequenceName};
          END IF;
        END $$;
      `);

      // 3. Set the column default to use the sequence (The SERIAL way)
      await sequelize.query(`
        ALTER TABLE "${table}" ALTER COLUMN "id" SET DEFAULT nextval('${sequenceName}');
      `);

      // 4. Link sequence to column ownership
      await sequelize.query(`
        ALTER SEQUENCE ${sequenceName} OWNED BY "${table}"."id";
      `);

      // 5. Sync sequence value
      const [[{ maxId }]] = await sequelize.query(`SELECT MAX(id) as "maxId" FROM "${table}"`);
      const startValue = (maxId || 0) + 1;
      await sequelize.query(`SELECT setval('${sequenceName}', ${startValue}, false);`);
      
      console.log(`✅ Table "${table}" converted to SERIAL-style. Next ID: ${startValue}`);
    }

    console.log('\n--- 🎉 Platform-wide Repair Finished! ---');

  } catch (err) {
    console.error('❌ Repair failed:', err.message);
  } finally {
    await sequelize.close();
  }
}

finalRepair();
