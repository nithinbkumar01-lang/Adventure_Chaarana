# Adventure Chaarana Firestore backend

Cloud Firestore is the content and operations datastore. The browser talks to the Express API, and the server accesses Firestore through the Firebase Admin SDK. Firebase service-account credentials and the admin token are server-only secrets.

## Document model

| Collection / path | Purpose |
| --- | --- |
| `treks/{trekId}` | Reusable trek marketing content, itinerary, prices, category, and publication state |
| `departures/{departureId}` | Scheduled date, trek reference, pickup options, price snapshot, seat capacity, and status |
| `departures/{departureId}/seatReservations/{bookingCode}` | Held, confirmed, expired, or released seats for one departure |
| `bookings/{bookingCode}` | Customer, participants, totals in paise, and booking/payment state |
| `bookingIdempotency/{sha256}` | Maps a request idempotency-key hash to its booking |
| `homepage/settings` | Homepage metadata and hero copy |
| `homepageSections/{sectionKey}` | Ordered homepage section settings and visibility |
| `communityGallery/{imageId}` | Ordered community gallery images |
| `waitlist/{entryId}` | Public waitlist submissions, restricted by Firestore rules |

Keep itinerary and trek details on the trek. Create one departure document for each scheduled date; do not duplicate the trek content per date. The departure snapshots current pricing so an edit to the trek price will not change an existing departure.

## Seat holds

The booking endpoint uses a Firestore transaction that reads the departure, its reservations, and the idempotency record before writing. It checks the status, future start time, active holds, confirmed seats, selected price, and pickup capacity. A concurrent change to the departure causes Firestore to retry the transaction, preventing overselling. A hold expires after 15 minutes. Expired holds are ignored for availability and marked expired during a later hold request.

Store amounts as integer paise and an ISO currency code. The server computes totals from the departure price. A future payment integration must verify signed provider webhooks and update booking and reservation states through the backend; a browser redirect is not proof of payment.

## Current implementation

The admin API supports dashboard counts, trek create/edit/publish, departure create/status/capacity, and booking inspection. Homepage content is stored and returned publicly, but the admin UI does not yet include a homepage editor. Admin auth is a single configured bearer token, not per-user Firebase Authentication. Payment sessions still return `501` until a provider is selected. See [the backend setup guide](../server/README.md) for local credentials and seeding.
