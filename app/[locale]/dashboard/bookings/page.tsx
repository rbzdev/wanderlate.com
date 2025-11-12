import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';
import { getSession } from '@/lib/session';
import { Sidebar } from '../components/Sidebar';
import { MobileSidebar } from '../components/MobileSidebar';
import { Icon } from '@iconify/react';
import Link from 'next/link';

/**
 * Bookings page - All user reservations
 */
export default async function BookingsPage({
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
    },
  });

  // If user not found in DB, redirect
  if (!user) {
    redirect(`/${locale}/login`);
  }

  // Fetch all trips with bookings
  const trips = await prisma.trip.findMany({
    where: { userId: user.id },
    include: {
      bookings: {
        select: {
          id: true,
          type: true,
          status: true,
          price: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    orderBy: { startDate: 'desc' },
  }).catch(() => []);

  // Categorize bookings
  const now = new Date();
  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.startDate) > now && trip.status !== 'cancelled'
  );
  const currentTrips = trips.filter(
    (trip) =>
      new Date(trip.startDate) <= now &&
      new Date(trip.endDate) >= now &&
      trip.status === 'confirmed'
  );
  const pastTrips = trips.filter(
    (trip) => new Date(trip.endDate) < now && trip.status !== 'cancelled'
  );
  const cancelledTrips = trips.filter((trip) => trip.status === 'cancelled');

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar locale={locale} userName={user.firstname} />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar locale={locale} userName={user.firstname} />

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Mes réservations
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Gérez toutes vos réservations au même endroit
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Link
              href={`/${locale}/dashboard/bookings/upcoming`}
              className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  À venir
                </span>
                <Icon
                  icon="lucide:calendar-clock"
                  className="w-5 h-5 text-blue-600"
                />
              </div>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                {upcomingTrips.length}
              </p>
            </Link>

            <Link
              href={`/${locale}/dashboard/bookings/current`}
              className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  En cours
                </span>
                <Icon
                  icon="lucide:map-pin"
                  className="w-5 h-5 text-green-600"
                />
              </div>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                {currentTrips.length}
              </p>
            </Link>

            <Link
              href={`/${locale}/dashboard/bookings/past`}
              className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Passées
                </span>
                <Icon
                  icon="lucide:check-circle"
                  className="w-5 h-5 text-purple-600"
                />
              </div>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                {pastTrips.length}
              </p>
            </Link>

            <Link
              href={`/${locale}/dashboard/bookings/cancelled`}
              className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Annulées
                </span>
                <Icon icon="lucide:x-circle" className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                {cancelledTrips.length}
              </p>
            </Link>
          </div>

          {/* All Bookings List */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Toutes les réservations
              </h2>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {trips.length === 0 ? (
                <div className="p-12 text-center">
                  <Icon
                    icon="lucide:calendar-x"
                    className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-700 mb-4"
                  />
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    Vous n&apos;avez aucune réservation
                  </p>
                  <Link
                    href={`/${locale}/trips`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Icon icon="lucide:plus" className="w-4 h-4" />
                    Faire une réservation
                  </Link>
                </div>
              ) : (
                trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            {trip.title}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              trip.status === 'confirmed'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : trip.status === 'cancelled'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : trip.status === 'completed'
                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}
                          >
                            {trip.status === 'confirmed'
                              ? 'Confirmée'
                              : trip.status === 'cancelled'
                              ? 'Annulée'
                              : trip.status === 'completed'
                              ? 'Terminée'
                              : 'En planification'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Icon icon="lucide:calendar" className="w-4 h-4" />
                            {new Date(trip.startDate).toLocaleDateString(
                              locale,
                              {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              }
                            )}{' '}
                            -{' '}
                            {new Date(trip.endDate).toLocaleDateString(locale, {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon icon="lucide:users" className="w-4 h-4" />
                            {trip.travelers}{' '}
                            {trip.travelers > 1 ? 'voyageurs' : 'voyageur'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon icon="lucide:luggage" className="w-4 h-4" />
                            {trip.bookings.length}{' '}
                            {trip.bookings.length > 1
                              ? 'réservations'
                              : 'réservation'}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/${locale}/dashboard/bookings/${trip.id}`}
                        className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        Voir détails
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
