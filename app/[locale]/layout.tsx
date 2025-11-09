import type { Metadata } from "next";
import "../globals.css";

// Internationalisation helper
import { getMessages } from 'next-intl/server';

// Internationalisation
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
  title: "Wanderlate - Réservations d'hôtels",
  description: "Réservez votre séjour parfait partout dans le monde avec Wanderlate",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={` antialiased overflow-x-hidden `}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>

      </body>
    </html>
  );
}
