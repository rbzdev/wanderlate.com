'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface StatsCardProps {
  statKey: 'totalTrips' | 'upcomingTrips' | 'completedTrips' | 'totalSpent';
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const colorClasses = {
  blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
};

export function StatsCard({ statKey, value, icon, trend, color = 'blue' }: StatsCardProps) {
  const t = useTranslations('Dashboard.stats');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">{t(statKey)}</p>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</h3>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <Icon
                icon={trend.isPositive ? 'lucide:trending-up' : 'lucide:trending-down'}
                className={`w-4 h-4 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}
              />
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {trend.value}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon icon={icon} className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
