import { sequelize } from './src/models/index.js';

async function diagnose() {
  try {
    console.log('--- Database Diagnostics ---');
    
    // Check table structure
    const [columns] = await sequelize.query(`
      SELECT column_name, data_type, column_default, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users' AND column_name = 'id';
    `);
    
    console.log('ID Column Details:', JSON.stringify(columns, null, 2));

    // Check sequences
    const [sequences] = await sequelize.query(`
      SELECT relname as sequence_name
      FROM pg_class
      WHERE relkind = 'S';
    `);
    
    console.log('Available Sequences:', JSON.stringify(sequences, null, 2));

    // Check if id is set to nextval
    if (columns.length > 0 && !columns[0].column_default) {
      console.log('❌ ALERT: The "id" column has NO default value. Auto-increment is broken.');
    } else {
      console.log('✅ The "id" column has a default:', columns[0]?.column_default);
    }

  } catch (err) {
    console.error('Diagnostic failed:', err.message);
  } finally {
    await sequelize.close();
  }
}

diagnose();
