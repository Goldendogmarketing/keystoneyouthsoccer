import 'dotenv/config';
import { db } from '../src/db/db';
import { sql } from 'drizzle-orm';

async function addPasswordColumn() {
  console.log('Adding password column to accounts table...');

  try {
    await db.execute(sql`
      ALTER TABLE accounts
      ADD COLUMN IF NOT EXISTS password TEXT
    `);
    console.log('Password column added successfully');
  } catch (error) {
    console.error('Error adding password column:', error);
    throw error;
  }
}

addPasswordColumn()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
