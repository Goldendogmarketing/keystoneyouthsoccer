import 'dotenv/config';
import { db } from '../src/db/db';
import { users, accounts } from '../src/db/schema/users.schema';
import { eq } from 'drizzle-orm';
import { auth } from '../src/lib/auth/auth';

async function seedMasterAdmin() {
  const email = process.env.MASTER_ADMIN_EMAIL || 'admin@keystoneyouthsoccer.org';
  const password = process.env.MASTER_ADMIN_PASSWORD;
  const name = process.env.MASTER_ADMIN_NAME || 'Master Admin';

  if (!password) {
    console.error('❌ MASTER_ADMIN_PASSWORD environment variable is required');
    process.exit(1);
  }

  console.log('🔐 Seeding master admin account using Better Auth...');
  console.log(`   Email: ${email}`);
  console.log(`   Name: ${name}`);

  try {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
      console.log('⚠️  User with this email already exists');
      console.log(`   User ID: ${existingUser[0].id}`);

      // Update to ensure master admin flags are set
      await db
        .update(users)
        .set({
          isMasterAdmin: true,
          isApproved: true,
          role: 'admin',
          updatedAt: new Date(),
        })
        .where(eq(users.id, existingUser[0].id));

      console.log('✅ Updated existing user to master admin');
      return;
    }

    // Use better-auth's internal API to sign up the user
    // This properly hashes the password
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (!response || !response.user) {
      throw new Error('Failed to create user via Better Auth');
    }

    console.log('✅ Created user via Better Auth');
    console.log(`   User ID: ${response.user.id}`);

    // Now update the user to be master admin
    await db
      .update(users)
      .set({
        role: 'admin',
        isMasterAdmin: true,
        isApproved: true,
        emailVerified: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, response.user.id));

    console.log('✅ Updated user to master admin');
    console.log('\n🎉 Master admin setup complete!');
    console.log('\n📝 Login credentials:');
    console.log(`   Email: ${email}`);
    console.log('   Password: [as configured in environment]');

  } catch (error) {
    console.error('❌ Error seeding master admin:', error);
    throw error;
  }
}

seedMasterAdmin()
  .then(() => {
    console.log('\nDone!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
