# Intégration Hotelbeds API

## Configuration

1. **Créer un compte développeur Hotelbeds**
   - Rendez-vous sur [https://developer.hotelbeds.com](https://developer.hotelbeds.com)
   - Créez un compte et obtenez vos clés API (API Key et API Secret)

2. **Configurer les variables d'environnement**
   - Copiez `.env.example` vers `.env.local`
   - Remplissez les variables Hotelbeds:
     ```env
     HOTELBEDS_API_KEY="votre-api-key"
     HOTELBEDS_API_SECRET="votre-api-secret"
     ```

## API Endpoint

### POST `/api/hotels/search`

Recherche d'hôtels via l'API Hotelbeds.

#### Paramètres de requête

```json
{
  "destination": "PAR", // Code destination Hotelbeds (ex: PAR pour Paris)
  "checkIn": "2025-12-01", // Format: YYYY-MM-DD
  "checkOut": "2025-12-05", // Format: YYYY-MM-DD
  "adults": 2,
  "children": 0,
  "rooms": 1
}
```

#### Réponse

```json
{
  "success": true,
  "total": 50,
  "hotels": [
    {
      "code": "12345",
      "name": "Hotel Example",
      "destinationName": "Paris",
      "categoryCode": "4",
      "categoryName": "4 étoiles",
      "minRate": 150,
      "maxRate": 300,
      "currency": "EUR",
      "images": ["url1", "url2"],
      "description": "Description de l'hôtel",
      "rating": 4,
      "reviewsCount": 250,
      "amenities": ["WiFi", "Piscine", "Restaurant"]
    }
  ]
}
```

## Codes de destination

Quelques codes de destination Hotelbeds courants:
- **PAR**: Paris, France
- **LON**: Londres, Royaume-Uni
- **NYC**: New York, USA
- **BCN**: Barcelone, Espagne
- **ROM**: Rome, Italie

Liste complète: [Hotelbeds Destination Codes](https://developer.hotelbeds.com/documentation/hotels/content-api/api-reference/)

## Utilisation

La page `/trips` utilise automatiquement cette API pour rechercher des hôtels.

Les utilisateurs peuvent:
- Rechercher des hôtels par destination et dates
- Filtrer par prix (min/max)
- Voir les détails des hôtels
- Filtrer par étoiles, équipements, type de pension (à venir)

## Environnement de test

L'API est configurée pour utiliser l'environnement de test Hotelbeds par défaut:
- URL: `https://api.test.hotelbeds.com/hotel-api/1.0`

Pour passer en production, modifiez l'URL dans `/api/hotels/search/route.ts`:
```typescript
const HOTELBEDS_API_URL = 'https://api.hotelbeds.com/hotel-api/1.0';
```

## Sécurité

- Les clés API ne sont **jamais** exposées côté client
- La signature X-Signature est générée serveur-side avec SHA-256
- Toutes les requêtes passent par notre API route sécurisée

## Limitations

- Environnement de test: données limitées
- Rate limiting Hotelbeds: consulter votre contrat
- Cache recommandé pour optimiser les performances (à implémenter)
