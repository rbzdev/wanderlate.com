# Dashboard Page

## Overview

The dashboard is a **Server Component** that displays user statistics, recent trips, and quick actions. It fetches data directly from the database using Prisma and passes it to client components for interactive UI.

## Architecture

### Server Component (page.tsx)
- Fetches user data and trips from MongoDB via Prisma
- Calculates statistics (total trips, upcoming, completed, spent)
- Passes data as props to client components
- Handles authentication check and redirects if needed

### Client Components (components/)

#### WelcomeBanner
- Displays personalized greeting with user's name
- Animated gradient banner

#### StatsCard
- Shows individual statistics with icons
- Supports trend indicators
- Color variants: blue, green, purple, orange
- Animated entry

#### QuickActions
- Grid of action cards for common tasks
- Configurable icons, colors, and links
- Hover animations

#### TripCard
- Displays trip summary with status badge
- Shows dates, location, and traveler count
- Links to trip detail page
- Status-based styling

## Data Flow

```
Database (MongoDB)
    ↓
Prisma Client
    ↓
Server Component (page.tsx)
    ↓
Client Components (props)
    ↓
User Interface
```

## Authentication

⚠️ **Current Implementation**: Uses mock user ID (`temp-user-id`)

**TODO**: Integrate with actual authentication system (NextAuth, Clerk, or custom JWT)

```typescript
// TODO: Replace this with actual session
const mockUserId = 'temp-user-id';
```

## Database Models Used

- **User**: User account information
- **Trip**: Travel itinerary container
- **Booking**: Individual bookings within trips

## Translations

Translations are managed via `next-intl` in:
- `/messages/en.json`
- `/messages/fr.json`

All text content uses the `Dashboard` namespace.

## Features

✅ Server-side rendering for SEO and performance  
✅ Real-time data from database  
✅ Responsive grid layouts  
✅ Dark mode support  
✅ Internationalization (EN/FR)  
✅ Animated UI with Framer Motion  
✅ Type-safe with TypeScript  

## Usage

Access the dashboard at:
- `/en/dashboard` (English)
- `/fr/dashboard` (French)

User must be authenticated (redirects to login if not).

## Future Enhancements

- [ ] Real authentication integration
- [ ] Trip filtering and search
- [ ] Export trip data
- [ ] Budget tracking charts
- [ ] Upcoming booking reminders
- [ ] Travel insurance status
- [ ] Loyalty points/rewards display
