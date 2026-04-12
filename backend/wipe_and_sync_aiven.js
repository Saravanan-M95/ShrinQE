process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { sequelize, User, Url, Click } from './src/models/index.js';

async function wipeAndSync() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PRODUCTION Aiven Database!');

    console.log('\n--- 🗑️ Step 1: Wiping Legacy Schema ---');
    // Drop in reverse dependency order to avoid foreign key issues
    await Click.drop({ cascade: true });
    console.log('🚮 Dropped "clicks" table');
    await Url.drop({ cascade: true });
    console.log('🚮 Dropped "urls" table');
    await User.drop({ cascade: true });
    console.log('🚮 Dropped "users" table');

    console.log('\n--- 🏗️ Step 2: Rebuilding Modern Schema ---');
    // Sync will recreate all tables based on current model definitions
    await sequelize.sync({ force: true });
    console.log('✅ All tables recreated with modern INTEGER / Sequences schema!');

    console.log('\n--- 🧪 Step 3: Verifying Integer Auto-Increment ---');
    const testUser = await User.create({
      email: `test_integer_${Date.now()}@example.com`,
      name: 'Integer Verification System',
      provider: 'local',
      isVerified: false
    });
    
    console.log(`✅ Success! User generated with Integer ID: ${testUser.id} (${typeof testUser.id})`);
    
    await testUser.destroy();
    console.log('🧹 Verification data cleaned up.');

    console.log('\n🎉 AIVEN DATABASE MIGRATION COMPLETE! 🎉');

  } catch (err) {
    console.error('❌ Wipe failed:', err.message);
  } finally {
    await sequelize.close();
  }
}

wipeAndSync();
