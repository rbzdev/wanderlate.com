import { useTranslations } from 'next-intl';

type Props = {
  params: { locale: string };
};

export default function CGUPage({ params: { locale } }: Props) {
  const t = useTranslations('TermsOfUse');

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
            <p className="text-sm text-gray-700 mb-2">
              {t('purpose.description')}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('company.title')}
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
              {t('service.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              {t('service.description')}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700 mb-2">
              <li>{t('service.features.search')}</li>
              <li>{t('service.features.connect')}</li>
              <li>{t('service.features.manage')}</li>
            </ul>
            <p className="text-sm text-gray-700">
              {t('service.intermediary')}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('access.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              {t('access.free')}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              {t('access.acceptance')}
            </p>
            <p className="text-sm text-gray-700 mb-1.5">
              {t('access.userCommitments')}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700 mb-2">
              <li>{t('access.commitments.accurate')}</li>
              <li>{t('access.commitments.lawful')}</li>
              <li>{t('access.commitments.noDisruption')}</li>
            </ul>
            <p className="text-sm text-gray-700">
              {t('access.suspension')}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('account.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('account.creation')}</p>
              <p>{t('account.responsibility')}</p>
              <p>{t('account.unauthorized')}</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('responsibilities.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              {t('responsibilities.commitment')}
            </p>
            <p className="text-sm text-gray-700 mb-1.5">
              {t('responsibilities.notLiable')}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700 mb-2">
              <li>{t('responsibilities.items.interruptions')}</li>
              <li>{t('responsibilities.items.partners')}</li>
              <li>{t('responsibilities.items.misuse')}</li>
            </ul>
            <p className="text-sm text-gray-700">
              {t('responsibilities.thirdParty')}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('personalData.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('personalData.gdpr')}</p>
              <p>{t('personalData.purpose')}</p>
              <p>{t('personalData.rights')}</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('intellectualProperty.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('intellectualProperty.protection')}</p>
              <p>{t('intellectualProperty.prohibition')}</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('modifications.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('modifications.right')}</p>
              <p>{t('modifications.notification')}</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('law.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('law.applicable')}</p>
              <p>{t('law.jurisdiction')}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
