import 'dotenv/config';
import { db } from '../src/db/db';
import { sql } from 'drizzle-orm';

async function updateSessionsSchema() {
  console.log('Updating sessions table schema for Better Auth compatibility...');

  try {
    // Check if old column exists and rename
    console.log('Renaming session_token to token...');
    await db.execute(sql`
      ALTER TABLE sessions
      RENAME COLUMN session_token TO token
    `).catch(() => console.log('  session_token column may already be renamed or does not exist'));

    console.log('Renaming expires to expires_at...');
    await db.execute(sql`
      ALTER TABLE sessions
      RENAME COLUMN expires TO expires_at
    `).catch(() => console.log('  expires column may already be renamed or does not exist'));

    console.log('Adding created_at column...');
    await db.execute(sql`
      ALTER TABLE sessions
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW()
    `);

    console.log('Adding updated_at column...');
    await db.execute(sql`
      ALTER TABLE sessions
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW()
    `);

    console.log('Schema update complete!');

  } catch (error) {
    console.error('Error updating schema:', error);
    throw error;
  }
}

updateSessionsSchema()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
