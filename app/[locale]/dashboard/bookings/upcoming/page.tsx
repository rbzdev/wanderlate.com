import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';
import { getSession } from '@/lib/session';
import { Sidebar } from '../../components/Sidebar';
import { MobileSidebar } from '../../components/MobileSidebar';
import { Icon } from '@iconify/react';
import Link from 'next/link';

/**
 * Upcoming Bookings page
 */
export default async function UpcomingBookingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const session = await getSession();
  if (!session) {
    redirect(`/${locale}/login`);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      firstname: true,
    },
  });

  if (!user) {
    redirect(`/${locale}/login`);
  }

  const now = new Date();
  const trips = await prisma.trip
    .findMany({
      where: {
        userId: user.id,
        startDate: { gt: now },
        status: { not: 'cancelled' },
      },
      include: {
        bookings: true,
      },
      orderBy: { startDate: 'asc' },
    })
    .catch(() => []);

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <div className="hidden lg:block">
        <Sidebar locale={locale} userName={user.firstname} />
      </div>
      <MobileSidebar locale={locale} userName={user.firstname} />

      <div className="flex-1 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
          <div className="flex items-start gap-4 mb-8 ">
            <Link
              href={`/${locale}/dashboard/bookings`}
              className="p-2 border hover:text-white hover:bg-primary hover:text dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Icon icon="lucide:arrow-left" className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg sm:text-3xl font-bold text-zinc-900 dark:text-white">
                Réservations à venir
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                {trips.length} {trips.length > 1 ? 'voyages prévus' : 'voyage prévu'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {trips.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-12 text-center border border-zinc-200 dark:border-zinc-800">
                <Icon
                  icon="lucide:calendar-check"
                  className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-700 mb-4"
                />
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Aucune réservation à venir
                </p>
                <Link
                  href={`/${locale}/trips`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  <Icon icon="lucide:plus" className="w-4 h-4" />
                  Planifier un voyage
                </Link>
              </div>
            ) : (
              trips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                        {trip.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Icon icon="lucide:calendar" className="w-4 h-4" />
                          {new Date(trip.startDate).toLocaleDateString(locale, {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon icon="lucide:users" className="w-4 h-4" />
                          {trip.travelers} {trip.travelers > 1 ? 'personnes' : 'personne'}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                      {Math.ceil(
                        (new Date(trip.startDate).getTime() - now.getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{' '}
                      jours
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/${locale}/dashboard/bookings/${trip.id}`}
                      className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      Voir détails
                    </Link>
                    <button className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                      Modifier
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      Annuler
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
