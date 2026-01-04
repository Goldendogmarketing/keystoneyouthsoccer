import { db } from '../src/db/db';
import { seasons } from '../src/db/schema/seasons.schema';

async function seedInitialSeason() {
  console.log('🌱 Seeding initial season...');

  try {
    // Create Spring 2026 season
    const [season] = await db
      .insert(seasons)
      .values({
        name: 'Spring 2026',
        description:
          'Spring 2026 soccer season for Keystone Youth Soccer. Ages U6-U18. Register now for an exciting season of development and competition!',
        startDate: '2026-03-01',
        endDate: '2026-06-15',
        registrationStartDate: '2026-01-01',
        registrationEndDate: '2026-02-28',
        registrationFee: '150.00',
        status: 'active',
      })
      .returning();

    console.log('✅ Created season:', season.name);
    console.log('  ID:', season.id);
    console.log('  Registration Fee: $' + season.registrationFee);
    console.log('  Registration Period:', season.registrationStartDate, 'to', season.registrationEndDate);
    console.log('  Season Period:', season.startDate, 'to', season.endDate);
    console.log('\n✨ Seed complete!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  }
}

seedInitialSeason()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
