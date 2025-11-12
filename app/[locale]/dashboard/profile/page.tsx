import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma/client';
import { Sidebar } from '../components/Sidebar';
import { MobileSidebar } from '../components/MobileSidebar';
import { Icon } from '@iconify/react';

/**
 * Profile page
 */
export default async function ProfilePage({
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
      lastName: true,
      email: true,
      phone: true,
      accountType: true,
      createdAt: true,
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
              Mon profil
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Gérez vos informations personnelles
            </p>
          </div>

          {/* Profile Picture */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-2 sm:p-6 border border-zinc-200 dark:border-zinc-800 mb-6">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon icon="lucide:user" className="w-12 h-12 text-primary" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Icon icon="lucide:camera" className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-1">
                  {user.firstname} {user.lastName}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                  Membre depuis{' '}
                  {new Date(user.createdAt).toLocaleDateString(locale, {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {user.accountType === 'traveler' ? 'Voyageur' : 'Hôte'}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                    Compte vérifié
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 mb-6">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Informations personnelles
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    defaultValue={user.firstname}
                    className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    defaultValue={user.lastName}
                    className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  defaultValue={user.phone || ''}
                  placeholder="+33 6 12 34 56 78"
                  className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Enregistrer les modifications
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 mb-6">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Sécurité
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                <div className="flex items-center gap-3">
                  <Icon icon="lucide:key" className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                  <div className="text-left">
                    <p className="font-medium text-zinc-900 dark:text-white">
                      Changer le mot de passe
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Dernière modification il y a 3 mois
                    </p>
                  </div>
                </div>
                <Icon icon="lucide:chevron-right" className="w-5 h-5 text-zinc-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                <div className="flex items-center gap-3">
                  <Icon icon="lucide:smartphone" className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                  <div className="text-left">
                    <p className="font-medium text-zinc-900 dark:text-white">
                      Authentification à deux facteurs
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Désactivée
                    </p>
                  </div>
                </div>
                <Icon icon="lucide:chevron-right" className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
            <div className="p-6 border-b border-red-200 dark:border-red-800">
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-400">
                Zone de danger
              </h3>
            </div>
            <div className="p-6">
              <button className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:hover:text-red-500 font-medium">
                <Icon icon="lucide:trash-2" className="w-5 h-5" />
                Supprimer mon compte
              </button>
              <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-2">
                Cette action est irréversible. Toutes vos données seront supprimées.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
