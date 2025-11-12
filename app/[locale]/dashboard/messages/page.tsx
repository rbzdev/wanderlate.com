import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { prisma } from '@/lib/prisma/client';
import { Sidebar } from '../components/Sidebar';
import { MobileSidebar } from '../components/MobileSidebar';
import { Icon } from '@iconify/react';
import Link from 'next/link';

/**
 * Messages page
 */
export default async function MessagesPage({
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

  // Sample messages data - in production, this would come from database
  const conversations = [
    {
      id: '1',
      hostName: 'Marie Dupont',
      hostAvatar: null,
      propertyName: 'Villa Méditerranée - Nice',
      lastMessage: 'Merci pour votre réservation ! Je vous envoie les instructions d\'accès.',
      timestamp: new Date('2024-11-12T10:30:00'),
      unread: true,
    },
    {
      id: '2',
      hostName: 'Support Wanderlate',
      hostAvatar: null,
      propertyName: 'Assistance',
      lastMessage: 'Votre demande a été traitée avec succès.',
      timestamp: new Date('2024-11-11T15:20:00'),
      unread: true,
    },
    {
      id: '3',
      hostName: 'Jean Martin',
      hostAvatar: null,
      propertyName: 'Chalet Alpin - Chamonix',
      lastMessage: 'Le chalet est prêt pour votre arrivée ce weekend !',
      timestamp: new Date('2024-11-10T09:15:00'),
      unread: true,
    },
    {
      id: '4',
      hostName: 'Sophie Bernard',
      hostAvatar: null,
      propertyName: 'Appartement Parisien',
      lastMessage: 'Merci pour votre séjour, n\'hésitez pas à laisser un avis.',
      timestamp: new Date('2024-11-08T18:45:00'),
      unread: false,
    },
  ];

  const unreadCount = conversations.filter((c) => c.unread).length;

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <div className="hidden lg:block">
        <Sidebar locale={locale} userName={user.firstname} />
      </div>
      <MobileSidebar locale={locale} userName={user.firstname} />

      <div className="flex-1 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Messages
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              {unreadCount} {unreadCount > 1 ? 'messages non lus' : 'message non lu'}
            </p>
          </div>

          {/* Messages List */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
            {conversations.length === 0 ? (
              <div className="p-12 text-center">
                <Icon
                  icon="lucide:message-circle"
                  className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-700 mb-4"
                />
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Aucun message
                </p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  href={`/${locale}/dashboard/messages/${conversation.id}`}
                  className={`flex items-start gap-4 p-6 hover:bg-primary/30 dark:hover:bg-primary/50 transition-colors ${
                    conversation.unread ? 'bg-primary/5 dark:bg-primary/10' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon icon="lucide:user" className="w-6 h-6 text-primary" />
                    </div>
                    {conversation.unread && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-semibold truncate ${
                            conversation.unread
                              ? 'text-zinc-900 dark:text-white'
                              : 'text-zinc-700 dark:text-zinc-300'
                          }`}
                        >
                          {conversation.hostName}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                          {conversation.propertyName}
                        </p>
                      </div>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2 shrink-0">
                        {conversation.timestamp.toLocaleDateString(locale, {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        conversation.unread
                          ? 'text-zinc-900 dark:text-white font-medium'
                          : 'text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {conversation.lastMessage}
                    </p>
                  </div>

                  {/* Arrow */}
                  <Icon
                    icon="lucide:chevron-right"
                    className="w-5 h-5 text-zinc-400 shrink-0"
                  />
                </Link>
              ))
            )}
          </div>

          {/* Tips */}
          <div className="mt-8 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-start gap-4">
              <Icon
                icon="lucide:info"
                className="w-6 h-6 text-primary shrink-0 mt-1"
              />
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                  Conseils pour une bonne communication
                </h3>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="lucide:check"
                      className="w-4 h-4 text-green-600 shrink-0 mt-0.5"
                    />
                    <span>
                      Répondez rapidement aux messages de vos hôtes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="lucide:check"
                      className="w-4 h-4 text-green-600 shrink-0 mt-0.5"
                    />
                    <span>
                      Posez toutes vos questions avant de réserver
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon
                      icon="lucide:check"
                      className="w-4 h-4 text-green-600 shrink-0 mt-0.5"
                    />
                    <span>
                      Restez courtois et professionnel
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
