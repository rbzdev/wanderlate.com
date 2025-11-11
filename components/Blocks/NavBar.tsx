"use client";

import Image from "next/image";
import { Download, Menu } from "lucide-react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

// Internationalization
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

// Components
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function NavBar() {

    const t = useTranslations("NavBar");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        const currentPath = pathname.replace(`/${locale}`, '');
        router.push(`/${newLocale}${currentPath || '/'}`);
    };

    return (
        <nav className="bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">

            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="text-xl sm:text-2xl font-bold text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                        <Image
                            src="/assets/logos/logo.png"
                            alt="Wanderlate Logo"
                            width={50}
                            height={50}
                            className="h-8 sm:h-10 w-8 sm:w-10 object-contain"
                        />
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-4">

                        {/* Download App - Always visible */}
                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="hidden sm:flex items-center gap-1 border p-2 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                        >
                            <span className="text-black dark:text-white text-sm">{t('getApp')}</span>
                            <Download className="text-primary" size={18} />
                        </button>

                        {/* Desktop Navigation - Hidden on mobile */}
                        <div className="hidden md:flex items-center gap-8">
                            {/* language selection */}
                            <select
                                value={locale}
                                onChange={handleLocaleChange}
                                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer bg-transparent"
                            >
                                <option value="fr">🇫🇷 Français</option>
                                <option value="en">🇬🇧 English</option>
                            </select>

                            <Link href={`/${locale}`} className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                                {t('publishListing')}
                            </Link>

                            <Link href={`/${locale}/about`} className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                                {t('help')}
                            </Link>

                            <Link href={`/${locale}/trips`} className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                                {t('trips')}
                            </Link>

                            <Link href={`/${locale}/login`} className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                                {t('signIn')}
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <button className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                    <Menu className="w-6 h-6 text-primary" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="top" className="w-full sm:w-[400px] p-4 bg-white dark:bg-zinc-950 rounded-b-2xl md:hidden">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-2">
                                        <Image
                                            src="/assets/logos/logo.png"
                                            alt="Wanderlate"
                                            width={32}
                                            height={32}
                                            className="h-8 w-8 object-contain"
                                        />
                                        <span className="text-xl font-bold">WANDERLATE</span>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className=" flex flex-col gap-4">
                                    {/* Get App Button */}
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            setIsDialogOpen(true);
                                        }}
                                        className="w-full flex items-center justify-between p-2 rounded-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                                    >
                                        <span className="text-gray-500 font-medium">{t('getApp')}</span>
                                        <Download className="text-primary" size={20} />
                                    </button>

                                    {/* Language Selection */}
                                    <div className="flex items-center gap-2  border-zinc-200 dark:border-zinc-800">
                                        {/* <Icon icon="lucide:globe" className="w-5 h-5 text-primary" /> */}
                                        <select
                                            value={locale}
                                            onChange={(e) => {
                                                handleLocaleChange(e);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="flex-1 text-sm text-gray-500 bg-transparent cursor-pointer outline-none"
                                        >
                                            <option value="fr">🇫🇷 Français</option>
                                            <option value="en">🇬🇧 English</option>
                                        </select>
                                    </div>

                                    {/* Menu Links */}
                                    <div className="flex flex-col gap-2 mt-4 space-y-4">
                                        <Link
                                            href={`/${locale}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-black"
                                        >
                                            {/* <Icon icon="lucide:home" className="w-5 h-5 text-zinc-600 dark:text-zinc-400" /> */}
                                            <span className="text-base">{t('publishListing')}</span>
                                        </Link>

                                        <Link
                                            href={`/${locale}/about`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-black"
                                        >
                                            {/* <Icon icon="lucide:help-circle" className="w-5 h-5 text-zinc-600 dark:text-zinc-400" /> */}
                                            <span className="text-base">{t('help')}</span>
                                        </Link>

                                        <Link
                                            href={`/${locale}/trips`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-black"
                                        >
                                            {/* <Icon icon="lucide:plane" className="w-5 h-5 text-zinc-600 dark:text-zinc-400" /> */}
                                            <span className="text-base">{t('trips')}</span>
                                        </Link>

                                        <Link
                                            href={`/${locale}/login`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 p-4 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors mt-4"
                                        >
                                            <Icon icon="lucide:user" className="w-5 h-5" />
                                            <span className="text-base font-medium">{t('signIn')}</span>
                                        </Link>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>

            {/* Coming Soon Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl">
                            {t('comingSoon')}
                        </DialogTitle>
                        <DialogDescription className="text-center pt-4">
                            {t('comingSoonDesc')}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </nav>
    );
}
