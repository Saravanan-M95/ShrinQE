process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { Sequelize } from 'sequelize';

const dbUrl = process.env.DATABASE_URL;

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  },
});

async function runProdRepair() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PRODUCTION Aiven Database!');

    console.log('--- 🔨 Final DB Identity Removal & Serial Link ---');

    const tables = ['users', 'urls', 'clicks'];

    for (const table of tables) {
      console.log(`\nRepairing table: ${table}...`);
      
      // 1. Remove Identity property if exists
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

      // 3. Set the column default to use the sequence
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

    console.log('\n--- 🎉 Production Platform-wide Repair Finished! ---');

  } catch (err) {
    console.error('❌ Production repair failed:', err.message);
  } finally {
    await sequelize.close();
  }
}

runProdRepair();
