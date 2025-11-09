/**
 * Currencies data for Wanderlate
 */

export interface Currency {
  code: string;
  name: {
    en: string;
    fr: string;
  };
  symbol: string;
  flag: string;
}

export const CURRENCIES: Currency[] = [
  { 
    code: 'EUR', 
    name: { en: 'Euro', fr: 'Euro' }, 
    symbol: '€',
    flag: '🇪🇺' 
  },
  { 
    code: 'USD', 
    name: { en: 'US Dollar', fr: 'Dollar américain' }, 
    symbol: '$',
    flag: '🇺🇸' 
  },
  { 
    code: 'GBP', 
    name: { en: 'British Pound', fr: 'Livre sterling' }, 
    symbol: '£',
    flag: '🇬🇧' 
  },
  { 
    code: 'CHF', 
    name: { en: 'Swiss Franc', fr: 'Franc suisse' }, 
    symbol: 'CHF',
    flag: '🇨🇭' 
  },
];
