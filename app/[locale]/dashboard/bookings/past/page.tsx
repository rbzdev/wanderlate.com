import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';
import { getSession } from '@/lib/session';
import { Sidebar } from '../../components/Sidebar';
import { MobileSidebar } from '../../components/MobileSidebar';
import { Icon } from '@iconify/react';
import Link from 'next/link';

/**
 * Past Bookings page
 */
export default async function PastBookingsPage({
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
        endDate: { lt: now },
        status: { not: 'cancelled' },
      },
      include: {
        bookings: true,
      },
      orderBy: { endDate: 'desc' },
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
          <div className="flex items-start gap-4 mb-8">
            <Link
              href={`/${locale}/dashboard/bookings`}
              className="p-2 border hover:text-white hover:bg-primary hover:text dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Icon icon="lucide:arrow-left" className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg sm:text-3xl font-bold text-zinc-900 dark:text-white">
                Réservations passées
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                {trips.length} {trips.length > 1 ? 'voyages terminés' : 'voyage terminé'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {trips.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-12 text-center border border-zinc-200 dark:border-zinc-800">
                <Icon
                  icon="lucide:history"
                  className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-700 mb-4"
                />
                <p className="text-zinc-600 dark:text-zinc-400">
                  Aucun voyage passé
                </p>
              </div>
            ) : (
              trips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                          {trip.title}
                        </h3>
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full">
                          Terminé
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Icon icon="lucide:calendar" className="w-4 h-4" />
                          {new Date(trip.startDate).toLocaleDateString(locale, {
                            day: 'numeric',
                            month: 'short',
                          })}{' '}
                          -{' '}
                          {new Date(trip.endDate).toLocaleDateString(locale, {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon icon="lucide:users" className="w-4 h-4" />
                          {trip.travelers} {trip.travelers > 1 ? 'personnes' : 'personne'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/${locale}/dashboard/bookings/${trip.id}`}
                      className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      Voir détails
                    </Link>
                    <button className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                      Télécharger facture
                    </button>
                    <button className="px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 rounded-lg transition-colors">
                      Laisser un avis
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
