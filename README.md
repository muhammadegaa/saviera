# Saviera

Local recreation of the public Saviera slow-fashion site. Photography and the SA monogram come from saviera.co, converted to WebP under `public/img/` (`-800` and, for large originals, `-1600` widths). Body type uses Outfit as a stand-in for the commercial Trap face. The UI name stays **Saviera**.

Orders stay on WhatsApp and Shopee. Nothing here calls the production database.

## Install and run

```bash
npm install
npm run dev
```

Open http://localhost:5173

```bash
npm run build
npm run preview
```

`dev` and `preview` both serve the content API. A static `dist/` folder does not include it.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about-us` | About |
| `/01-archetypes` | Vol 01 Archetypes |
| `/01-omnia` | Omnia |
| `/01-wei-yi` | Wei Yi |
| `/01-cyanne` | Cyanne |
| `/sav-to-wear-01` | Especially For You |
| `/healr` | Healr |
| `/savdashboard` | Content dashboard |

## Dashboard auth

Password gate, then edits for the homepage and about page. Writes go to `server/content.json` through Vite middleware (`GET/PUT /api/content`, `POST /api/login`).

Default password: `saviera-demo`

Override with `DASHBOARD_PASSWORD` when you start Vite. The browser stores a local session token after login.
