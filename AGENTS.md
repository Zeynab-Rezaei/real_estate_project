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

## Hero scroll video

- `public/video/hero-desktop.mp4`, `hero-mobile.mp4` and `hero-desktop.webm` are **seek-optimised
  re-encodes**, not delivery encodes: H.264/VP9, keyframe every 4 frames
  (`-g 4 -keyint_min 4 -sc_threshold 0`), CRF 20/24, `+faststart`, no audio. The supplied source
  clip carried a single keyframe, so every seek decoded from frame 0 and scrubbing stuttered. Any
  replacement clip must keep a GOP of 4–8, stay at or below 720p, and have no audio track.
- `src/hooks/useHeroScrollVideo.js` owns the interaction: it fetches the clip into a blob (instant
  random access, no range-request waits), then maps scroll progress through the `.hero` track
  (320vh desktop / 300vh mobile, stage sticky at 100vh) onto `video.currentTime` inside a single
  rAF loop that eases toward the scroll position. The clip is never played or looped — it is only
  seeked. Hero copy fades over the first 30% of the track.
- The hook toggles `html[data-hero-pinned]`; `home.css` uses it to keep the fixed header
  transparent while the stage is pinned and let it turn solid when it unpins.
- `hero-poster.jpg` (first frame) is the preload/loading layer, the reduced-motion static hero and
  the last-resort fallback; `site.heroImage` (Unsplash) is the fallback if the video errors.
- Reduced motion and `navigator.connection.saveData` render the static hero instead of the scrub.

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
