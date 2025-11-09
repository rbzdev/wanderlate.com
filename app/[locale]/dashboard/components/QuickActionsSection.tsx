'use client';

import { useTranslations } from 'next-intl';
import { QuickActions } from './QuickActions';

interface QuickAction {
  actionKey: 'newTrip' | 'searchFlights' | 'searchStays' | 'profile';
  icon: string;
  href: string;
  color: string;
  disabled?: boolean;
}

interface QuickActionsSectionProps {
  actions: QuickAction[];
}

export function QuickActionsSection({ actions }: QuickActionsSectionProps) {
  const t = useTranslations('Dashboard.quickActions');

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
        {t('title')}
      </h2>
      <QuickActions actions={actions} />
    </div>
  );
}
