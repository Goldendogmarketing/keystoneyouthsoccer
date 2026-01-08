import 'dotenv/config';
import { db } from '../src/db/db';
import { users, accounts } from '../src/db/schema/users.schema';
import { eq } from 'drizzle-orm';

async function check() {
  const email = 'goldendogcapital@gmail.com';
  console.log(`Checking user: ${email}`);

  const [user] = await db.select().from(users).where(eq(users.email, email));
  console.log('User:', JSON.stringify(user, null, 2));

  if (user) {
    const accs = await db.select().from(accounts).where(eq(accounts.userId, user.id));
    console.log('Accounts:', JSON.stringify(accs, null, 2));
  }
}

check().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
