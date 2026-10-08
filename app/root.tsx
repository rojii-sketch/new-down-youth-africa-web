import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useState } from "react";

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
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
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

  // Array defining the navigation structure and individual page section offsets
  const navigationLinks = [
    {
      label: "Home",
      path: "/",
      sections: [
        { name: "Hero Track", hash: "/#hero" },
        { name: "Live Counter Summary", hash: "/#metrics" },
        { name: "Core Competencies", hash: "/#services" }
      ]
    },
    {
      label: "About Us",
      path: "/about",
      sections: [
        { name: "Our Core Mission", hash: "/about#who-we-are" },
        { name: "Operational Pipeline", hash: "/about#pipeline" },
        { name: "Professional Values", hash: "/about#values" }
      ]
    },
    {
      label: "Programs",
      path: "/programs",
      sections: [
        { name: "Deployment Board", hash: "/programs#board" },
        { name: "Focus Framework", hash: "/programs#focus" }
      ]
    },
    {
      label: "Contact",
      path: "/contact",
      sections: [
        { name: "Inquiry Pipeline Form", hash: "/contact#form" },
        { name: "Kisauni HQ Location", hash: "/contact#hq" }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* NAVIGATION HEADER (Now sits neatly at the very top) */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
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
          <div className="hidden md:flex items-center gap-4 font-bold text-sm text-gray-600 h-full">
            {navigationLinks.map((link, idx) => (
              <div key={idx} className="relative group h-full flex items-center px-3 py-2">
                
                <Link 
                  to={link.path} 
                  className="relative py-1 text-gray-600 hover:text-blue-600 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-200 hover:after:w-full"
                >
                  {link.label}
                </Link>

                {/* DROPDOWN CONTAINER FOR DESKTOP MONITORS */}
                <div className="absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 w-52 bg-white border border-gray-200 shadow-xl rounded-xl p-2.5 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 ease-out z-50">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 bg-white border-t border-l border-gray-200 rotate-45"></div>
                  <div className="relative bg-white space-y-0.5">
                    <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider px-2.5 py-1 mb-1 border-b border-gray-50 text-left">
                      Jump To Section
                    </p>
                    {link.sections.map((sec, secIdx) => (
                      <Link
                        key={secIdx}
                        to={sec.hash}
                        className="block px-2.5 py-2 text-xs font-semibold text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 border border-transparent hover:border-blue-100/30 text-left"
                      >
                        📍 {sec.name}
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all duration-150 active:scale-90"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>

        </div>

        {/* MOBILE SLIDE-DOWN DRAWER MENUS */}
        <div 
          className={`md:hidden bg-white border-b border-gray-200 overflow-hidden transition-all duration-300 ease-in-out shadow-xl relative z-40 ${
            isMobileMenuOpen ? "max-h-[500px] opacity-100 border-t border-gray-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-4 py-3 space-y-3 font-bold text-sm text-left">
            {navigationLinks.map((link, idx) => (
              <div key={idx} className="border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                
                <Link 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-900 hover:text-blue-600 px-2 py-1.5 rounded-lg hover:bg-blue-50/50 text-base font-black transition"
                >
                  {link.label}
                </Link>
                
                <div className="pl-4 mt-1 grid grid-cols-2 gap-1 bg-gray-50/60 p-2 rounded-xl border border-gray-100">
                  {link.sections.map((sec, secIdx) => (
<Link
                        key={secIdx}
                        to={sec.hash}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[11px] font-bold text-gray-500 hover:text-blue-600 py-1 transition flex items-center gap-1"
                      >
                        • {sec.name}
                      </Link>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Dynamic Page Views Container */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Structural Regional Footer */}
      <footer className="bg-gray-900 text-gray-400 border-t border-gray-800 text-sm mt-auto">
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
              <li><Link to="/about" className="hover:text-white transition">Core Pillars</Link></li>
              <li><Link to="/programs" className="hover:text-white transition">Active Impact Tracks</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Get Involved</Link></li>
            </ul>
          </div>
          <div className="text-left">
            <h3 className="text-white font-bold text-base mb-3">Headquarters</h3>
            <p className="leading-relaxed text-xs">
              Kadzandani Ward, Kisauni Sub-County<br />
              Mombasa, Kenya
            </p>
            <p className="mt-2 font-medium text-blue-400 text-xs">kahindirodgers77@gmail.com</p>
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