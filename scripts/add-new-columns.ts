import 'dotenv/config';
import { db } from '../src/db/db';
import { sql } from 'drizzle-orm';

async function addNewColumns() {
  console.log('Adding new columns to database...\n');

  try {
    // Add columns to users table
    console.log('Adding columns to users table...');

    await db.execute(sql`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS is_master_admin boolean DEFAULT false NOT NULL,
      ADD COLUMN IF NOT EXISTS is_approved boolean DEFAULT false NOT NULL,
      ADD COLUMN IF NOT EXISTS approved_by uuid,
      ADD COLUMN IF NOT EXISTS approved_at timestamp
    `);
    console.log('✅ Users table updated\n');

    // Add columns to events table
    console.log('Adding columns to events table...');

    await db.execute(sql`
      ALTER TABLE events
      ADD COLUMN IF NOT EXISTS away_team_id uuid REFERENCES teams(id) ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS away_team_name text,
      ADD COLUMN IF NOT EXISTS age_group text,
      ADD COLUMN IF NOT EXISTS season_id uuid REFERENCES seasons(id) ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS home_score integer,
      ADD COLUMN IF NOT EXISTS away_score integer,
      ADD COLUMN IF NOT EXISTS game_status text DEFAULT 'scheduled'
    `);
    console.log('✅ Events table updated\n');

    console.log('🎉 All columns added successfully!');
  } catch (error) {
    console.error('❌ Error adding columns:', error);
    throw error;
  }
}

addNewColumns()
  .then(() => {
    console.log('\nDone!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
