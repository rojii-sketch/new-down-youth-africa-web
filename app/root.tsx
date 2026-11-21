import {
  isRouteErrorResponse,
  Link,
  NavLink,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { ArrowRight, CalendarDays, House, Info, Mail, MapPin, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Route } from "./+types/root";
import siteLogo from "./assets/logo.png";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// --- GLOBAL SITE LAYOUT INTEGRATION ---
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const drawerRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => drawerRef.current?.close();

  const openMenu = () => {
    const drawer = drawerRef.current;
    if (!drawer || drawer.open) return;
    drawer.showModal();
    setIsMobileMenuOpen(true);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const desktop = window.matchMedia("(min-width: 48rem)");
    const closeAtDesktop = () => {
      if (desktop.matches) drawerRef.current?.close();
    };
    desktop.addEventListener("change", closeAtDesktop);
    return () => desktop.removeEventListener("change", closeAtDesktop);
  }, [isMobileMenuOpen]);

  // Array defining the navigation structure and individual page section offsets
  const navigationLinks = [
    {
      label: "Home",
      icon: House,
      path: "/",
      sections: [
        { name: "Overview", hash: "/#hero" },
        { name: "Who we work with", hash: "/#metrics" },
        { name: "Our services", hash: "/#services" }
      ]
    },
    {
      label: "About",
      icon: Info,
      path: "/about",
      sections: [
        { name: "Who we are", hash: "/about#who-we-are" },
        { name: "How it works", hash: "/about#pipeline" },
        { name: "Our values", hash: "/about#values" }
      ]
    },
    {
      label: "Programs",
      icon: CalendarDays,
      path: "/programs",
      sections: [
        { name: "Browse programs", hash: "/programs#board" },
        { name: "Programs overview", hash: "/programs#focus" }
      ]
    },
    {
      label: "Contact",
      icon: Mail,
      path: "/contact",
      sections: [
        { name: "Inquiry form", hash: "/contact#form" },
        { name: "Headquarters", hash: "/contact#hq" }
      ]
    }
  ];

  return (
    <div className="site-shell flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* NAVIGATION HEADER (Now sits neatly at the very top) */}
      <nav aria-label="Main navigation" className="site-nav sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Identity Branding Logo Block */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group/logo shrink-0">
            <img 
              src={siteLogo} 
              alt="New Dawn Youth Africa Branding Logo" 
              className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 transform group-hover/logo:scale-105"
            />
            <div className="flex flex-col items-start leading-none text-left">
              <span className="font-black text-xs sm:text-sm tracking-tight text-blue-600 transition-colors duration-200 group-hover/logo:text-blue-700">
                NEW DAWN
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                Youth Africa
              </span>
            </div>
          </Link>

          {/* DESKTOP ONLY LINKS */}
          <div className="desktop-nav hidden md:flex items-center gap-4 font-bold text-sm text-gray-600 h-full">
            {navigationLinks.map((link, idx) => (
              <div key={idx} className="relative group h-full flex items-center px-3 py-2">
                
                <NavLink end
                  to={link.path} 
                  className="nav-link"
                >
                  <link.icon size={16} aria-hidden="true" /> {link.label}
                </NavLink>

                {/* DROPDOWN CONTAINER FOR DESKTOP MONITORS */}
                <div className="nav-dropdown absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 w-52 bg-white border border-gray-200 shadow-xl rounded-xl p-2.5 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:pointer-events-auto transition-all duration-200 ease-out z-50">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 bg-white border-t border-l border-gray-200 rotate-45"></div>
                  <div className="relative bg-white space-y-0.5">
                    <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider px-2.5 py-1 mb-1 border-b border-gray-50 text-left">
                      Jump To Section
                    </p>
                    {link.sections.map((sec, secIdx) => (
                      <Link
                        key={secIdx}
                        to={sec.hash}
                        className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 border border-transparent hover:border-blue-100/30 text-left"
                      >
                        <ArrowRight size={13} aria-hidden="true" /> {sec.name}
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* MOBILE INTERACTIVE TOGGLE BUTTON */}
          <button
            type="button"
            ref={menuButtonRef}
            onClick={openMenu}
            aria-haspopup="dialog"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center justify-center p-3 min-h-[44px] min-w-[44px] rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all duration-150 active:scale-90"
          >
            <Menu aria-hidden="true" />
          </button>

        </div>
      </nav>

      <noscript>
        <nav aria-label="Mobile navigation" className="flex flex-wrap gap-4 p-4 md:hidden">
          {navigationLinks.map((link) => <Link key={link.path} to={link.path}>{link.label}</Link>)}
        </nav>
      </noscript>

      <dialog
        ref={drawerRef}
        id="mobile-menu"
        aria-labelledby="mobile-menu-title"
        className="mobile-drawer"
        onClose={() => {
          setIsMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="mobile-drawer-panel">
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
            <span id="mobile-menu-title" className="font-extrabold text-base text-blue-700">Explore New Dawn</span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation menu"
              autoFocus
              className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all duration-150 active:scale-90"
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile pages" className="px-4 py-4 space-y-3 font-bold text-sm text-left">
            {navigationLinks.map((link, idx) => (
              <div key={idx} className="border-b border-gray-50 pb-2 last:border-0 last:pb-0">

                <NavLink end
                  to={link.path}
                  onClick={closeMenu}
                  className="flex items-center gap-2 text-gray-900 hover:text-blue-600 px-2 py-1.5 rounded-lg hover:bg-blue-50/50 text-base font-black transition"
                >
                  <link.icon size={17} aria-hidden="true" /> {link.label}
                </NavLink>

                <div className="pl-4 mt-1 grid grid-cols-2 gap-1 bg-gray-50/60 p-2 rounded-xl border border-gray-100">
                  {link.sections.map((sec, secIdx) => (
                    <Link
                      key={secIdx}
                      to={sec.hash}
                      onClick={closeMenu}
                      className="text-[11px] font-bold text-gray-500 hover:text-blue-600 py-1 transition flex items-center gap-1"
                    >
                      • {sec.name}
                    </Link>
                  ))}
                </div>

              </div>
            ))}
          </nav>
        </div>
      </dialog>

      {/* Dynamic Page Views Container */}
      <main id="main-content" tabIndex={-1} className="flex-grow">
        <Outlet />
      </main>

      {/* Structural Regional Footer */}
      <footer className="site-footer bg-gray-900 text-gray-400 border-t border-gray-800 text-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-left">
            <h3 className="text-white font-bold text-base mb-3">New Dawn Youth Africa</h3>
            <p className="leading-relaxed text-gray-400 text-xs">
              Empowering youth across Kenyan counties and the African continent through sustainable leadership, resource sharing, and capacity building.
            </p>
          </div>
          <div className="text-left">
            <h3 className="text-white font-bold text-base mb-3">Quick Navigation</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-white transition">About us</Link></li>
              <li><Link to="/programs" className="hover:text-white transition">Programs</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div className="text-left">
            <h3 className="text-white font-bold text-base mb-3">Headquarters</h3>
            <p className="leading-relaxed text-sm flex gap-2">
              <MapPin size={17} className="shrink-0 text-blue-400" aria-hidden="true" />
              <span>Kadzandani Ward, Kisauni Sub-County<br />
              Mombasa, Kenya</span>
            </p>
            <a href="mailto:kahindirodgers77@gmail.com" className="mt-3 inline-flex items-center gap-2 font-medium text-blue-400 text-sm"><Mail size={16} aria-hidden="true" /> kahindirodgers77@gmail.com</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-800 text-center text-xs text-gray-500"><span suppressHydrationWarning>
          &copy; {new Date().getFullYear()} New Dawn Youth Africa. All rights reserved.
          </span >
        </div>
      </footer>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto text-left">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}