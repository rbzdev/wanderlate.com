'use client';

import { useTranslations, useLocale } from 'next-intl';
import { TripCard } from './TripCard';
import { Icon } from '@iconify/react';

interface Trip {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  status: 'planning' | 'confirmed' | 'completed' | 'cancelled';
  travelers: number;
}

interface RecentTripsSectionProps {
  trips: Trip[];
}

export function RecentTripsSection({ trips }: RecentTripsSectionProps) {
  const t = useTranslations('Dashboard.recentTrips');
  const locale = useLocale();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {t('title')}
        </h2>
        {trips.length > 0 && (
          <a
            href={`/${locale}/trips`}
            className="text-secondary hover:underline text-sm font-medium"
          >
            {t('viewAll')}
          </a>
        )}
      </div>

      {trips.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-12 text-center">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="lucide:plane" className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
            {t('empty.title')}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            {t('empty.description')}
          </p>
          <a
            href={`/${locale}/trips`}
            className="inline-block bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {t('empty.cta')}
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              title={trip.title}
              location={trip.title} // TODO: Extract location from trip data
              checkIn={trip.startDate}
              checkOut={trip.endDate}
              status={trip.status}
              travelers={trip.travelers}
            />
          ))}
        </div>
      )}
    </div>
  );
}
