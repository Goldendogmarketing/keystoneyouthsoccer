import 'dotenv/config';
import { db } from '../src/db/db';
import { sql } from 'drizzle-orm';

async function updateAccountsSchema() {
  console.log('Updating accounts table schema for Better Auth compatibility...');

  try {
    // Add new required columns
    console.log('Adding account_id column...');
    await db.execute(sql`
      ALTER TABLE accounts
      ADD COLUMN IF NOT EXISTS account_id TEXT
    `);

    console.log('Adding provider_id column...');
    await db.execute(sql`
      ALTER TABLE accounts
      ADD COLUMN IF NOT EXISTS provider_id TEXT
    `);

    console.log('Adding access_token_expires_at column...');
    await db.execute(sql`
      ALTER TABLE accounts
      ADD COLUMN IF NOT EXISTS access_token_expires_at TIMESTAMP
    `);

    console.log('Adding refresh_token_expires_at column...');
    await db.execute(sql`
      ALTER TABLE accounts
      ADD COLUMN IF NOT EXISTS refresh_token_expires_at TIMESTAMP
    `);

    console.log('Adding created_at column...');
    await db.execute(sql`
      ALTER TABLE accounts
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW()
    `);

    console.log('Adding updated_at column...');
    await db.execute(sql`
      ALTER TABLE accounts
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW()
    `);

    // Migrate data from old columns to new columns if they exist
    console.log('Migrating data from old columns...');
    await db.execute(sql`
      UPDATE accounts
      SET
        account_id = COALESCE(account_id, provider_account_id, user_id::text),
        provider_id = COALESCE(provider_id, provider, 'credential')
      WHERE account_id IS NULL OR provider_id IS NULL
    `);

    // Now make the columns NOT NULL
    console.log('Making account_id NOT NULL...');
    await db.execute(sql`
      ALTER TABLE accounts
      ALTER COLUMN account_id SET NOT NULL
    `);

    console.log('Making provider_id NOT NULL...');
    await db.execute(sql`
      ALTER TABLE accounts
      ALTER COLUMN provider_id SET NOT NULL
    `);

    // Drop old columns that are no longer needed
    console.log('Dropping obsolete columns...');
    await db.execute(sql`
      ALTER TABLE accounts
      DROP COLUMN IF EXISTS type,
      DROP COLUMN IF EXISTS provider,
      DROP COLUMN IF EXISTS provider_account_id,
      DROP COLUMN IF EXISTS expires_at,
      DROP COLUMN IF EXISTS token_type,
      DROP COLUMN IF EXISTS session_state
    `);

    console.log('Schema update complete!');

  } catch (error) {
    console.error('Error updating schema:', error);
    throw error;
  }
}

updateAccountsSchema()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
