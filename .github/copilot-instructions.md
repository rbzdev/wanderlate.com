# Wanderlate Engineering & Domain Guidelines (Next.js / TypeScript / Prisma / Travel Booking)

Authoritative reference for building the Wanderlate platform: multi‑channel travel & leisure reservation (trips, flights, stays, cars, packages, activities) using Next.js App Router + Prisma (MongoDB). Keep scope lean; optimize for clarity, safety and evolvability.

## Stack
* Framework: Next.js 16.1 (App Router) + TypeScript (strict).
* Rendering: React Server Components by default; opt‑in client components only for interactivity (state, effects, event handlers, browser APIs, context providers).
* ORM / DB: Prisma targeting MongoDB.
* Styling: Tailwind CSS utility-first. Prefer design tokens / config classes over arbitrary values. Co-locate style concerns with components.
* Package manager: pnpm.
* API surface: Route handlers in `/api/**` (REST-ish JSON) + (future) server actions for internal mutations with validation.

## Core Domain (Travel Reservation)
Key entities (initial minimal fields; extend intentionally):
* User: id, email, phone, name, passwordHash, role ('user'|'admin'), preferences (locale,currency), createdAt, updatedAt.
* Trip (Itinerary container): id, userId (owner), title, startDate, endDate, travelers (count), status ('planning'|'confirmed'|'completed'|'cancelled'), createdAt, updatedAt.
* Booking: id, tripId, type ('flight'|'car'|'activity'|'package'|'lodging'), supplierRef, status ('pending'|'held'|'confirmed'|'cancelled'), price (amount,currency), meta (JSON), createdAt, updatedAt.
* FlightSegment: id, bookingId, marketingCarrier, flightNumber, departureAirport, arrivalAirport, departureTime, arrivalTime, cabinClass, fareClass.
* Lodging: id, bookingId, propertyName, checkIn, checkOut, roomType, boardType.
* CarRental: id, bookingId, pickupLocation, dropoffLocation, pickupDateTime, dropoffDateTime, vehicleClass, vendor.
* Activity: id, bookingId, name, location, scheduledAt, durationMinutes.
* Package: id, tripId, name, bundleComponents (array of Booking ids or typed refs), bundlePrice (amount,currency).
* Payment (future): id, userId, bookingId, provider, providerRef, amount (amount,currency), status, createdAt, updatedAt.
* AuditLog (future): id, actorUserId, action, entityType, entityId, diff, createdAt.

Notes:
* Normalize where clarity matters; allow selective denormalization (e.g. snapshot pricing in Booking.meta) with explicit naming (`snapshotPrice`).
* Do NOT store raw payment card data. Use external provider tokens only.
* Use `meta` JSON field sparingly for supplier-specific payload fragments; surface promoted fields first.

## Modeling Guidelines
1. camelCase field names; no semantic abbreviations (use `departureAirport`, not `depApt`).
2. Always include `createdAt` (default now()) and `updatedAt` (@updatedAt) except for immutable sub-documents or pure join tables (rare in Mongo).
3. Add `@@index` / `@@unique` only when query or constraint justifies; enumerate rationale in code comment.
4. Use explicit relation fields (e.g. `tripId`) even in Mongo for clarity.
5. Monetary values: store as `{ amount: number; currency: string }` (ISO 4217). Amounts in minor units (e.g. cents) preferred for precision; document chosen approach consistently.

## Naming Conventions
* Files / route segments: kebab-case (`app/trips/[tripId]/page.tsx`).
* React components: PascalCase.
* Functions & variables: camelCase.
* Prisma models: PascalCase singular (User, Trip, Booking, FlightSegment, CarRental, Activity, Package, Lodging, Payment, AuditLog).
* Env vars: UPPER_SNAKE_CASE (e.g. DATABASE_URL, NEXT_PUBLIC_APP_BASE_URL, PAYMENT_PROVIDER_KEY).
* Commits: Conventional Commits (feat:, fix:, chore:, refactor:, docs:, test:, perf:).

## Folder Structure (Guidance)
app/               (routes & server components)
lib/               (prisma client, domain logic, validation)
  prisma/          (Prisma client helper)
  domain/          (pure business logic: pricing, validation)
components/
  ui/              (reusable presentational building blocks)
  bookings/        (feature-scoped components)
  trips/           (trip planning components)
scripts/           (one-off maintenance / generation)

Avoid deep nesting unless clarity improves; keep import paths short.

## React & Next.js Rules
* Server-first mindset; introduce 'use client' only with a concrete reason.
* Never access `process.env` directly in client components; expose only `NEXT_PUBLIC_` prefixed vars when truly necessary.
* Employ route handlers in `/api` for public/HTTP integration boundaries; use server actions for authenticated in-app mutations when ergonomics help.
* Validate all mutation inputs (Zod strongly preferred) before DB writes.
* Strip or map DB entities to DTOs omitting sensitive fields (passwordHash, internal pricing breakdowns, provider tokens).

## Error Handling
* Wrap DB & external API calls in try/catch; log sanitized context (never secrets or PII).
* Use a lightweight error factory or discriminated unions (e.g. `createError('NOT_FOUND', 'Trip not found')`).
* Distinguish: client (4xx) vs server (5xx). Provide stable machine-readable `code` plus human `message`.

## Security & Privacy
* Never log credentials, payment tokens, password hashes, or full PII.
* Hash passwords with argon2 or bcrypt (cost reviewed periodically). No plaintext.
* Protect reservation ownership: a user may read/modify only their own trips/bookings (unless admin role).
* Enforce least privilege on admin tools (future). Audit admin actions.
* Token-like identifiers (session, API keys) require >=128 bits entropy (hex/base64). Index only if queried.
* Strict CORS for public APIs (whitelist origins). Avoid wildcard in production.
* Do NOT inspect `.env*` files here; treat secrets abstractly.

## Payments (Future Considerations)
* All payment provider callbacks must verify signatures.
* Persist idempotency keys to guard against duplicate booking confirmations.
* Never trust client-provided pricing—recompute server-side.

## Performance
* Avoid N+1 by leveraging relations + `select` to narrow fields.
* Paginate large collections (bookings, trip lists). Never load unbounded arrays into a page render.
* Cache heavy, deterministic computations (e.g. currency conversion tables) in-memory with clear invalidation. Do NOT cache user-specific or rapidly mutating DB reads prematurely.
* Prefer streaming (RSC) for long-running composition where feasible.

## Accessibility & UX
* Semantic HTML landmarks; proper heading hierarchy for trip pages.
* All interactive elements keyboard reachable with discernible text / aria-label.
* Provide alt text for property / destination imagery (locale aware). Decorative icons => empty alt.
* Respect user locale & currency preferences (fallback: en / USD).

## Internationalisation (i18n)
* Core locales: `en`, `fr` (initial). Keep user-facing strings centralizable.
* Avoid concatenated sentence fragments; prefer complete phrases for translation quality.
* Date/time formatting via Intl APIs with explicit timezone (user preference or trip region fallback).

## Pricing & Currency (Domain Notes)
* All computations deterministic & pure inside `lib/domain/pricing`.
* Round only at display; keep internal minor-unit integers through pipelines.
* Document any surcharges/taxes fields; never bake them silently into base price.

## Testing Strategy
* Unit: domain logic (pricing, date validation, booking state transitions) in `lib/domain`.
* Integration: route handlers (`/api/bookings`, `/api/trips`) with mocked external suppliers.
* Contract: stable JSON shapes exported via TypeScript types or Zod schemas.
* Aim >80% coverage on booking creation, trip assembly, pricing adjustments.
* Use Jest + Testing Library (for client components needing interaction) when added.

## Prisma Usage Guidelines
* Run `pnpm prisma format` before committing schema changes.
* After schema edit: `pnpm prisma generate` then (if schema must sync) `pnpm prisma db push` (Mongo).
* Always `select` only needed fields; never leak passwordHash or internal provider tokens.
* Use compound `@@unique` only when enforcing real business rules (e.g. one active booking hold per (tripId, supplierRef)). Add a comment explaining rationale.

## Validation
* Prefer Zod for all external input surfaces (HTTP body, query params, server actions forms).
* Fail closed: reject unexpected fields; never silently persist unknown keys.
* Centralize shared schemas (e.g. PriceSchema) to avoid drift.

## Logging & Observability
* Structured logs (object shape) for each mutation: { action, entity, entityId, userId, durationMs, success }.
* Redact PII fields prior to logging.
* Introduce request correlation id (header -> async context) for traceability (future).

## AI Assistant (Copilot) Directives
When generating code:
* Never expose secrets; use placeholders like <SUPPLIER_API_KEY_PLACEHOLDER>.
* Uphold naming & domain modeling guidelines herein.
* Favor small, pure functions; isolate side effects.
* Provide JSDoc on exported domain utilities (parameters, return, error cases).
* Avoid heavy dependencies; prefer platform APIs or lightweight libs.
* Example data must NOT include real card numbers or personally identifying info beyond generic placeholders.

## Style & Cleanliness
* Functions ideally <40 LOC. Extract helpers early.
* Remove unused imports / dead code promptly.
* Keep domain logic pure & deterministic (no date.now() inside pricing logic—inject clock when needed).
* Consistent error codes & type-safe discriminated unions for critical flows.

## Future Enhancements (Do not pre-implement prematurely)
* Supplier integration adapters (GDS / flight APIs, car rental, lodging aggregators).
* Payment provider webhook ingestion & reconciliation service.
* Trip collaboration (shared itineraries, role-based access).
* Offline pricing cache & currency conversion microservice.
* Analytics (search funnels, booking conversions) with anonymization.
* Notification system (email/SMS) with opt-in preferences.

---
These guidelines ensure Wanderlate remains secure, performant, and maintainable as we scale. Keep additions deliberate, minimal, and domain-aligned.
