# New Dawn Youth Africa — Web Portal 🌍⚡

A production-grade, highly interactive, and mobile-first web application built for **New Dawn Youth Africa** using the modern **React Router v7 (Remix Core Engine)** framework, **TypeScript**, and **Tailwind CSS**. 

Instead of operating as a traditional flat charity site, this portal is custom-tailored to serve a **B2B/B2G (Business-to-Business / Business-to-Government) Youth Mobilization Agency model**. It functions simultaneously as a professional portfolio to capture corporate/county administration contracts and as a real-time dispatch control dashboard for a grassroots youth network.

---

## 📍 Agency Base of Operations
*   **Headquarters:** Kadzandani Ward, Kisauni Sub-County, Mombasa, Kenya.
*   **Target Demographics:** Multi-county mobilization pathways (Ages 15 – 35 Years).

---

## 🚀 Core Interactive Features Deployed

*   **⚡ Real-Time Live Ticker Dispatch Banner:** Built utilizing React hooks (`useState` + `useEffect`) to autonomously cycle live regional notifications, proving high organizational momentum to visiting contracting stakeholders.
*   **📈 Dynamic Incrementing Network Counters:** An active state counter engine that increments network numbers in real-time, providing immediate visual energy and simulating active live sign-ups.
*   **🏛️ Expandable Competency Cards:** Features hardware-accelerated lifting transition layers (`hover:-translate-y-2`) combined with smooth-opening inline dropdown details trays to break down project scopes, deliverables, and financial tracks.
*   **📊 Active Engagement Deployment Board:** Features full JavaScript `.filter()` array pipelines mapping data types into clean vectors. Integrates an inline active registration simulator that modifies individual card badge states from "Open" to "Profile Dispatched" instantaneously on target selection.
*   **💼 Multi-Channel Controlled Inquiry Portal:** A fully controlled React form state handling complex input structures. Features a dynamic layout switcher morphing placeholder configurations seamlessly based on whether the entity accessing the portal is a corporate client pitching an RFQ briefing or a youth member joining the tracking grid.
*   **🗺️ Architectural Map Telemetry Grid:** Features a responsive layout using custom point grid overlays and exact coordinates (*Lat: -4.0163° S | Lon: 39.6912° E*) optimized for Google Maps or Leaflet.js SDK implementations.
*   **🧭 Scroll-Reveal Animation Engine:** Uses a clean custom component utilizing the browser's native **`IntersectionObserver` API** to slide and fade layout blocks onto the viewport sequentially, keeping the interface fluid and memory-efficient.

---

## 📂 Project Architecture

This project was built using the modern React Router v7 template. It utilizes the modern `/app` directory convention instead of the legacy `/src` folder, structuring routes and assets as standalone modules:

```text
new-dawn-web/
├── app/
│   ├── assets/            # Local high-resolution compressed image assets (.jpeg, .png)
│   ├── components/        # Reusable global layout elements & animation components
│   │   └── ScrollReveal.tsx
│   ├── routes/            # Standalone page views tied straight to the router mapping engine
│   │   ├── about.tsx      # Agency history, operational steps pipeline, core values
│   │   ├── contact.tsx    # Multi-channel form, HQ parameters, architectural canvas
│   │   ├── home.tsx       # Ticker dispatches, incrementing counters, expandable grids
│   │   └── programs.tsx   # Filter tabs, deployment boards, registration simulators
│   ├── app.css            # Central Tailwind directives injection layer
│   ├── root.tsx           # Global document wrapper layout, sticky navbar, regional footer
│   └── routes.ts          # Core router definition and TypeScript satisfaction safety layouts
├── public/                # Static public configuration file elements
├── package.json           # Active dependency scripts tracking blocks
├── tailwind.config.ts     # Global styling design primitives configuration parameters
└── vite.config.ts         # High-speed Vite compilation build pipeline plugin configurations