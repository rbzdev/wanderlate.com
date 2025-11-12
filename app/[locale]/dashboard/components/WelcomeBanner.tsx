'use client';

import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

interface WelcomeBannerProps {
    userName: string;
}

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('Dashboard.welcome');
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

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-linear-to-r from-secondary via-secondary/90 to-secondary/80 rounded-2xl p-4 md:p-8 text-white mb-8"
        >
            <div className="flex items-center justify-between">

                {/* Message de bienvenue */}
                <div className="flex-1">
                    <h1 className="text-xl sm:text-3xl font-bold mb-2">
                        {t('greeting')}, {userName}! 👋
                    </h1>
                    <p className="text-white/90 text-lg">{t('subtitle')}</p>
                </div>


                <div className="flex items-center gap-4">

                    {/* Deconnexion */}
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                        aria-label="Logout"
                    >
                        <Icon
                            icon={isLoggingOut ? "lucide:loader-2" : "lucide:log-out"}
                            className={`w-5 h-5 ${isLoggingOut ? 'animate-spin' : ''}`}
                        />
                        <span className="hidden sm:inline text-sm font-medium">
                            {isLoggingOut ? t('loggingOut') : t('logout')}
                        </span>
                    </button>

                    <div className="hidden md:block">
                        <Icon icon="bxs:plane-take-off" className="w-24 h-24 text-white/20" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
