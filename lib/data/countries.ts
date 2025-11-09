/**
 * Countries data for EU + USA
 * Including country codes, phone codes, and flags
 */

export interface Country {
  code: string;
  name: {
    en: string;
    fr: string;
  };
  phoneCode: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  // European Union Countries
  { code: 'AT', name: { en: 'Austria', fr: 'Autriche' }, phoneCode: '+43', flag: '🇦🇹' },
  { code: 'BE', name: { en: 'Belgium', fr: 'Belgique' }, phoneCode: '+32', flag: '🇧🇪' },
  { code: 'BG', name: { en: 'Bulgaria', fr: 'Bulgarie' }, phoneCode: '+359', flag: '🇧🇬' },
  { code: 'HR', name: { en: 'Croatia', fr: 'Croatie' }, phoneCode: '+385', flag: '🇭🇷' },
  { code: 'CY', name: { en: 'Cyprus', fr: 'Chypre' }, phoneCode: '+357', flag: '🇨🇾' },
  { code: 'CZ', name: { en: 'Czech Republic', fr: 'République tchèque' }, phoneCode: '+420', flag: '🇨🇿' },
  { code: 'DK', name: { en: 'Denmark', fr: 'Danemark' }, phoneCode: '+45', flag: '🇩🇰' },
  { code: 'EE', name: { en: 'Estonia', fr: 'Estonie' }, phoneCode: '+372', flag: '🇪🇪' },
  { code: 'FI', name: { en: 'Finland', fr: 'Finlande' }, phoneCode: '+358', flag: '🇫🇮' },
  { code: 'FR', name: { en: 'France', fr: 'France' }, phoneCode: '+33', flag: '🇫🇷' },
  { code: 'DE', name: { en: 'Germany', fr: 'Allemagne' }, phoneCode: '+49', flag: '🇩🇪' },
  { code: 'GR', name: { en: 'Greece', fr: 'Grèce' }, phoneCode: '+30', flag: '🇬🇷' },
  { code: 'HU', name: { en: 'Hungary', fr: 'Hongrie' }, phoneCode: '+36', flag: '🇭🇺' },
  { code: 'IE', name: { en: 'Ireland', fr: 'Irlande' }, phoneCode: '+353', flag: '🇮🇪' },
  { code: 'IT', name: { en: 'Italy', fr: 'Italie' }, phoneCode: '+39', flag: '🇮🇹' },
  { code: 'LV', name: { en: 'Latvia', fr: 'Lettonie' }, phoneCode: '+371', flag: '🇱🇻' },
  { code: 'LT', name: { en: 'Lithuania', fr: 'Lituanie' }, phoneCode: '+370', flag: '🇱🇹' },
  { code: 'LU', name: { en: 'Luxembourg', fr: 'Luxembourg' }, phoneCode: '+352', flag: '🇱🇺' },
  { code: 'MT', name: { en: 'Malta', fr: 'Malte' }, phoneCode: '+356', flag: '🇲🇹' },
  { code: 'NL', name: { en: 'Netherlands', fr: 'Pays-Bas' }, phoneCode: '+31', flag: '🇳🇱' },
  { code: 'PL', name: { en: 'Poland', fr: 'Pologne' }, phoneCode: '+48', flag: '🇵🇱' },
  { code: 'PT', name: { en: 'Portugal', fr: 'Portugal' }, phoneCode: '+351', flag: '🇵🇹' },
  { code: 'RO', name: { en: 'Romania', fr: 'Roumanie' }, phoneCode: '+40', flag: '🇷🇴' },
  { code: 'SK', name: { en: 'Slovakia', fr: 'Slovaquie' }, phoneCode: '+421', flag: '🇸🇰' },
  { code: 'SI', name: { en: 'Slovenia', fr: 'Slovénie' }, phoneCode: '+386', flag: '🇸🇮' },
  { code: 'ES', name: { en: 'Spain', fr: 'Espagne' }, phoneCode: '+34', flag: '🇪🇸' },
  { code: 'SE', name: { en: 'Sweden', fr: 'Suède' }, phoneCode: '+46', flag: '🇸🇪' },
  
  // United States
  { code: 'US', name: { en: 'United States', fr: 'États-Unis' }, phoneCode: '+1', flag: '🇺🇸' },
].sort((a, b) => a.name.en.localeCompare(b.name.en));
