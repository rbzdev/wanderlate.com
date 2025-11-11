'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-primary dark:bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              {t('company.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/#" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {t('company.about')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/#" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {t('company.careers')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/#" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {t('company.press')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/#" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {t('company.investors')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              {t('support.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/help" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {t('support.helpCenter')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {t('support.contact')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/cancellation" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {t('support.cancellation')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {t('support.terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              {t('partners.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/become-partner" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {t('partners.become')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/affiliate" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {t('partners.affiliate')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/owner-space" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {t('partners.ownerSpace')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/developer-api" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {t('partners.developerApi')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              {t('newsletter.title')}
            </h3>
            <div className="space-y-4">
              {/* Social Icons */}
              <div className="flex gap-3">
                <Link 
                  href="https://facebook.com" 
                  target="_blank"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon icon="lucide:facebook" className="w-5 h-5 text-white" />
                </Link>
                <Link 
                  href="https://twitter.com" 
                  target="_blank"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon icon="lucide:twitter" className="w-5 h-5 text-white" />
                </Link>
                <Link 
                  href="https://instagram.com" 
                  target="_blank"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon icon="lucide:instagram" className="w-5 h-5 text-white" />
                </Link>
                <Link 
                  href="https://linkedin.com" 
                  target="_blank"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon icon="lucide:linkedin" className="w-5 h-5 text-white" />
                </Link>
              </div>

              {/* Newsletter Description */}
              <p className="text-white/80 text-sm">
                {t('newsletter.description')}
              </p>

              {/* Newsletter Form */}
              <div className="flex gap-2">
                <Input 
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white! focus:ring-white!"
                />
                <Button 
                  size="icon"
                  className="bg-secondary hover:bg-secondary/90 text-white shrink-0"
                >
                  <Icon icon="lucide:send" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="text-center text-sm text-white/80 space-y-1">
            <p>{t('description')}</p>
            <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
