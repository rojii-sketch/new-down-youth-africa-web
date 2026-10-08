New Dawn Web - Modernization & Governance Plan
Phase 1: Architectural Foundation & Cleanup
[x] Enable True SPA Navigation: Replace all raw <a href> tags with React Router's <Link> component.

[x] Component Extraction: Create app/components/ and extract ScrollReveal into app/components/ScrollReveal.tsx.

[x] Dead Code Pruning: Delete the unused app/welcome/ directory and unreferenced image assets.

[x] Data Separation: Move hardcoded arrays into a dedicated app/data/content.ts file.

Phase 2: Design System & UI Beautification
[x] Tailwind v4 Theme Configuration: Define design tokens in app.css and fix animate-fadeIn.

[x] Modern Interface Elements: Add drop-shadows, glassmorphism to nav, rounded corners, and gradient accents.

[x] Interactive Micro-animations: Add directional reveals and hover transform scaling.

Phase 3: Responsive Refactoring & Accessibility
[x] Mobile Menu Overhaul: Replace max-height toggle with a slide-out drawer and add aria-expanded.

[x] Fluid Layouts: Refactor hero, metrics band, and service cards using CSS Grid with minmax.

[x] Form Polish: Add focus rings and touch targets (44px min). (Static labels retained for accessibility).

[x] Accessible Interactions: Ensure keyboard navigation and screen-reader friendliness.

Phase 4: Route Enhancements
[x] SEO & Meta Tags: Add route-level meta exports to all four routes.

[x] Ticker Animation Upgrade: Smooth out the live ticker bar on the home route.

[x] Program Filtering UI: Upgrade the filter tab bar on the programs.tsx route with smooth indicators.