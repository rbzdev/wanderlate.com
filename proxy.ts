import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import createMiddleware from 'next-intl/middleware';

const SESSION_COOKIE = 'session'
const key = process.env.SESSION_SECRET

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  localeDetection: true,
  alternateLinks: false
});


// Vérifie si la requête est authentifiée en validant le JWT dans le cookie de session
async function isAuthenticated(req: NextRequest): Promise<boolean> {
  try {
    if (!key) return false
    const token = req.cookies.get(SESSION_COOKIE)?.value
    if (!token) return false
    const encodedKey = new TextEncoder().encode(key)
    const { payload } = await jwtVerify(token, encodedKey, { algorithms: ['HS256'] })
    return typeof payload?.userId === 'string' && payload.userId.length > 0
  } catch {
    return false
  }
}

function startsWithAny(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((p) => pathname === p || pathname.startsWith(p + '/'))
}

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  // Check if this is an API route
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check if this is already a localized path
  const segments = pathname.split('/').filter(Boolean);
  const maybeLocale = segments[0];
  const locales = ['en', 'fr'];
  
  if (!locales.includes(maybeLocale)) {
    // No locale in URL, detect and redirect to appropriate locale
    const acceptLanguage = req.headers.get('accept-language') || '';
    let detectedLocale = 'fr'; // Default fallback
    
    // Simple language detection
    if (acceptLanguage.includes('en') && !acceptLanguage.includes('fr')) {
      detectedLocale = 'en';
    } else if (acceptLanguage.includes('fr')) {
      detectedLocale = 'fr';
    }
    
    const url = req.nextUrl.clone();
    url.pathname = `/${detectedLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // If we have a locale, continue with auth logic
  const locale = locales.includes(maybeLocale) ? maybeLocale : 'fr';
  const pathWithoutLocale = locales.includes(maybeLocale) 
    ? (segments.length > 1 ? '/' + segments.slice(1).join('/') : '/')
    : pathname;

  const authed = await isAuthenticated(req);

  // Pages accessibles seulement si NON authentifié (login/register)
  const publicOnly = ['/login', '/register']
  if (startsWithAny(pathWithoutLocale, publicOnly) && authed) {
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}/dashboard`
    url.search = ''
    return NextResponse.redirect(url)
  }

  // Pages protégées: rediriger vers login si NON authentifié
  const protectedAreas = ['/dashboard', '/wishlist', '/account', '/orders', '/settings', 'account']
  if (startsWithAny(pathWithoutLocale, protectedAreas) && !authed) {
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}/login`
    const nextParam = pathname + (search || '')
    url.search = `?next=${encodeURIComponent(nextParam)}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Exclure assets statiques, images Next et l'API de ce middleware
export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\.).*)'
  ],
}


// Comment ça marche

// Découverte auto: Next.js détecte middleware.ts à la racine et l’exécute sur chaque requête correspondant au matcher (aucun import manuel).
// Notre middleware vérifie le cookie session (JWT signé) et:
// redirige un utilisateur déjà connecté loin des pages /auth/* (login/register),
// redirige un utilisateur non connecté loin des zones protégées (/dashboard, /inv) vers /auth/login?next=....
// Les assets statiques, images Next, API, etc., sont exclus via config.matcher.
