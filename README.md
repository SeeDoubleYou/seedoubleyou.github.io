# seedoubleyou.dev

The front page is a full-screen swarm of glowing ledworks.

- **Settings:** `src/swarm-config.ts` lists every setting with its default
  value, grouped into `ledwork` (magnets), `environment` (box size, glow,
  lighting) and `behavior` (start colours, drift, colour mixing, activity,
  breathing, spin and tap reactions), plus the number of ledworks and the hint
  text at the top. Change what you like; anything you delete uses its default.
- **The swarm itself** is the prebuilt, minified file
  `public/ledwork/ledwork-swarm.min.js`. To update it, rebuild it in the
  ledworkviz project and copy the new file over this one.
- **Build:** `npm install`, then `npm run build`. Vite writes the site to `docs/`,
  which GitHub Pages serves. Commit `docs/` after building.
- **Develop:** `npm run dev`.
