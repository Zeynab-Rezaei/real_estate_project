# Horizon Properties — engineering notes

Non-obvious details that are not in the README or manifests.

## Runtime shape

- Two compose services: `web` (Vite dev server, host port **3000**) and `api` (Express, internal
  port 8000). The front end calls `/api/...` on its own origin; `vite.config.js` proxies that to
  `http://api:8000` inside compose (override with `API_PROXY_TARGET`).
- Both services run `node:22-alpine` from the **bind-mounted source**, install dependencies on
  container start (`npm install`, lockfile committed), and run a live-reload command
  (`vite` / `node server/index.js`). There is no build step in compose, so source edits appear
  without rebuilding images.
- `node_modules` for each service lives in a named volume (`web_node_modules`,
  `api_node_modules`) so host and container dependencies never mix. Do not delete the
  `api_storage` volume — it holds submitted enquiries/subscribers.
- API storage is `server/storage/*.json` (gitignored, named volume). No database is required.

## Sandbox / preview specifics

- `vite.config.js` appends the sandbox hostname to Vite's `allowedHosts` **only when
  `BASE44_PREVIEW_MODE === "1"`**, using the `BASE44_SANDBOX_HOST_DOMAIN` value passed into the
  `web` service. Unset (any other value) keeps the default localhost-only behaviour.
- Vite binds `0.0.0.0:5173`; compose publishes it on host 3000.
- Healthchecks use `node -e fetch(...)` against `/` and `/api/health` — no app code added for
  health.

## Verifying

```bash
curl -s http://localhost:3000/ | head -5      # Vite HTML, not a prebuilt bundle
curl -s http://localhost:3000/api/health      # {"ok":true}
npm run build                                  # production build sanity check
```

- There is no automated test suite; `npm run build` and the live preview checks are the
  verification path.
- Forms write real records. If you submit test data, remove it from
  `server/storage/inquiries.json` / `subscribers.json` afterwards.
- Images are hot-linked from Unsplash by photo id (`src/data/*.js`). Cards use responsive
  `srcset`; the hero is eager + high priority, everything below the fold is lazy.

## Conventions

- Design tokens only (`src/styles/base.css`); component styles live in `home.css`,
  `properties.css`, `layout.css`, `pages.css`. Champagne (`--champagne`) is reserved for
  labels, hairlines, icons and active states.
- All interactive controls are real `<button>`/`<a>`/`<Link>` elements with visible focus
  states; overlays close on Escape and restore focus.
- Property data is a single source of truth imported by both the front end and the API.
