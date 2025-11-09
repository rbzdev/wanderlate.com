"use client";

import { Download } from "lucide-react";
import Link from "next/link";

// Internationalization
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function NavBar() {
    
    const t = useTranslations("NavBar");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        const currentPath = pathname.replace(`/${locale}`, '');
        router.push(`/${newLocale}${currentPath || '/'}`);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">

            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="text-2xl font-bold text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                        <span className="text-primary">wanderlate</span><span className="text-secondary">.com</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-8">

                        {/* Download App */}
                        <Link href={`/${locale}/download`} className="flex items-center gap-1 border p-2 rounded-full">
                            <span className="text-black text-sm">{t('getApp')}</span>
                            <Download className=" text-primary" size={18} />
                        </Link>

                        {/* language selection */}
                        <select 
                            value={locale}
                            onChange={handleLocaleChange}
                            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                        >
                            <option value="fr">FR</option>
                            <option value="en">EN</option>
                        </select>

                        <Link href={`/${locale}`} className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                            {t('publishListing')}
                        </Link>

                        <Link href={`/${locale}/about`} className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                            {t('help')}
                        </Link>

                        <Link href={`/${locale}/contact`} className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                            {t('trips')}
                        </Link>

                        <Link href={`/${locale}/login`} className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                            {t('signIn')}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
