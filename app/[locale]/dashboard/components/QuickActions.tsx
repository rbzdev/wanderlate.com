'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface QuickAction {
  actionKey: 'newTrip' | 'searchFlights' | 'searchStays' | 'profile';
  icon: string;
  href: string;
  color: string;
  disabled?: boolean;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  const t = useTranslations('Dashboard.quickActions');
  const tCommon = useTranslations('Dashboard');
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <motion.div
          key={action.href + action.actionKey}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {action.disabled ? (
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 opacity-60 cursor-not-allowed">
              <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                <Icon icon={action.icon} className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
                {t(`${action.actionKey}.title`)}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t(`${action.actionKey}.comingSoon`)}
              </p>
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded">
                {tCommon('comingSoonBadge')}
              </span>
            </div>
          ) : (
            <Link href={action.href}>
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:border-secondary dark:hover:border-secondary transition-all cursor-pointer group">
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon icon={action.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
                  {t(`${action.actionKey}.title`)}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {t(`${action.actionKey}.description`)}
                </p>
              </div>
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  );
}
