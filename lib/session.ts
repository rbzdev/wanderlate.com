import 'server-only'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

// Basic session payload type co-located here (avoid missing import)
export type SessionPayload = {
  userId: string
  // Absolute expiry timestamp used to set cookie expiry and quick checks
  expiresAt: Date
}

const secretKey = process.env.SESSION_SECRET
if (!secretKey) {
  // In server-only context, throwing early helps avoid silent misconfig
  throw new Error('SESSION_SECRET manquant. Ajoutez SESSION_SECRET dans votre .env (32+ chars).')
}
const encodedKey = new TextEncoder().encode(secretKey)

// -- Crypto helpers --
export async function encrypt(payload: SessionPayload) {
  return new SignJWT({
    ...payload,
    // Store as ISO string to ensure stable JSON in JWT
    expiresAt: payload.expiresAt.toISOString(),
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    // Normalize and validate fields
    const userId = typeof payload.userId === 'string' ? payload.userId : ''
    const expiresAtStr = typeof payload.expiresAt === 'string' ? payload.expiresAt : ''
    const expiresAt = new Date(expiresAtStr)
    if (!userId || Number.isNaN(expiresAt.getTime())) return null
    return { userId, expiresAt }
  } catch {
    return null
  }
}

// -- Cookie/session helpers --
const SESSION_COOKIE = 'session'
const WEEK_MS = 7 * 24 * 60 * 60 * 1000

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + WEEK_MS)
  const jwt = await encrypt({ userId, expiresAt })
  const store = await cookies()

  store.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null
  return await decrypt(token)
}

export async function updateSession(): Promise<void> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return
  const session = await decrypt(token)
  if (!session) return
  // Extend rolling expiry
  session.expiresAt = new Date(Date.now() + WEEK_MS)
  const next = await encrypt(session)
  store.set(SESSION_COOKIE, next, {
    httpOnly: true,
    secure: true,
    expires: session.expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession(): Promise<void> {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}









// Comment l’utiliser

// À la connexion (après vérif du mot de passe):
// appelez await createSession(user.id).
// À chaque requête serveur où la session est requise:
// const session = await getSession() puis vérifiez session?.userId.
// Pour étendre la durée de vie quand l’utilisateur est actif:
// await updateSession() lors d’un hit serveur pertinent.
// À la déconnexion:
// await deleteSession().
// Middleware (optionnel)

// Avec cette base, vous pouvez ajouter un middleware.ts pour des “optimistic checks”:
// Lire le cookie, vérifier le token rapidement (ou au moins sa présence) et router selon authentification.
// Pour des vérifications cryptographiques complètes, privilégier getSession() côté RSC/Route Handlers.
// Pré-requis

// Ajoutez dans .env:
// SESSION_SECRET=une_chaine_longue_et_aléatoire_d’au_moins_32_caractères
// Vous avez déjà installé jose via Next (pas besoin de dépendance dédiée).
// Prochaines étapes suggérées

// Intégrer createSession dans votre action loginAction.
// Ajouter un logout route handler qui appelle deleteSession.
// Si vous voulez, je peux créer un middleware.ts basique qui redirige /auth/* → / pour les utilisateurs déjà connectés, et protège des routes privées en l’absence de session.
// GPT-5 • 1x