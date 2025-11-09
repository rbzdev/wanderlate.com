import { PrismaClient } from '../app/generated/prisma';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create test user (without hardcoded ID - let Prisma generate UUID)
  const testUser = await prisma.user.upsert({
    where: { email: 'test@wanderlate.com' },
    update: {},
    create: {
      email: 'test@wanderlate.com',
      firstname: 'John',
      lastName: 'Doe',
      phone: '+33612345678',
      birthDay: new Date('1990-01-15'),
      country: 'France',
      language: 'fr',
      currency: 'EUR',
      accountType: 'traveler',
      password: await hash('Test123!', 12),
      loginProvider: 'email',
      isActive: true,
    },
  });

  console.log('✅ Created test user:', testUser.email);
  console.log('   User ID:', testUser.id);

  // Create sample trips
  const trip1 = await prisma.trip.create({
    data: {
      userId: testUser.id,
      title: 'Summer Vacation in Paris',
      startDate: new Date('2025-07-15'),
      endDate: new Date('2025-07-22'),
      travelers: 2,
      status: 'confirmed',
    },
  });

  console.log('✅ Created trip:', trip1.title);

  // Create bookings for trip 1
  await prisma.booking.createMany({
    data: [
      {
        tripId: trip1.id,
        type: 'lodging',
        status: 'confirmed',
        supplierRef: 'HTL-PARIS-001',
        price: { amount: 125000, currency: 'EUR' }, // 1250 EUR in cents (7 nights)
        meta: {
          hotelName: 'Le Grand Hotel Paris',
          roomType: 'Deluxe Double',
          nights: 7,
          guests: 2,
        },
      },
    ],
  });

  console.log('✅ Created bookings for trip 1');

  const trip2 = await prisma.trip.create({
    data: {
      userId: testUser.id,
      title: 'Weekend in Barcelona',
      startDate: new Date('2025-09-10'),
      endDate: new Date('2025-09-13'),
      travelers: 1,
      status: 'planning',
    },
  });

  console.log('✅ Created trip:', trip2.title);

  const trip3 = await prisma.trip.create({
    data: {
      userId: testUser.id,
      title: 'Christmas in New York',
      startDate: new Date('2024-12-20'),
      endDate: new Date('2024-12-27'),
      travelers: 4,
      status: 'completed',
    },
  });

  console.log('✅ Created trip:', trip3.title);

  await prisma.booking.create({
    data: {
      tripId: trip3.id,
      type: 'lodging',
      status: 'confirmed',
      supplierRef: 'HTL-NYC-XMAS',
      price: { amount: 180000, currency: 'USD' }, // 1800 USD in cents (7 nights)
      meta: {
        hotelName: 'The Plaza New York',
        roomType: 'Family Suite',
        nights: 7,
        guests: 4,
      },
    },
  });

  console.log('✅ Created booking for trip 3');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📝 Test credentials:');
  console.log('   Email: test@wanderlate.com');
  console.log('   Password: Test123!');
  console.log('\n🔗 Dashboard: http://localhost:3000/fr/dashboard');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
