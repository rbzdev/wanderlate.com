'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-zinc-50 border-t dark:bg-zinc-900 ">
      <div className="max-w-7xl mx-auto py-8">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <h2 className="text-3xl font-bold">
              <span className="text-primary">wanderlate</span>
              <span className="text-secondary">.com</span>
            </h2>
          </Link>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              {t('company.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/#" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('company.about')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/#" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('company.careers')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/#" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('company.affiliates')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/#" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('company.press')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              {t('legal.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/legal-notices" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('legal.notices')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('legal.terms')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms-of-sale" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('legal.termsOfSale')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookies" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('legal.cookies')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/anti-discrimination" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('legal.antiDiscrimination')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              {t('explore.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/list-property" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('explore.listProperty')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/confidence" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('explore.bookConfidence')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/safety" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('explore.trustSafety')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/partner-resources" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('explore.partnerResources')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/guides" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('explore.vacationGuides')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/travel-cards" 
                  className="text-zinc-600 dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary transition-colors"
                >
                  {t('explore.travelCards')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <div className="text-center space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <p>{t('copyright', { year: new Date().getFullYear() })}</p>
            <p>{t('trademark')}</p>
            {/* <p>{t('disclaimer')}</p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
