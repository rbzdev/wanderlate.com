import { useTranslations } from 'next-intl';

type Props = {
  params: { locale: string };
};

export default function PolitiqueConfidentialitePage({ params: { locale } }: Props) {
  const t = useTranslations('PrivacyPolicy');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-2 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('controller.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              {t('controller.description')}
            </p>
            <div className="space-y-1.5 text-sm text-gray-700">
              <p><strong>{t('controller.contact')} :</strong></p>
              <p>Email : privacy@wanderlate.com</p>
              <p>Adresse : 2 Place Jean V, 44000 Nantes, France</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('dataCollected.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              {t('dataCollected.description')}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700">
              <li>{t('dataCollected.items.identity')}</li>
              <li>{t('dataCollected.items.contact')}</li>
              <li>{t('dataCollected.items.booking')}</li>
              <li>{t('dataCollected.items.payment')}</li>
              <li>{t('dataCollected.items.technical')}</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('purposes.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-1.5">
              {t('purposes.description')}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700">
              <li>{t('purposes.items.booking')}</li>
              <li>{t('purposes.items.management')}</li>
              <li>{t('purposes.items.support')}</li>
              <li>{t('purposes.items.security')}</li>
              <li>{t('purposes.items.marketing')}</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('legalBasis.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-1.5">
              {t('legalBasis.description')}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700">
              <li>{t('legalBasis.items.contract')}</li>
              <li>{t('legalBasis.items.legal')}</li>
              <li>{t('legalBasis.items.consent')}</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('sharing.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-1.5">
              {t('sharing.description')}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700 mb-2">
              <li>{t('sharing.items.partners')}</li>
              <li>{t('sharing.items.technical')}</li>
              <li>{t('sharing.items.authorities')}</li>
            </ul>
            <p className="text-sm text-gray-700">
              {t('sharing.noCommercial')}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('retention.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-1.5">
              {t('retention.description')}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700">
              <li>{t('retention.items.commercial')}</li>
              <li>{t('retention.items.technical')}</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('rights.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-1.5">
              {t('rights.description')}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700 mb-2">
              <li>{t('rights.items.access')}</li>
              <li>{t('rights.items.rectification')}</li>
              <li>{t('rights.items.erasure')}</li>
              <li>{t('rights.items.limitation')}</li>
              <li>{t('rights.items.opposition')}</li>
              <li>{t('rights.items.portability')}</li>
            </ul>
            <p className="text-sm text-gray-700">
              {t('rights.contact')}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('security.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('security.measures')}</p>
              <p>{t('security.pciDss')}</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('cookies.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-1.5">
              {t('cookies.description')}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700 mb-2">
              <li>{t('cookies.items.functional')}</li>
              <li>{t('cookies.items.analytics')}</li>
              <li>{t('cookies.items.personalized')}</li>
            </ul>
            <p className="text-sm text-gray-700">
              {t('cookies.management')}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('contact.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              {t('contact.description')}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Email : privacy@wanderlate.com
            </p>
            <p className="text-sm text-gray-700">
              {t('contact.cnil')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
