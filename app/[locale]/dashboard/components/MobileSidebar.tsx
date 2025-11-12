'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface MobileSidebarProps {
  locale: string;
  userName: string;
  userPhoto?: string;
}

export function MobileSidebar({ locale, userName, userPhoto }: MobileSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Dashboard.sidebar');
  const tLogout = useTranslations('Dashboard.welcome');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirect to login page after successful logout
        router.push(`/${locale}/login`);
        router.refresh();
      } else {
        console.error('Logout failed');
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    {
      key: 'overview',
      icon: 'hugeicons:home-12',
      href: `/${locale}/dashboard`,
      badge: null,
    },
    {
      key: 'bookings',
      icon: 'teenyicons:calendar-tick-outline',
      href: `/${locale}/dashboard/bookings`,
      badge: null,
      subItems: [
        { key: 'upcoming', href: `/${locale}/dashboard/bookings/upcoming` },
        { key: 'current', href: `/${locale}/dashboard/bookings/current` },
        { key: 'past', href: `/${locale}/dashboard/bookings/past` },
        { key: 'cancelled', href: `/${locale}/dashboard/bookings/cancelled` },
      ],
    },
    {
      key: 'favorites',
      icon: 'lucide:heart',
      href: `/${locale}/dashboard/favorites`,
      badge: null,
    },
    {
      key: 'messages',
      icon: 'lineicons:message-2',
      href: `/${locale}/dashboard/messages`,
      badge: 3,
    },
    {
      key: 'loyalty',
      icon: 'qlementine-icons:award-16',
      href: `/${locale}/dashboard/loyalty`,
      badge: null,
    },
    {
      key: 'profile',
      icon: 'lucide:user-circle',
      href: `/${locale}/dashboard/profile`,
      badge: null,
    },
    {
      key: 'settings',
      icon: 'lucide:settings',
      href: `/${locale}/dashboard/settings`,
      badge: null,
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors">
          <Icon icon="lucide:menu" className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              {userPhoto ? (
                <Image
                  src={userPhoto}
                  alt={userName}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon icon="lucide:user" className="w-6 h-6 text-primary" />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-zinc-950" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <SheetTitle className="text-base font-semibold truncate">
                {t('welcome', { name: userName })}
              </SheetTitle>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {t('status.online')}
              </p>
            </div>
          </div>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => !hasSubItems && setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors',
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    )}
                  >
                    <Icon
                      icon={item.icon}
                      className={cn(
                        'w-5 h-5 shrink-0',
                        isActive ? 'text-white' : 'text-zinc-600 dark:text-zinc-400'
                      )}
                    />
                    <span className="flex-1 font-medium text-sm">
                      {t(`menu.${item.key}`)}
                    </span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {hasSubItems && (
                      <Icon
                        icon="lucide:chevron-down"
                        className="w-4 h-4 text-zinc-400"
                      />
                    )}
                  </Link>

                  {/* Sub Items */}
                  {hasSubItems && isActive && (
                    <ul className="mt-1 ml-8 space-y-1">
                      {item.subItems!.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <li key={subItem.key}>
                            <Link
                              href={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                                isSubActive
                                  ? 'bg-primary/10 text-primary font-medium'
                                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                              )}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-current" />
                              {t(`submenu.${subItem.key}`)}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Logout"
          >
            <Icon
              icon={isLoggingOut ? "lucide:loader-2" : "lucide:log-out"}
              className={`w-5 h-5 text-zinc-600 dark:text-zinc-400 ${isLoggingOut ? 'animate-spin' : ''}`}
            />
            <span className="font-medium text-sm">
              {isLoggingOut ? tLogout('loggingOut') : tLogout('logout')}
            </span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
