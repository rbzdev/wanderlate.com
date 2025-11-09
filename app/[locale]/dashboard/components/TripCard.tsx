'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useTranslations, useLocale } from 'next-intl';

interface TripCardProps {
  id: string;
  title: string;
  location: string;
  checkIn: Date;
  checkOut: Date;
  status: 'planning' | 'confirmed' | 'completed' | 'cancelled';
  travelers: number;
}

const statusConfig = {
  planning: {
    labelKey: 'planning',
    color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    icon: 'lucide:calendar-clock',
  },
  confirmed: {
    labelKey: 'confirmed',
    color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
    icon: 'lucide:check-circle',
  },
  completed: {
    labelKey: 'completed',
    color: 'bg-zinc-50 dark:bg-zinc-900/20 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800',
    icon: 'lucide:check-check',
  },
  cancelled: {
    labelKey: 'cancelled',
    color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
    icon: 'lucide:x-circle',
  },
};

export function TripCard({ id, title, location, checkIn, checkOut, status, travelers }: TripCardProps) {
  const locale = useLocale();
  const t = useTranslations('Dashboard.tripCard');
  const dateLocale = locale === 'fr' ? fr : enUS;
  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/${locale}/trips/${id}`}>
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:border-secondary dark:hover:border-secondary transition-colors cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">{title}</h3>
              <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                <Icon icon="lucide:map-pin" className="w-4 h-4" />
                <span>{location}</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
              <Icon icon={config.icon} className="w-3 h-3 inline mr-1" />
              {t(`status.${config.labelKey}`)}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Icon icon="lucide:calendar" className="w-4 h-4" />
              <span>
                {format(checkIn, 'PP', { locale: dateLocale })} - {format(checkOut, 'PP', { locale: dateLocale })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Icon icon="lucide:users" className="w-4 h-4" />
              <span>
                {travelers} {t('travelers', { count: travelers })}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              {t('viewDetails')}
            </span>
            <Icon icon="lucide:arrow-right" className="w-4 h-4 text-secondary" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
