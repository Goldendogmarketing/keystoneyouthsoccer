import 'dotenv/config';
import { db } from '../src/db/db';
import { users, accounts } from '../src/db/schema/users.schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

// Hash password the same way better-auth does (bcrypt-like with scrypt)
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString('hex')}`;
}

async function seedMasterAdmin() {
  const email = process.env.MASTER_ADMIN_EMAIL || 'admin@keystoneyouthsoccer.org';
  const password = process.env.MASTER_ADMIN_PASSWORD;
  const name = process.env.MASTER_ADMIN_NAME || 'Master Admin';

  if (!password) {
    console.error('❌ MASTER_ADMIN_PASSWORD environment variable is required');
    process.exit(1);
  }

  console.log('🔐 Seeding master admin account...');
  console.log(`   Email: ${email}`);
  console.log(`   Name: ${name}`);

  try {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
      console.log('⚠️  User already exists, updating to master admin...');

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Update user
      await db
        .update(users)
        .set({
          isMasterAdmin: true,
          isApproved: true,
          role: 'admin',
          emailVerified: true,
          updatedAt: new Date(),
        })
        .where(eq(users.id, existingUser[0].id));

      // Update or create credential account
      const existingAccount = await db
        .select()
        .from(accounts)
        .where(eq(accounts.userId, existingUser[0].id))
        .limit(1);

      if (existingAccount.length > 0) {
        await db
          .update(accounts)
          .set({ password: hashedPassword })
          .where(eq(accounts.id, existingAccount[0].id));
      } else {
        await db.insert(accounts).values({
          userId: existingUser[0].id,
          type: 'credential',
          provider: 'credential',
          providerAccountId: existingUser[0].id,
          password: hashedPassword,
        });
      }

      console.log('✅ User updated to master admin');
      return;
    }

    // Create new user
    const userId = randomUUID();
    const hashedPassword = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({
        id: userId,
        email,
        name,
        role: 'admin',
        isMasterAdmin: true,
        isApproved: true,
        emailVerified: true,
      })
      .returning();

    console.log('✅ Created user');
    console.log(`   User ID: ${newUser.id}`);

    // Create credential account with hashed password
    await db.insert(accounts).values({
      userId: newUser.id,
      type: 'credential',
      provider: 'credential',
      providerAccountId: newUser.id,
      password: hashedPassword,
    });

    console.log('✅ Created credential account');
    console.log('\n🎉 Master admin setup complete!');
    console.log('\n📝 Login credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);

  } catch (error) {
    console.error('❌ Error:', error);
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
