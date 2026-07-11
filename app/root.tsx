import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

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
    <html lang="en">
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
      
      {/* 1. DYNAMIC LIVE ACTIVITY BAR WITH INTERACTIVE HOVER */}
      <div className="bg-blue-600 text-white text-xs py-2.5 font-bold px-4 shadow-inner overflow-hidden border-b border-blue-700 group/ticker cursor-pointer transition-colors duration-300 hover:bg-blue-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-500 block animate-pulse"></span>
            <span className="tracking-wider uppercase text-[10px] bg-red-800 px-1.5 py-0.5 rounded group-hover/ticker:bg-red-600 transition duration-200">
              Live Dispatches
            </span>
          </div>
          {/* Main Ticker text shifts slightly, gets clearer, and brightens up on container hover */}
          <p className="flex-1 text-center font-medium px-4 text-blue-50 transition-all duration-300 transform group-hover/ticker:text-white group-hover/ticker:scale-[1.01] text-sm tracking-wide">
            Notice: Connected to Regional Coordination Hubs. System updates streaming in real-time.
          </p>
          <span className="text-[10px] opacity-50 hidden sm:inline font-mono group-hover/ticker:opacity-100 transition duration-200">
            Auto-Sync: Active
          </span>
        </div>
      </div>

      {/* 2. RECONSTRUCTED NAVIGATION HEADER */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* 💡 BRAND LOGO ELEMENT (UPGRADED WITH YOUR ASSET INTERACTION) */}
          <a href="/" className="flex items-center gap-3 group/logo">
            <img 
              src={siteLogo} 
              alt="New Dawn Youth Africa Branding Logo" 
              className="h-10 w-auto object-contain transition-transform duration-300 transform group-hover/logo:scale-105"
            />
            <div className="flex flex-col items-start leading-none text-left">
              <span className="font-black text-sm tracking-tight text-blue-600 transition-colors duration-200 group-hover/logo:text-blue-700">
                NEW DAWN
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                Youth Africa
              </span>
            </div>
          </a>

          {/* HOVER DROPDOWN NAVIGATION LINKS CONTAINER */}
          <div className="flex items-center gap-1 sm:gap-4 font-bold text-sm text-gray-600 h-full">
            {navigationLinks.map((link, idx) => (
              <div key={idx} className="relative group h-full flex items-center px-3 py-2">
                
                {/* Main Action Link with Underline Hover Transition */}
                <a 
                  href={link.path} 
                  className="relative py-1 text-gray-600 hover:text-blue-600 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-200 hover:after:w-full"
                >
                  {link.label}
                </a>

                {/* REUSABLE DROPDOWN COMPONENT DRAWER (Triggers cleanly on parent group hover) */}
                <div className="absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 w-52 bg-white border border-gray-200 shadow-xl rounded-xl p-2.5 
                  /* Hidden state classes */
                  opacity-0 scale-95 pointer-events-none 
                  /* Active group-hover animation state transformation rules */
                  group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto 
                  transition-all duration-200 ease-out z-50"
                >
                  {/* Small absolute physical tip caret indicator top element arrow triangle */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 bg-white border-t border-l border-gray-200 rotate-45"></div>
                  
                  <div className="relative bg-white space-y-0.5">
                    <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider px-2.5 py-1 mb-1 border-b border-gray-50">
                      Jump To Section
                    </p>
                    {link.sections.map((sec, secIdx) => (
                      <a
                        key={secIdx}
                        href={sec.hash}
                        className="block px-2.5 py-2 text-xs font-semibold text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 border border-transparent hover:border-blue-100/30 text-left"
                      >
                        📍 {sec.name}
                      </a>
                    ))}
                  </div>
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
              <li><a href="/about" className="hover:text-white transition">Core Pillars</a></li>
              <li><a href="/programs" className="hover:text-white transition">Active Impact Tracks</a></li>
              <li><a href="/contact" className="hover:text-white transition">Get Involved</a></li>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-800 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} New Dawn Youth Africa. All rights reserved.
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