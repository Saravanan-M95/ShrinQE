import { User, sequelize } from './src/models/index.js';

async function verify() {
  try {
    console.log('--- 🧪 Final SERIAL-style Verification ---');
    const testEmail = `final_test_${Date.now()}@example.com`;
    
    console.log(`Attempting to create user with email: ${testEmail}`);
    const user = await User.create({
      email: testEmail,
      name: 'Final Recovery User',
      provider: 'local',
      isVerified: false
    });
    
    console.log('✅ Success! Created user with ID:', user.id);
    
    // Clean up
    await user.destroy();
    console.log('✅ Verification user cleaned up.');

  } catch (err) {
    console.error('❌ Verification failed:', err.message);
    if (err.parent) {
      console.error('SQL State:', err.parent.code);
      console.error('Failing Query:', err.parent.query);
    }
  } finally {
    await sequelize.close();
  }
}

verify();
