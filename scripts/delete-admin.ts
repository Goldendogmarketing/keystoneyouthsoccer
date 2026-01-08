import 'dotenv/config';
import { db } from '../src/db/db';
import { users, accounts } from '../src/db/schema/users.schema';
import { eq } from 'drizzle-orm';

async function deleteAdmin() {
  const email = process.env.MASTER_ADMIN_EMAIL || 'goldendogcapital@gmail.com';

  console.log(`Deleting user: ${email}`);

  try {
    // Find user
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user) {
      console.log('User not found');
      return;
    }

    // Delete accounts first (foreign key)
    await db.delete(accounts).where(eq(accounts.userId, user.id));
    console.log('Deleted accounts');

    // Delete user
    await db.delete(users).where(eq(users.id, user.id));
    console.log('Deleted user');

    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
  }
}

deleteAdmin().then(() => process.exit(0));
