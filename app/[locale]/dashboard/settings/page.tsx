import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma/client';
import { Sidebar } from '../components/Sidebar';
import { MobileSidebar } from '../components/MobileSidebar';
import { Icon } from '@iconify/react';

/**
 * Settings page
 */
export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const session = await getSession();
  if (!session) {
    redirect(`/${locale}/login`);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      firstname: true,
    },
  });

  if (!user) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <div className="hidden lg:block">
        <Sidebar locale={locale} userName={user.firstname} />
      </div>
      <MobileSidebar locale={locale} userName={user.firstname} />

      <div className="flex-1 overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-lg sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Paramètres
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Gérez vos préférences et notifications
            </p>
          </div>

          {/* Language & Region */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 mb-6">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Langue et région
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Langue
                </label>
                <select className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                  <option value="fr">🇫🇷 Français</option>
                  <option value="en">🇬🇧 English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Devise
                </label>
                <select className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                  <option value="EUR">EUR - Euro (€)</option>
                  <option value="USD">USD - Dollar ($)</option>
                  <option value="GBP">GBP - Livre Sterling (£)</option>
                  <option value="CHF">CHF - Franc Suisse (CHF)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Fuseau horaire
                </label>
                <select className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                  <option value="Europe/Paris">(GMT+1) Paris</option>
                  <option value="Europe/London">(GMT+0) Londres</option>
                  <option value="America/New_York">(GMT-5) New York</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 mb-6">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Notifications
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">
                    Notifications par email
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Recevez des mises à jour sur vos réservations
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">
                    Notifications push
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Notifications sur votre appareil
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">
                    Offres promotionnelles
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Recevez nos meilleures offres et promotions
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Tips & Guides */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">
                    Conseils de voyage
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Guides et astuces pour vos voyages
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 mb-6">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Confidentialité
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                <div className="flex items-center gap-3">
                  <Icon icon="lucide:shield" className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                  <div className="text-left">
                    <p className="font-medium text-zinc-900 dark:text-white">
                      Mes données personnelles
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Télécharger ou supprimer vos données
                    </p>
                  </div>
                </div>
                <Icon icon="lucide:chevron-right" className="w-5 h-5 text-zinc-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                <div className="flex items-center gap-3">
                  <Icon icon="lucide:cookie" className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                  <div className="text-left">
                    <p className="font-medium text-zinc-900 dark:text-white">
                      Préférences cookies
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Gérer vos préférences de cookies
                    </p>
                  </div>
                </div>
                <Icon icon="lucide:chevron-right" className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Enregistrer les paramètres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
