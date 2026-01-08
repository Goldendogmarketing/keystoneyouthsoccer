import 'dotenv/config';
import { db } from '../src/db/db';
import { sql } from 'drizzle-orm';

async function createMissingTables() {
  console.log('Creating missing tables...\n');

  try {
    // Create events table
    console.log('Creating events table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS events (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title text NOT NULL,
        description text,
        type text DEFAULT 'event' NOT NULL,
        date timestamp NOT NULL,
        end_date timestamp,
        time text NOT NULL,
        location text NOT NULL,
        team_id uuid REFERENCES teams(id) ON DELETE SET NULL,
        team_name text,
        away_team_id uuid REFERENCES teams(id) ON DELETE SET NULL,
        away_team_name text,
        opponent text,
        age_group text,
        season_id uuid REFERENCES seasons(id) ON DELETE SET NULL,
        home_score integer,
        away_score integer,
        game_status text DEFAULT 'scheduled',
        is_all_day boolean DEFAULT false NOT NULL,
        is_cancelled boolean DEFAULT false NOT NULL,
        created_by uuid REFERENCES users(id),
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Events table created\n');

    // Create games table (legacy)
    console.log('Creating games table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS games (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        home_team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
        away_team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
        scheduled_at timestamp NOT NULL,
        location text NOT NULL,
        type text DEFAULT 'regular' NOT NULL,
        status text DEFAULT 'scheduled' NOT NULL,
        home_score integer,
        away_score integer,
        notes text,
        season_id uuid REFERENCES seasons(id) ON DELETE CASCADE,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Games table created\n');

    // Create practices table
    console.log('Creating practices table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS practices (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
        scheduled_at timestamp NOT NULL,
        location text NOT NULL,
        duration_minutes integer DEFAULT 60,
        notes text,
        is_cancelled boolean DEFAULT false NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Practices table created\n');

    // Create schedules table (legacy)
    console.log('Creating schedules table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS schedules (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        season_id uuid REFERENCES seasons(id) ON DELETE CASCADE NOT NULL,
        name text NOT NULL,
        description text,
        start_date date NOT NULL,
        end_date date NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Schedules table created\n');

    // Create announcements table
    console.log('Creating announcements table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS announcements (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title text NOT NULL,
        message text NOT NULL,
        type text DEFAULT 'info' NOT NULL,
        link_url text,
        link_text text,
        is_active boolean DEFAULT true NOT NULL,
        start_date timestamp,
        end_date timestamp,
        created_by uuid REFERENCES users(id),
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Announcements table created\n');

    // Create sponsors table
    console.log('Creating sponsors table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS sponsors (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        logo_url text,
        website_url text,
        tier text DEFAULT 'bronze' NOT NULL,
        description text,
        contact_name text,
        contact_email text,
        contact_phone text,
        start_date date,
        end_date date,
        is_active boolean DEFAULT true NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Sponsors table created\n');

    // Create board_members table
    console.log('Creating board_members table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS board_members (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        position text NOT NULL,
        bio text,
        photo_url text,
        email text,
        display_order integer DEFAULT 0 NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Board members table created\n');

    // Create pages table (CMS)
    console.log('Creating pages table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS pages (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        slug text NOT NULL UNIQUE,
        title text NOT NULL,
        content text,
        meta_description text,
        is_published boolean DEFAULT false NOT NULL,
        published_at timestamp,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Pages table created\n');

    // Create email_templates table
    console.log('Creating email_templates table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS email_templates (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        slug text NOT NULL UNIQUE,
        name text NOT NULL,
        subject text NOT NULL,
        body text NOT NULL,
        variables jsonb,
        is_active boolean DEFAULT true NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Email templates table created\n');

    // Create tournaments table
    console.log('Creating tournaments table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS tournaments (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        description text,
        start_date date NOT NULL,
        end_date date NOT NULL,
        location text,
        registration_fee numeric(10, 2),
        max_teams integer,
        age_groups jsonb,
        registration_open_date date,
        registration_close_date date,
        is_active boolean DEFAULT true NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Tournaments table created\n');

    // Create tournament_registrations table
    console.log('Creating tournament_registrations table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS tournament_registrations (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        tournament_id uuid REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
        team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
        status text DEFAULT 'pending' NOT NULL,
        payment_status text DEFAULT 'unpaid' NOT NULL,
        payment_amount numeric(10, 2),
        registered_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Tournament registrations table created\n');

    // Create site_settings table
    console.log('Creating site_settings table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        key text NOT NULL UNIQUE,
        value jsonb,
        section text,
        updated_by uuid REFERENCES users(id),
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Site settings table created\n');

    // Create audit_logs table
    console.log('Creating audit_logs table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid REFERENCES users(id),
        action text NOT NULL,
        entity_type text NOT NULL,
        entity_id text,
        changes jsonb,
        ip_address text,
        user_agent text,
        created_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Audit logs table created\n');

    // Create message_logs table
    console.log('Creating message_logs table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS message_logs (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        type text NOT NULL,
        recipient_id uuid REFERENCES users(id),
        recipient_email text,
        recipient_phone text,
        subject text,
        body text,
        status text DEFAULT 'pending' NOT NULL,
        sent_at timestamp,
        error_message text,
        template_id uuid REFERENCES email_templates(id),
        metadata jsonb,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ Message logs table created\n');

    // Create sms_logs table
    console.log('Creating sms_logs table...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS sms_logs (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        phone_number text NOT NULL,
        message text NOT NULL,
        status text DEFAULT 'pending' NOT NULL,
        sent_at timestamp,
        error_message text,
        created_at timestamp DEFAULT now() NOT NULL
      )
    `);
    console.log('✅ SMS logs table created\n');

    console.log('🎉 All missing tables created successfully!');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  }
}

createMissingTables()
  .then(() => {
    console.log('\nDone!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
