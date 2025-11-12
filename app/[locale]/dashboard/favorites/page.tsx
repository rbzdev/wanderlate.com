import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma/client';
import { Sidebar } from '../components/Sidebar';
import { MobileSidebar } from '../components/MobileSidebar';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Favorites / Wishlist page
 */
export default async function FavoritesPage({
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

  // Sample wishlist data - in production, this would come from database
  const wishlists = [
    {
      id: '1',
      name: 'Weekend romantique',
      count: 8,
      coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      updatedAt: new Date('2024-11-10'),
    },
    {
      id: '2',
      name: 'Vacances en famille',
      count: 12,
      coverImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80',
      updatedAt: new Date('2024-11-08'),
    },
    {
      id: '3',
      name: 'Télétravail',
      count: 5,
      coverImage: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=400&q=80',
      updatedAt: new Date('2024-11-05'),
    },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <div className="hidden lg:block">
        <Sidebar locale={locale} userName={user.firstname} />
      </div>
      <MobileSidebar locale={locale} userName={user.firstname} />

      <div className="flex-1 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-lg sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                Mes favoris
              </h1>
              <p className="text-sm sm:text-normal text-zinc-600 dark:text-zinc-400">
                Organisez vos hébergements préférés en listes
              </p>
            </div>
            <button className="flex items-center gap-2 px-2 sm:px-4 py-2 bg-primary text-white rounded-full sm:rounded-lg hover:bg-primary/90 transition-colors">
              <Icon icon="lucide:plus" className="w-5 h-5" />
             <span className='hidden sm:block'> Nouvelle liste </span>
            </button>
          </div>

          {/* Wishlists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {wishlists.map((list) => (
              <Link
                key={list.id}
                href={`/${locale}/dashboard/favorites/${list.id}`}
                className="group bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-colors"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={list.coverImage}
                    alt={list.name}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded-full">
                    {list.count} {list.count > 1 ? 'logements' : 'logement'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">
                    {list.name}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Mise à jour le{' '}
                    {list.updatedAt.toLocaleDateString(locale, {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </div>
              </Link>
            ))}

            {/* Create New List Card */}
            <button className="bg-zinc-100 dark:bg-zinc-900 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-primary hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors p-8 flex flex-col items-center justify-center gap-4 min-h-[240px]">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon icon="lucide:plus" className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-zinc-900 dark:text-white mb-1">
                  Créer une nouvelle liste
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Organisez vos favoris
                </p>
              </div>
            </button>
          </div>

          {/* Tips Section */}
          <div className="bg-primary/10 dark:bg-secondary rounded-xl p-4 sm:p-6 border border-primary/50 dark:border-primary/80">
            <div className="flex flex-row items-start gap-4">
              <div className="p-2 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Icon icon="lucide:lightbulb" className="text-2xl text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-sm sm:text-base">
                  Astuce : Créez des listes thématiques
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Organisez vos hébergements favoris par thème : &quot;Weekend&quot;,
                  &quot;Éco-voyage&quot;, &quot;Télétravail&quot;, etc. Vous pouvez également
                  partager vos listes avec vos proches pour planifier ensemble !
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icon icon="lucide:heart" className="w-4 h-4 text-red-500" />
                    Ajoutez des favoris
                  </span>
                  <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icon icon="lucide:share-2" className="w-4 h-4 text-blue-500" />
                    Partagez vos listes
                  </span>
                  <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Icon icon="lucide:folder" className="w-4 h-4 text-orange-500" />
                    Organisez par catégorie
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
