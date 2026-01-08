import 'dotenv/config';
import { db } from '../src/db/db';
import { users, accounts } from '../src/db/schema/users.schema';
import { eq } from 'drizzle-orm';
import * as crypto from 'crypto';

// Hash password using better-auth compatible method (scrypt)
async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

async function seedMasterAdmin() {
  const email = process.env.MASTER_ADMIN_EMAIL || 'admin@keystoneyouthsoccer.org';
  const password = process.env.MASTER_ADMIN_PASSWORD;
  const name = process.env.MASTER_ADMIN_NAME || 'Master Admin';

  if (!password) {
    console.error('❌ MASTER_ADMIN_PASSWORD environment variable is required');
    console.log('   Set it in your .env file or pass it as an environment variable');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('❌ Password must be at least 8 characters long');
    process.exit(1);
  }

  console.log('🔐 Seeding master admin account...');
  console.log(`   Email: ${email}`);
  console.log(`   Name: ${name}`);

  try {
    // Check if master admin already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
      const existing = existingUser[0];
      if (existing.isMasterAdmin) {
        console.log('⚠️  Master admin already exists with this email');
        console.log(`   User ID: ${existing.id}`);

        // Update to ensure master admin flags are set
        await db
          .update(users)
          .set({
            isMasterAdmin: true,
            isApproved: true,
            role: 'admin',
            updatedAt: new Date(),
          })
          .where(eq(users.id, existing.id));

        console.log('✅ Updated existing user to ensure master admin privileges');
        return existing;
      } else {
        // Upgrade existing user to master admin
        console.log('📈 Upgrading existing user to master admin...');
        const [updated] = await db
          .update(users)
          .set({
            isMasterAdmin: true,
            isApproved: true,
            role: 'admin',
            updatedAt: new Date(),
          })
          .where(eq(users.id, existing.id))
          .returning();

        console.log('✅ User upgraded to master admin');
        return updated;
      }
    }

    // Create new master admin user
    const hashedPassword = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({
        email,
        name,
        role: 'admin',
        isMasterAdmin: true,
        isApproved: true,
        emailVerified: true,
      })
      .returning();

    console.log('✅ Created master admin user');
    console.log(`   User ID: ${newUser.id}`);

    // Create credential account for the user
    await db.insert(accounts).values({
      userId: newUser.id,
      type: 'credential',
      provider: 'credential',
      providerAccountId: newUser.id,
      accessToken: hashedPassword, // Store hashed password
    });

    console.log('✅ Created credential account');
    console.log('\n🎉 Master admin setup complete!');
    console.log('\n📝 Login credentials:');
    console.log(`   Email: ${email}`);
    console.log('   Password: [as configured in environment]');
    console.log('\n⚠️  IMPORTANT: Change the default password after first login!');

    return newUser;
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
