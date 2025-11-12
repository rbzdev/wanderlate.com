import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';
import { getSession } from '@/lib/session';
import { Sidebar } from '../../components/Sidebar';
import { MobileSidebar } from '../../components/MobileSidebar';
import { Icon } from '@iconify/react';
import Link from 'next/link';

/**
 * Current Bookings page - Active stays
 */
export default async function CurrentBookingsPage({
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
        startDate: { lte: now },
        endDate: { gte: now },
        status: 'confirmed',
      },
      include: {
        bookings: true,
      },
      orderBy: { startDate: 'desc' },
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
                Séjours en cours
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                {trips.length} {trips.length > 1 ? 'séjours actifs' : 'séjour actif'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {trips.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 rounded-xl p-12 text-center border border-zinc-200 dark:border-zinc-800">
                <Icon
                  icon="lucide:map-pin"
                  className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-700 mb-4"
                />
                <p className="text-zinc-600 dark:text-zinc-400">
                  Aucun séjour en cours
                </p>
              </div>
            ) : (
              trips.map((trip) => {
                const daysRemaining = Math.ceil(
                  (new Date(trip.endDate).getTime() - now.getTime()) /
                    (1000 * 60 * 60 * 24)
                );

                return (
                  <div
                    key={trip.id}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-bold bg-green-500 text-white rounded-full animate-pulse">
                            EN COURS
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                          {trip.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Icon icon="lucide:calendar" className="w-4 h-4" />
                            Jusqu&apos;au{' '}
                            {new Date(trip.endDate).toLocaleDateString(locale, {
                              day: 'numeric',
                              month: 'long',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon icon="lucide:clock" className="w-4 h-4" />
                            Encore {daysRemaining}{' '}
                            {daysRemaining > 1 ? 'jours' : 'jour'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/${locale}/dashboard/bookings/${trip.id}`}
                        className="px-4 py-2 text-sm font-medium bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                      >
                        Voir détails
                      </Link>
                      <button className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-white/50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors">
                        Contacter l&apos;hôte
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
