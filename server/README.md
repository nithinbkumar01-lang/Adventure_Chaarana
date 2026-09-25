# Adventure Chaarana backend

Express serves the website API and Vite during local development. The server uses Firebase Admin SDK for privileged Firestore access and verifies Firebase Authentication ID tokens for admin access. The service-account credentials stay on the server.

## Configure Firebase locally

1. Open the Firebase project `adventurechaaranawaitlist` and make sure Cloud Firestore is enabled.
2. In Firebase Console → Project settings → Service accounts, generate a private key for the server. Save the downloaded JSON as `serviceAccountKey.json` in the project root. This key grants privileged access: keep it private, do not paste it into chat, and do not commit it. The file is ignored by Git.
3. Set `GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json` in `.env`. The provided local `.env` already points there. Set `FIREBASE_PROJECT_ID` and `ADMIN_EMAILS` to the verified Firebase Authentication email address or comma-separated addresses allowed to use `/admin`.
4. Deploy the repository's deny-by-default rules and composite indexes (sign in with the Firebase account that owns the project):

   ```powershell
   npx firebase-tools login
   npx firebase-tools deploy --only firestore:rules,firestore:indexes
   ```

5. Import the existing trek catalog, community gallery, and homepage sections into Firestore:

   ```powershell
   npm run firestore:seed
   ```

6. Create the admin account in Firebase Authentication (or sign up from `/auth` and verify its email), run the app with `npm run dev`, then sign in at `http://localhost:3000/admin` with that account's email and password.

## Production deployment (Vercel + Firebase)

The Vercel build serves the Vite frontend from `dist` and routes `/api/*` to the shared Express API in `api/[...path].ts`. Do not deploy the local `serviceAccountKey.json`; Vercel must use environment variables.

1. With the existing GitHub-connected Vercel project, confirm its Root Directory is this repository root. The checked-in `vercel.json` selects Vite, runs `npm run build`, publishes `dist`, and keeps client-side routes on `index.html`; a push to the connected branch will trigger deployment.
2. In Vercel Project Settings → Environment Variables, add these to **Production**:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_SERVICE_ACCOUNT_JSON` — the full service-account JSON, marked sensitive
   - `ADMIN_EMAILS` — comma-separated Firebase Auth email addresses allowed to access the admin panel
3. In Firebase Console → Authentication → Sign-in method, enable Email/Password, Phone, and Google. Add the Vercel production domain under Authorized domains. Configure the Phone SMS region policy before allowing real SMS.
4. Confirm Firestore rules and indexes are deployed. Seed the catalog only if this Firebase project is empty; `npm run firestore:seed` is an initial import and can replace content values with the bundled defaults.
5. After deployment, check `/api/v1/health` reports `{"status":"ok","firestore":"connected","database":"connected"}`, then verify `/`, `/auth`, `/admin`, and `/api/treks` on the preview deployment before promoting it.

The browser Firebase values are public configuration. Restrict the corresponding API key to the production domain in Google Cloud API key settings. Keep the service-account JSON server-only. If Preview deployments are needed, use a separate staging Firebase project and service-account JSON; add the preview domain to that project's Authorized domains. Do not point Preview admin pages at production Firestore. No `CORS_ORIGINS` setting is required because the browser calls the API on the same origin.

Online payment capture is not implemented yet; the payment-session endpoint currently returns `501`. Do not accept paid bookings until a payment provider and webhook reconciliation are configured.

On Google Cloud, use the service's attached runtime identity instead of downloading a key file. For other cloud hosts, set `FIREBASE_SERVICE_ACCOUNT_JSON` as a protected secret rather than adding a JSON key to the deployment. For local development, the service-account file is the simplest setup. If Firestore is not configured yet, the public website uses the existing TypeScript content fallback; admin and booking endpoints return `FIRESTORE_NOT_CONFIGURED`.

## Firestore collections

- `treks/{trekId}` stores the marketing content and publication state for one reusable trek.
- `departures/{departureId}` stores a scheduled trip, capacity, pickup options, and price snapshots.
- `departures/{departureId}/seatReservations/{bookingCode}` stores seat holds and confirmed reservations.
- `bookings/{bookingCode}` stores customer and participant details and the payment state.
- `bookingIdempotency/{sha256}` deduplicates repeated booking requests without storing the caller's raw key.
- `homepage/settings`, `homepageSections/{sectionKey}`, and `communityGallery/{imageId}` store homepage content.
- `waitlist/{entryId}` remains restricted to validated public submissions.

Firestore transactions serialize concurrent seat holds against the departure document, preventing two requests from booking the same remaining seats. Expired holds are excluded when availability is calculated and marked expired when the next hold is placed.

Firestore rules default to deny. The API uses the Admin SDK, which bypasses client rules; protect the server credential and keep `ADMIN_EMAILS` limited to trusted administrators. Admin passwords are managed by Firebase Authentication, and the API accepts only verified Firebase ID tokens for allowlisted emails. Payment sessions/webhooks and a visual homepage editor are not implemented yet.

## API endpoints

- `GET /api/treks`, `GET /api/treks/:slug`, and `GET /api/community-images` serve content.
- `GET /api/v1/homepage` returns homepage settings, sections, and trek slots.
- `GET /api/v1/treks/:slug/departures` returns departures with active seat availability.
- `GET /api/v1/departures/:id` returns public departure details.
- `POST /api/v1/booking-holds` atomically places a 15-minute seat hold; requests must include an idempotency key.
- `POST /api/v1/bookings/:bookingCode/payment-session` returns `501` until a payment provider is configured.
- Admin APIs are under `/api/v1/admin` and require `Authorization: Bearer <Firebase ID token>` from a verified email listed in `ADMIN_EMAILS`.
- `GET /api/v1/health` reports Firestore configuration and connectivity.

## Firebase Authentication

The public account page is `/auth`. In Firebase Console → Authentication → Sign-in method, enable **Email/Password**, **Phone**, and **Google**. Add the production website domain under Authorized domains. Email signup sends a verification email; password reset uses Firebase's reset email. Phone sign-in uses SMS codes and reCAPTCHA, and first-time phone verification creates the Firebase Auth account.

Firebase does not allow phone-auth requests from `localhost` as an authorized hosted domain. Use Firebase's configured test phone numbers during local UI development, or test real SMS from an authorized deployed domain. Add user-facing consent for Google's phone-number processing and SMS charges before production use.

Seed only for the initial import or deliberate content reset. It updates the documents for the current 22 treks, 12 community images, and six homepage sections.
