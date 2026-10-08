# New Dawn Youth Africa — Web Portal 🌍⚡

[![Live Site](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://new-down-youth-africa-web.vercel.app)

A mobile-first web application for **New Dawn Youth Africa**, built with **React Router v8 (framework mode)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

The site serves a **B2B/B2G (Business-to-Business / Business-to-Government) Youth Mobilization Agency** model. It works both as a portfolio aimed at corporate and county clients, and as an informal status board for a grassroots youth network.

---

## 📍 Agency Base of Operations

* **Headquarters:** Kadzandani Ward, Kisauni Sub-County, Mombasa, Kenya.
* **Target Demographics:** Multi-county mobilization pathways (Ages 15 – 35 Years).

---

## 🚀 Features

* **⚡ Live ticker banner** — cycles through regional notifications every 5 seconds using `useState` + `setInterval`.
* **📈 Rolling network counter** — a target value in a ref increments periodically while a `requestAnimationFrame` loop eases the displayed number up to it, so the total visibly rolls rather than jumping.
* **🏛️ Expandable service cards** — click a card to open an inline panel with scope, deliverables, and payment notes. Cards lift and scale on hover.
* **📊 Deployment board with filter tabs** — filters the engagement list by client type via `Array.filter`. Each card has a "Register" button that switches its badge to a registered state for the current session.
* **💼 Contact form with two modes** — a single controlled form whose labels, placeholder, and submit text switch based on whether the visitor is hiring the network or joining as a youth member.
* **🗺️ Headquarters location card** — a static card with a dot-grid background and the coordinates `Lat: -4.0163° S | Lon: 39.6912° E`. **No map library is installed**; the coordinates are displayed as text only.
* **🧭 Scroll reveals** — the shared `ScrollReveal` component uses the native `IntersectionObserver` API to fade blocks in, with an optional `direction` prop (`"up" | "left" | "right" | "none"`).

> All animated figures are **client-side simulations**. There is no backend, database, or API. Form submissions are logged to the console and discarded, and registrations reset on reload.

---

## 📂 Project Architecture

Uses the React Router v8 `app/` directory convention rather than the legacy `src/` folder:

```text
new-dawn-web/
├── app/
│   ├── assets/            # Local images (.jpeg, .png) imported by routes
│   ├── components/
│   │   └── ScrollReveal.tsx   # Shared IntersectionObserver reveal wrapper
│   ├── data/
│   │   └── content.ts         # Static content arrays + TypeScript interfaces
│   ├── routes/
│   │   ├── about.tsx          # Mission, contract pipeline, core values
│   │   ├── contact.tsx        # Two-mode form, HQ details, coordinates
│   │   ├── home.tsx           # Ticker, rolling counter, service cards
│   │   └── programs.tsx       # Filter tabs, deployment cards, registration
│   ├── app.css            # Tailwind entrypoint + @theme design tokens
│   ├── root.tsx           # Document shell, sticky navbar, mobile drawer, footer
│   └── routes.ts          # Route table (config-driven routing)
├── public/                # Static files served at the root (favicon)
├── Dockerfile             # Multi-stage Node 24 Alpine build
├── package.json           # Dependencies and npm scripts
├── react-router.config.ts # SSR configuration
├── tsconfig.json          # TypeScript config (~/* path alias, generated types)
└── vite.config.ts         # Vite plugins (React Router + Tailwind)
```

### Styling

Tailwind v4 is configured **CSS-first** — there is no `tailwind.config.ts`. Design tokens live in a `@theme` block in `app/app.css`:

```css
@theme {
  --color-ndy-primary: #1d4ed8;
  --color-ndy-secondary: #0ea5e9;
  --animate-fade-in: fadeIn 0.5s ease-out forwards;
  @keyframes fadeIn { /* ... */ }
}
```

Each token generates matching utilities (`bg-ndy-primary`, `from-ndy-secondary`, `animate-fade-in`, …).

---

## 🚀 Getting Started

```bash
npm install
npm run dev        # Start the dev server (http://localhost:5173)
npm run build      # Production build
npm start          # Serve the production build
npm run typecheck  # Generate route types, then run tsc
```

`npm run typecheck` runs `react-router typegen` first because the `./+types/*` route type stubs are generated, not committed.

---

## 🧱 Notes

* Server-side rendering is enabled (`ssr: true` in `react-router.config.ts`).
* Routes are defined in `app/routes.ts` using the config-based DSL.
* Navigation uses React Router's `<Link>` for client-side transitions.
* Static content lives in `app/data/content.ts` rather than inline in components.
* There is no lint or test script configured.