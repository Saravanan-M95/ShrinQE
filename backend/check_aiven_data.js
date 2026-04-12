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

async function checkAivenData() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PRODUCTION Aiven Database!');

    const tables = ['users', 'urls', 'clicks'];
    
    for (const table of tables) {
      const [[{ count }]] = await sequelize.query(`SELECT COUNT(*) as "count" FROM ${table}`);
      console.log(`Table ${table} has ${count} rows.`);
    }

  } catch (err) {
    console.error('❌ Schema check failed:', err.message);
  } finally {
    await sequelize.close();
  }
}

checkAivenData();
