import {getRequestConfig} from 'next-intl/server';
 
// Use the locale from the URL segment so content matches /en or /fr exactly
export default getRequestConfig(async ({locale}) => {
  const resolved = ['en', 'fr'].includes(locale) ? locale : 'fr';
 
  return {
    locale: resolved,
    messages: (await import(`../messages/${resolved}.json`)).default
  };
});