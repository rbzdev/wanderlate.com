import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma/client';
import { Sidebar } from '../components/Sidebar';
import { MobileSidebar } from '../components/MobileSidebar';
import { Icon } from '@iconify/react';

/**
 * Loyalty Program page
 */
export default async function LoyaltyPage({
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
      lastName: true,
    },
  });

  if (!user) {
    redirect(`/${locale}/login`);
  }

  // Sample loyalty data - in production, this would come from database
  const loyaltyData = {
    points: 2450,
    tier: 'Gold',
    nextTier: 'Platinum',
    pointsToNextTier: 550,
    benefits: [
      {
        icon: 'lucide:percent',
        title: 'Réductions exclusives',
        description: '10% minimum sur plus de 100,000 hôtels',
        active: true,
      },
      {
        icon: 'lucide:gift',
        title: 'Surclassement gratuit',
        description: 'Sous réserve de disponibilité',
        active: true,
      },
      {
        icon: 'lucide:calendar-check',
        title: 'Check-in/out flexible',
        description: 'Arrivée anticipée et départ tardif',
        active: true,
      },
      {
        icon: 'lucide:crown',
        title: 'Accès Lounge VIP',
        description: 'Disponible au niveau Platinum',
        active: false,
      },
    ],
    recentActivities: [
      {
        type: 'earn',
        points: 500,
        description: 'Réservation - Villa Méditerranée',
        date: new Date('2024-11-10'),
      },
      {
        type: 'earn',
        points: 250,
        description: 'Parrainage réussi',
        date: new Date('2024-11-05'),
      },
      {
        type: 'redeem',
        points: -300,
        description: 'Réduction appliquée',
        date: new Date('2024-11-01'),
      },
    ],
  };

  const tierProgress =
    (loyaltyData.points / (loyaltyData.points + loyaltyData.pointsToNextTier)) * 100;

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <div className="hidden lg:block">
        <Sidebar locale={locale} userName={user.firstname} />
      </div>
      <MobileSidebar locale={locale} userName={user.firstname} />

      <div className="flex-1 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-lg sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Programme de fidélité Wanderlate
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Gagnez des points et profitez d&apos;avantages exclusifs
            </p>
          </div>

          {/* Points Card */}
          <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-blue-100 mb-2">Vos points</p>
                <p className="text-5xl font-bold">{loyaltyData.points.toLocaleString()}</p>
              </div>
              <div className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:award" className="w-5 h-5" />
                  <span className="font-semibold">{loyaltyData.tier}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-blue-100">
                  Progression vers {loyaltyData.nextTier}
                </span>
                <span className="font-medium">
                  {loyaltyData.pointsToNextTier} points restants
                </span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${tierProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              Vos avantages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loyaltyData.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-zinc-900 rounded-xl p-6 border ${
                    benefit.active
                      ? 'border-primary'
                      : 'border-zinc-200 dark:border-zinc-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                        benefit.active
                          ? 'bg-primary/10 text-primary'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      <Icon icon={benefit.icon} className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-zinc-900 dark:text-white">
                          {benefit.title}
                        </h3>
                        {benefit.active && (
                          <Icon
                            icon="lucide:check-circle"
                            className="w-4 h-4 text-green-600"
                          />
                        )}
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              Activité récente
            </h2>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
              {loyaltyData.recentActivities.map((activity, index) => (
                <div key={index} className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'earn'
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : 'bg-red-100 dark:bg-red-900/30'
                      }`}
                    >
                      <Icon
                        icon={
                          activity.type === 'earn'
                            ? 'lucide:arrow-up'
                            : 'lucide:arrow-down'
                        }
                        className={`w-5 h-5 ${
                          activity.type === 'earn' ? 'text-green-600' : 'text-red-600'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">
                        {activity.description}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {activity.date.toLocaleDateString(locale, {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      activity.type === 'earn'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {activity.points > 0 ? '+' : ''}
                    {activity.points}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to earn points */}
          <div className="mt-8 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
              Comment gagner des points ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <Icon icon="lucide:hotel" className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white text-sm">
                    Réservez un séjour
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    10 points par € dépensé
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon icon="lucide:users" className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white text-sm">
                    Parrainez vos amis
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    250 points par parrainage
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon icon="lucide:star" className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white text-sm">
                    Laissez des avis
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    50 points par avis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
