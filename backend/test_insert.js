import { User, sequelize } from './src/models/index.js';

async function testInsert() {
  try {
    console.log('--- Test Insert ---');
    const testEmail = `test_${Date.now()}@example.com`;
    
    console.log(`Attempting to create user with email: ${testEmail}`);
    const user = await User.create({
      email: testEmail,
      name: 'Test User',
      provider: 'local',
      isVerified: false
    });
    
    console.log('✅ Success! Created user with ID:', user.id);
    
    // Clean up
    await user.destroy();
    console.log('✅ Test user cleaned up');

  } catch (err) {
    console.error('❌ Insert failed:', err.message);
    if (err.parent) {
      console.error('Core error detail:', err.parent.detail);
      console.error('Query executed:', err.parent.query);
      console.error('Parameters:', err.parent.parameters);
    }
  } finally {
    await sequelize.close();
  }
}

testInsert();
