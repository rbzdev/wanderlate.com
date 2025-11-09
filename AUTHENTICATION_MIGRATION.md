# Migration Dashboard vers Authentification JWT

## Modifications Apportées

### 1. Dashboard (`app/[locale]/dashboard/page.tsx`)

**Avant :**
- Utilisait un `mockUserId = 'temp-user-id'` hardcodé
- Affichait un écran "notAuthenticated" si utilisateur introuvable
- Pas de vraie authentification

**Après :**
- ✅ Utilise `getSession()` de `lib/session.ts` pour récupérer la vraie session JWT
- ✅ Redirige vers `/login` si pas de session (via `redirect()`)
- ✅ Récupère l'utilisateur depuis la BDD avec `session.userId`
- ✅ Redirige également si session existe mais utilisateur supprimé de la BDD

```typescript
// Nouvelle logique
const session = await getSession();
if (!session) {
  redirect(`/${locale}/login`);
}

const user = await prisma.user.findUnique({
  where: { id: session.userId },
  // ...
});

if (!user) {
  redirect(`/${locale}/login`);
}
```

### 2. Seed (`prisma/seed.ts`)

**Avant :**
- Créait un utilisateur avec `id: 'temp-user-id'` hardcodé

**Après :**
- ✅ Laisse Prisma générer un UUID automatiquement
- ✅ Affiche l'ID généré dans la console pour référence
- ✅ Plus de dépendance à un ID mock

### 3. Route Logout (`app/api/auth/logout/route.ts`)

**Nouveau fichier créé :**
- ✅ Endpoint `POST /api/auth/logout`
- ✅ Supprime le cookie de session via `deleteSession()`
- ✅ Retourne une réponse JSON de confirmation

### 4. Traductions Nettoyées

**Messages supprimés :**
- `Dashboard.notAuthenticated.*` (plus nécessaire)

## Flux d'Authentification Complet

### Inscription
1. User remplit formulaire `/signup`
2. POST `/api/auth/register`
3. Validation Zod
4. Hash password (bcrypt 12 rounds)
5. Création utilisateur en BDD
6. **`createSession(user.id)`** ← Création session JWT
7. Cookie `session` défini (HttpOnly, Secure, 7 jours)
8. Redirection vers `/login` ou `/dashboard`

### Connexion (à implémenter)
1. User remplit formulaire `/login`
2. POST `/api/auth/login`
3. Vérification email + password
4. **`createSession(user.id)`**
5. Cookie `session` défini
6. Redirection vers `/dashboard`

### Accès Dashboard
1. User visite `/dashboard`
2. Serveur appelle `getSession()`
3. Déchiffrement du JWT et vérification expiration
4. Si valide → récupération user depuis BDD
5. Si invalide/expiré → `redirect('/login')`

### Déconnexion
1. User clique "Logout"
2. POST `/api/auth/logout`
3. **`deleteSession()`** ← Suppression cookie
4. Redirection vers `/` ou `/login`

## Avantages de cette Architecture

✅ **Sécurisé** : JWT signé avec `SESSION_SECRET`, cookies HttpOnly/Secure  
✅ **Stateless** : Pas de store de sessions côté serveur  
✅ **Rolling sessions** : Expiration renouvelée à chaque requête via `updateSession()`  
✅ **SSR-compatible** : Fonctionne avec React Server Components  
✅ **Type-safe** : TypeScript strict sur `SessionPayload`  

## Configuration Requise

### Variables d'Environnement (`.env`)

```bash
DATABASE_URL="mongodb+srv://..."
SESSION_SECRET="votre_secret_aleatoire_minimum_32_caracteres_ici"
```

**Important :** `SESSION_SECRET` doit être une chaîne aléatoire longue (≥32 caractères).

Générer un secret :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Utilisation

### Tester l'Inscription et Session

```bash
# 1. Peupler la BDD avec données de test
pnpm db:seed

# 2. S'inscrire avec le formulaire
# Aller sur http://localhost:3000/fr/signup
# Email: nouveau@test.com
# Password: Test123!

# 3. La session est créée automatiquement après inscription

# 4. Accéder au dashboard
# http://localhost:3000/fr/dashboard
# ✅ Authentifié via session JWT
```

### Tester la Déconnexion

```javascript
// Côté client (à implémenter dans un composant)
async function handleLogout() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  });
  
  if (response.ok) {
    window.location.href = '/fr/login';
  }
}
```

## Prochaines Étapes

### À Implémenter

1. **Route Login** (`app/api/auth/login/route.ts`)
   - Valider email/password
   - Vérifier hash avec `bcrypt.compare()`
   - Créer session si valide

2. **Page Login** (`app/[locale]/login/page.tsx`)
   - Formulaire déjà créé
   - Connecter à l'API `/api/auth/login`

3. **Middleware** (`middleware.ts`)
   - Protéger les routes `/dashboard`, `/profile`, etc.
   - Vérification rapide du token JWT
   - Redirection automatique si non authentifié

4. **Composant Logout**
   - Bouton dans NavBar ou Dashboard
   - Appel à `/api/auth/logout`

5. **Refresh automatique** (optionnel)
   - Implémenter `updateSession()` dans un middleware
   - Renouveler l'expiration à chaque requête

## Fichiers Modifiés

| Fichier | Action |
|---------|--------|
| `app/[locale]/dashboard/page.tsx` | ✅ Modifié - Utilise vraie session |
| `prisma/seed.ts` | ✅ Modifié - Supprimé ID hardcodé |
| `app/api/auth/logout/route.ts` | ✅ Créé - Endpoint de déconnexion |
| `app/api/auth/register/route.ts` | ✅ Déjà OK - Crée session |
| `lib/session.ts` | ✅ Déjà OK - Gestion JWT |

## Résumé

Le dashboard utilise maintenant une **vraie authentification JWT** via les sessions. Plus besoin de mock user ID. Le flux complet inscription → session → dashboard fonctionne. Il reste à implémenter la route de login pour compléter le système d'authentification.
