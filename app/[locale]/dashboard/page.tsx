import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';
import { getSession } from '@/lib/session';
import { WelcomeBanner } from './components/WelcomeBanner';
import { StatsCard } from './components/StatsCard';
import { QuickActionsSection } from './components/QuickActionsSection';
import { RecentTripsSection } from './components/RecentTripsSection';

/**
 * 
 * Dashboard page - Server Component
 * Fetches user data and trips from database
 */
export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Get session from JWT cookie
  const session = await getSession();
  
  // Redirect to login if no session
  if (!session) {
    redirect(`/${locale}/login`);
  }

  // Fetch user data
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      firstname: true,
      lastName: true,
      email: true,
      accountType: true,
    },
  });

  // If user not found in DB (session exists but user deleted), clear session and redirect
  if (!user) {
    redirect(`/${locale}/login`);
  }

  // Fetch user's trips with bookings
  const trips = await prisma.trip.findMany({
    where: { userId: user.id },
    include: {
      bookings: {
        select: {
          id: true,
          type: true,
          status: true,
          price: true,
        },
      },
    },
    orderBy: { startDate: 'desc' },
    take: 6, // Show only 6 most recent trips
  }).catch(() => []);

  // Calculate stats
  const totalTrips = trips.length;
  const upcomingTrips = trips.filter(
    (trip) => trip.status === 'confirmed' && new Date(trip.startDate) > new Date()
  ).length;
  const completedTrips = trips.filter((trip) => trip.status === 'completed').length;

  // Calculate total spent (sum of all confirmed bookings)
  const totalSpent = trips.reduce((sum, trip) => {
    const tripTotal = trip.bookings
      .filter((booking) => booking.status === 'confirmed')
      .reduce((bookingSum, booking) => {
        const price = booking.price as { amount: number; currency: string } | null;
        return bookingSum + (price?.amount || 0);
      }, 0);
    return sum + tripTotal;
  }, 0);

  // Format currency based on user preference or default
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR', // TODO: Use user.currency when available
    }).format(amount / 100); // Assuming amounts are in cents
  };

  // Map trips to the format expected by RecentTripsSection
  const mappedTrips = trips.map((trip) => ({
    id: trip.id,
    title: trip.title,
    startDate: trip.startDate,
    endDate: trip.endDate,
    status: trip.status as 'planning' | 'confirmed' | 'completed' | 'cancelled',
    travelers: trip.travelers,
  }));

  // Quick actions configuration
  const quickActions = [
    {
      actionKey: 'newTrip' as const,
      icon: 'lucide:plus-circle',
      href: `/${locale}/trips/new`,
      color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    },
    {
      actionKey: 'searchStays' as const,
      icon: 'lucide:hotel',
      href: `/${locale}/?tab=stays`,
      color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    },
    {
      actionKey: 'searchFlights' as const,
      icon: 'lucide:plane',
      href: '#',
      color: 'bg-zinc-50 dark:bg-zinc-900/20 text-zinc-400 dark:text-zinc-600',
      disabled: true,
    },
    {
      actionKey: 'profile' as const,
      icon: 'lucide:user-circle',
      href: `/${locale}/profile`,
      color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-16">
        {/* Welcome Banner */}
        <WelcomeBanner userName={user.firstname} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            statKey="totalTrips"
            value={totalTrips}
            icon="lucide:map"
            color="blue"
          />
          <StatsCard
            statKey="upcomingTrips"
            value={upcomingTrips}
            icon="lucide:calendar-check"
            color="green"
          />
          <StatsCard
            statKey="completedTrips"
            value={completedTrips}
            icon="lucide:check-circle"
            color="purple"
          />
          <StatsCard
            statKey="totalSpent"
            value={formatCurrency(totalSpent)}
            icon="lucide:wallet"
            color="orange"
          />
        </div>

        {/* Quick Actions */}
        <QuickActionsSection actions={quickActions} />

        {/* Recent Trips */}
        <RecentTripsSection trips={mappedTrips} />
      </div>
    </div>
  );
}
