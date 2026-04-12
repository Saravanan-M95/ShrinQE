import { sequelize } from './src/models/index.js';

async function deepDiagnose() {
  try {
    console.log('--- Deep Database Diagnostics ---');
    
    // Check ordinal positions and defaults
    const [columns] = await sequelize.query(`
      SELECT ordinal_position, column_name, data_type, is_nullable, column_default, is_identity, identity_generation
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position;
    `);
    
    console.log('User Table Columns:', JSON.stringify(columns, null, 2));

    // Check if there are any TRIGGERS on the users table
    const [triggers] = await sequelize.query(`
      SELECT tgname, tgtype, tgenabled
      FROM pg_trigger
      WHERE tgrelid = 'users'::regclass;
    `);
    console.log('Triggers:', JSON.stringify(triggers, null, 2));

  } catch (err) {
    console.error('Deep diagnosis failed:', err.message);
  } finally {
    await sequelize.close();
  }
}

deepDiagnose();
