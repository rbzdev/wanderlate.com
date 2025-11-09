/**
 * Languages data for Wanderlate
 */

export interface Language {
  code: string;
  name: {
    en: string;
    fr: string;
  };
  nativeName: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { 
    code: 'en', 
    name: { en: 'English', fr: 'Anglais' }, 
    nativeName: 'English',
    flag: '🇬🇧' 
  },
  { 
    code: 'fr', 
    name: { en: 'French', fr: 'Français' }, 
    nativeName: 'Français',
    flag: '🇫🇷' 
  },
  { 
    code: 'de', 
    name: { en: 'German', fr: 'Allemand' }, 
    nativeName: 'Deutsch',
    flag: '🇩🇪' 
  },
  { 
    code: 'es', 
    name: { en: 'Spanish', fr: 'Espagnol' }, 
    nativeName: 'Español',
    flag: '🇪🇸' 
  },
  { 
    code: 'it', 
    name: { en: 'Italian', fr: 'Italien' }, 
    nativeName: 'Italiano',
    flag: '🇮🇹' 
  },
];
