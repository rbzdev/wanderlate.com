import { useTranslations } from 'next-intl';
// import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export default function MentionsLegalesPage({ params: { locale } }: Props) {
//   unstable_setRequestLocale(locale);
  const t = useTranslations('LegalNotice');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-2 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('identification.title')}
            </h2>
            <div className="space-y-1.5 text-sm text-gray-700">
              <p><strong>{t('identification.denomination')} :</strong> Wanderlate SAS</p>
              <p><strong>{t('identification.legalForm')} :</strong> SASU, société par actions simplifiée unipersonnelle</p>
              <p><strong>{t('identification.capital')} :</strong> 250 000 €</p>
              <p><strong>{t('identification.headquarters')} :</strong> 2 Place Jean V, 44000 Nantes, France</p>
              <p><strong>E-mail :</strong> support@wanderlate.com</p>
              <p><strong>SIRET :</strong> 91 607 656 00014</p>
              <p><strong>RCS :</strong> Nantes 991 607 656</p>
              <p><strong>{t('identification.vat')} :</strong> FR14991607656</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('activity.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('activity.description')}</p>
              <p>{t('activity.registration')}</p>
              <p>{t('activity.iata')}</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('hosting.title')}
            </h2>
            <div className="space-y-1.5 text-sm text-gray-700">
              <p><strong>{t('hosting.provider')} :</strong> OVH SAS</p>
              <p>2 rue Kellermann – 59100 Roubaix – France</p>
              <p>Tél. : +33 (0)9 72 10 10 07</p>
              <p>Site : www.ovh.com</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('intellectualProperty.title')}
            </h2>
            <p className="text-sm text-gray-700">
              {t('intellectualProperty.content')}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('dataProtection.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('dataProtection.gdpr')}</p>
              <p>{t('dataProtection.rights')}</p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('liability.title')}
            </h2>
            <p className="text-sm text-gray-700">
              {t('liability.content')}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {t('applicableLaw.title')}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>{t('applicableLaw.law')}</p>
              <p>{t('applicableLaw.jurisdiction')}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
