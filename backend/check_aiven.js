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

async function checkAivenSchema() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PRODUCTION Aiven Database!');

    const [columns] = await sequelize.query(`
      SELECT column_name, data_type, column_default, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users';
    `);
    
    console.log('User Table Columns in Aiven:', JSON.stringify(columns, null, 2));

  } catch (err) {
    console.error('❌ Schema check failed:', err.message);
  } finally {
    await sequelize.close();
  }
}

checkAivenSchema();
