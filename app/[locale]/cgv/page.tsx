import { useTranslations } from 'next-intl';
// import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export default function CGVPage({ params: { locale } }: Props) {
//   unstable_setRequestLocale(locale);
  const t = useTranslations('TermsOfSale');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-2 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('purpose.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('purpose.description')}</p>
              <p>{t('purpose.intermediary')}</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('identification.title')}
            </h2>
            <div className="space-y-1.5 text-sm text-gray-700">
              <p>WANDERLATE SARL</p>
              <p>Capital social : 250 000 €</p>
              <p>Siège social : 2 Place Jean V, 44000 Nantes, France</p>
              <p>R.C.S. Nantes 991 607 656</p>
              <p>SIRET : 991 607 656 00014</p>
              <p>TVA : FR14991607656</p>
              <p>Immatriculée Atout France : EN COURS</p>
              <p>Accréditée IATA (International Air Transport Association) : EN COURS</p>
              <p>E-mail : support@wanderlate.com</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('services.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-1.5">
              {t('services.description')}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700 mb-2">
              <li>{t('services.items.stays')}</li>
              <li>{t('services.items.flights')}</li>
              <li>{t('services.items.activities')}</li>
            </ul>
            <p className="text-sm text-gray-700">
              {t('services.providers')}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('platform.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              {t('platform.role')}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              {t('platform.contract')}
            </p>
            <p className="text-sm text-gray-700 mb-1.5">
              {t('platform.functions')}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700">
              <li>{t('platform.items.facilitate')}</li>
              <li>{t('platform.items.centralize')}</li>
              <li>{t('platform.items.guarantee')}</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('pricing.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('pricing.inclusive')}</p>
              <p>{t('pricing.fullPayment')}</p>
              <p>{t('pricing.security')}</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('cancellation.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('cancellation.conditions')}</p>
              <p>{t('cancellation.display')}</p>
              <p>{t('cancellation.fees')}</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('responsibilities.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-1.5">
              {t('responsibilities.notLiable')}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700 mb-2">
              <li>{t('responsibilities.items.execution')}</li>
              <li>{t('responsibilities.items.forceMajeure')}</li>
              <li>{t('responsibilities.items.customerErrors')}</li>
            </ul>
            <p className="text-sm text-gray-700">
              {t('responsibilities.commitment')}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('personalData.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('personalData.gdpr')}</p>
              <p>{t('personalData.noSharing')}</p>
              <p>{t('personalData.rights')}</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('law.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('law.applicable')}</p>
              <p>{t('law.jurisdiction')}</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('mediation.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('mediation.description')}</p>
              <p>Site : www.mtv.travel</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
