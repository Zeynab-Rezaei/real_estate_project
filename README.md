# Horizon Properties

A production-quality marketing site for a fictional luxury real estate advisory: editorial
architecture photography, a filterable property portfolio, full property detail pages with
gallery and enquiry flows, and a restrained navy / alabaster / champagne design system.

## Stack

- **React 18 + React Router** — single-page front end
- **Vite** — dev server with HMR (port `5173`, published on host port `3000`)
- **Express** — small API for enquiries and newsletter sign-ups (port `8000`, internal)
- **Plain CSS** with design tokens — no UI framework, no CSS-in-JS runtime

## Run it

```bash
docker compose -f docker-compose.base44.yml up -d --build
# http://localhost:3000
```

The web container proxies `/api` to the API service, so the site is served from a single
origin (no CORS setup, cookies and forms behave normally).

Without Docker:

```bash
npm install
npm run api          # :8000
npm run dev          # :5173, proxies /api to http://localhost:8000
```

## Editing content

| What | Where |
| --- | --- |
| Properties, prices, features, gallery images | `src/data/properties.js` |
| Team / agents | `src/data/team.js` |
| Brand, navigation, services, stats, contact details | `src/data/site.js` |
| Image helper (Unsplash id → responsive srcset) | `src/lib/images.js` |
| Colour, type and spacing tokens | `src/styles/base.css` |

Property records are shaped for a database: stable `slug`, normalised `location`, numeric
`price`, ordered `images`, and an `agentId` reference. Swapping the static module for API
reads only touches `src/lib/properties.js` consumers (pages and cards).

## What works

- Sticky header with transparent → solid transition and an animated mobile menu
- Featured carousel: mouse drag, touch swipe, arrow controls with looping, keyboard arrows
- Portfolio search and filters (location, type, price, beds, baths, sort) with shareable URLs
- Property detail: gallery with lightbox, favourites (localStorage), similar properties
- Contact agent and schedule-a-viewing forms → `POST /api/inquiries`
- Newsletter sign-up → `POST /api/newsletter`
- Responsive from 320px up, reduced-motion support, visible focus states, semantic landmarks

## API

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Liveness |
| GET | `/api/properties` | Full catalogue (`?featured=true` for featured only) |
| GET | `/api/properties/:slug` | One property |
| POST | `/api/inquiries` | Contact / viewing request |
| POST | `/api/newsletter` | Email sign-up |

Submissions are appended to JSON files in `server/storage` (a Docker volume, not committed).
