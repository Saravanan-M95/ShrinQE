import { sequelize } from './src/models/index.js';

async function checkConstraints() {
  try {
    console.log('--- Constraint Check ---');
    
    // Check for primary key and other constraints
    const [constraints] = await sequelize.query(`
      SELECT conname, contype, pg_get_constraintdef(c.oid)
      FROM pg_constraint c
      JOIN pg_namespace n ON n.oid = c.connamespace
      WHERE n.nspname = 'public' AND conrelid = 'users'::regclass;
    `);
    
    console.log('Constraints:', JSON.stringify(constraints, null, 2));

    // Check description of the table
    const [tableInfo] = await sequelize.query(`
      SELECT column_name, column_default, is_nullable, data_type
      FROM information_schema.columns
      WHERE table_name = 'users';
    `);
    
    console.log('Full Table Info:', JSON.stringify(tableInfo, null, 2));

  } catch (err) {
    console.error('Check failed:', err.message);
  } finally {
    await sequelize.close();
  }
}

checkConstraints();
