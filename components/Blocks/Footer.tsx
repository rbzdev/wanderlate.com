'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Image from 'next/image';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className=" border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-12">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image src="/logo.jpg" alt="brand logo" width={30} height={30} className='' />
              <h2 className='font-bold'> wanderlate</h2>
            </Link>
            <p className="text-black/70 text-sm leading-relaxed">
              {t('brand.description')}
            </p>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-sm font-semibold text-black mb-6">
              {t('company.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="text-black/80 hover:text-black transition-colors text-sm"
                >
                  {t('company.about')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/careers" 
                  className="text-black/80 hover:text-black transition-colors text-sm"
                >
                  {t('company.careers')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/press" 
                  className="text-black/80 hover:text-black transition-colors text-sm"
                >
                  {t('company.press')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/become-partner" 
                  className="text-black/80 hover:text-black transition-colors text-sm"
                >
                  {t('partners.become')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-sm font-semibold text-black mb-6">
              {t('support.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/help" 
                  className="text-black/80 hover:text-black transition-colors text-sm"
                >
                  {t('support.helpCenter')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-black/80 hover:text-black transition-colors text-sm"
                >
                  {t('support.contact')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/cancellation" 
                  className="text-black/80 hover:text-black transition-colors text-sm"
                >
                  {t('support.cancellation')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-sm font-semibold text-black mb-6">
              {t('legal.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/mentions-legales" 
                  className="text-black/80 hover:text-black transition-colors text-sm"
                >
                  {t('legal.legalNotice')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/cgu" 
                  className="text-black/80 hover:text-black transition-colors text-sm"
                >
                  {t('legal.termsOfUse')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/politique-confidentialite" 
                  className="text-black/80 hover:text-black transition-colors text-sm"
                >
                  {t('legal.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/cgv" 
                  className="text-black/80 hover:text-black transition-colors text-sm"
                >
                  {t('legal.termsOfSale')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="border-t border-black/10 pt-8 pb-8">
          <div className="flex justify-center gap-4">
            <Link 
              href="https://facebook.com" 
              target="_blank"
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
            >
              <Icon icon="lucide:facebook" className="w-5 h-5 text-black" />
            </Link>
            <Link 
              href="https://twitter.com" 
              target="_blank"
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
            >
              <Icon icon="lucide:twitter" className="w-5 h-5 text-black" />
            </Link>
            <Link 
              href="https://instagram.com" 
              target="_blank"
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
            >
              <Icon icon="lucide:instagram" className="w-5 h-5 text-black" />
            </Link>
            <Link 
              href="https://linkedin.com" 
              target="_blank"
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
            >
              <Icon icon="lucide:linkedin" className="w-5 h-5 text-black" />
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-black/10 pt-8">
          <div className="text-center text-sm text-black/80 space-y-1">
            <p>{t('description')}</p>
            <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
