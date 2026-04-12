import { sequelize } from './src/models/index.js';

async function checkDefaults() {
  try {
    const [results] = await sequelize.query(`
      SELECT column_name, column_default, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users' AND column_name = 'id';
    `);
    console.log('Database URL used:', sequelize.config.host);
    console.log('users id column details:', results);
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}
checkDefaults();
