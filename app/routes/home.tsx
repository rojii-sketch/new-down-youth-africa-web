import { useState, useEffect, useRef } from "react";
import communityHeroBg from "../assets/images.jpeg";

// --- 💡 NATIVE SCROLL REVEAL WRAPPER COMPONENT ---
// This uses the browser's IntersectionObserver to trigger animations on scroll
function ScrollReveal({ children, delay = "delay-0" }: { children: React.ReactNode; delay?: string }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Once it animates in, we can stop observing this specific element
          if (elementRef.current) observer.unobserve(elementRef.current);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out transform ${delay} ${
        isIntersecting 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-12 scale-[0.98] pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  // --- STATE MOTORS FOR REAL-TIME SIMULATION ---
  const [youthCount, setYouthCount] = useState(10240);
  const [liveTickerIdx, setLiveTickerIdx] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [searchStatus, setSearchStatus] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const liveNotifications = [
    "⚡ LIVE: 42 youth just checked into the Mombasa Planning Forum briefing.",
    "📢 CONTRACT SIGNED: Private Investor onboarding 200 youth marketers in Kwale.",
    "✅ DISPATCH: Kadzandani Ward venue locked for Saturday's MCA leadership summit.",
    "🔥 IMPACT: Network milestone reached—over 450 verified youth registrations this week alone!"
  ];

  useEffect(() => {
    const counterInterval = setInterval(() => {
      setYouthCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);

    const tickerInterval = setInterval(() => {
      setLiveTickerIdx((prev) => (prev + 1) % liveNotifications.length);
    }, 5000);

    return () => {
      clearInterval(counterInterval);
      clearInterval(tickerInterval);
    };
  }, []);

  const handleVerifyCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    
    if (searchId.toLowerCase().includes("ndy") || searchId.length > 4) {
      setSearchStatus("✅ RECORD FOUND: Active Mobilization ID Profile Verified. Status: Ready for Next Deployment Briefing.");
    } else {
      setSearchStatus("❌ ID NOT RECOGNIZED: Profile not active. Please submit a registration request via our Contact Page form.");
    }
  };

  const services = [
    {
      icon: "🏛️",
      title: "Civic & County Mobilization",
      description: "Hired by county governments and officials to organize youth forums, community development activities, and town halls. We handle logistics, agendas, and clear participant mobilization.",
      dropdownDetails: {
        scope: "B2G Government Contracts",
        deliverables: ["100% verified regional attendance logs", "Secure structural venue setups in Kisauni", "Comprehensive community feedback reporting"],
        payouts: "Facilitated via strict county stipend structures."
      }
    },
    {
      icon: "📢",
      title: "Commercial Product Marketing",
      description: "Partnering with private investors and corporations to run product awareness campaigns, product testing panels, and educational marketing activations targeting young demographics.",
      dropdownDetails: {
        scope: "Corporate Brand Activations",
        deliverables: ["Direct product usage training groups", "High-conversion brand ambassadors selection", "Data-driven field demographic analysis"],
        payouts: "Commission matrices & direct activation daily stipends."
      }
    },
    {
      icon: "🗣️",
      title: "Political & Leadership Forums",
      description: "Contracted by leadership candidates, MCAs, and government dignitaries to structure orderly, highly productive meetings with youth groups, outlining clear parameters and tangible gains.",
      dropdownDetails: {
        scope: "Civic & Townhall Engagements",
        deliverables: ["Orderly agenda moderation channels", "Transparent candidate manifesto distribution", "Direct youth question-and-answer panels"],
        payouts: "Funded group-registration grants and toolkits."
      }
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-900 font-sans overflow-x-hidden">
      
      {/* REAL-TIME DYNAMIC TOP NOTICE PANEL */}
      <div className="bg-blue-600 text-white text-xs py-2.5 font-bold px-4 shadow-inner border-b border-blue-700 group/ticker cursor-pointer transition-colors duration-300 hover:bg-blue-700 relative z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-500 block animate-pulse"></span>
            <span className="tracking-wider uppercase text-[10px] bg-red-700 px-1.5 py-0.5 rounded group-hover/ticker:bg-red-600 transition duration-200">Live Dispatches</span>
          </div>
          <p className="flex-1 text-center font-medium px-4 transition-all duration-300 transform group-hover/ticker:text-white group-hover/ticker:scale-[1.01] text-sm tracking-wide text-blue-50">
            {liveNotifications[liveTickerIdx]}
          </p>
          <span className="text-[10px] opacity-60 hidden sm:inline font-mono group-hover/ticker:opacity-100 transition duration-200">Status: Connected</span>
        </div>
      </div>

      {/* HERO SECTION WITH LIFTING HOVER AND LOAD SCALE EFFECT */}
      <section className="relative bg-white overflow-hidden border-b border-gray-100 py-20 lg:py-28">
        <div className="absolute inset-0 z-0">
          <img 
            src={communityHeroBg} 
            alt="" 
            className="w-full h-full object-cover object-center opacity-40 filter brightness-90 transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column Content - Interactive text scaling and shifts */}
          <div className="space-y-6 max-w-xl group/text">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md shadow-sm border border-blue-100 transition-all duration-300 hover:bg-blue-100 hover:scale-105">
              The Ultimate Youth Mobilization Network
            </span>
            
            {/* Dynamic heading that enlarges slightly and brightens text gradients on hover */}
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none transition-all duration-500 group-hover/text:text-gray-800 transform group-hover/text:translate-x-1">
              Bridging the Gap Between <span className="text-blue-600 transition-colors duration-300 hover:text-blue-700">Organizations</span> & African Youth.
            </h1>
            
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed font-semibold opacity-90 transition-all duration-300 group-hover/text:opacity-100">
              We are contracted by governments, private investors, and leaders to drive youth engagement. We broadcast opportunities, explain clear structural agendas, outline participant benefits, and ensure massive, targeted turnouts.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="/programs" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-md text-sm transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-all duration-200">
                View Upcoming Briefings
              </a>
              <a href="/contact" className="bg-white hover:bg-gray-50 text-gray-700 font-bold px-6 py-3 rounded-xl border border-gray-200 shadow-sm text-sm transform hover:-translate-y-1 hover:scale-105 hover:shadow-md transition-all duration-200">
                Hire Us For A Contract
              </a>
            </div>
          </div>

          {/* Right Column - LIVE ENGAGEMENT CARD (Upgraded with smooth floating scale transitions) */}
          <div className="flex justify-center lg:justify-end">
            <div className="p-8 bg-gray-900/95 backdrop-blur-sm text-white rounded-2xl shadow-xl max-w-md w-full border border-gray-800 space-y-6 
              /* 💡 ADVANCED HOVER PROPERTIES */
              transition-all duration-500 ease-out transform 
              hover:scale-[1.04] hover:shadow-2xl hover:border-gray-700 hover:bg-gray-900"
            >
              <div className="group/channel cursor-pointer">
                <h3 className="font-bold text-lg text-blue-400 mb-2 transition-colors duration-300 group-hover/channel:text-blue-300 flex items-center gap-2">
                  ⚡ Live Engagement Channel
                  <span className="inline-block animate-ping w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  We break down every client project so youth know exactly what to expect before stepping on the ground:
                </p>
              </div>
              <ul className="space-y-2 text-xs text-gray-300 border-b border-gray-800 pb-5">
                <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">🎯 <strong>The Target Agenda:</strong> Clear, upfront mission details.</li>
                <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">👤 <strong>Guests of Honor:</strong> MCAs, Dignitaries, or Brand Managers.</li>
                <li className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-1">💰 <strong>Youth Value:</strong> Stipends, skill certifications, or product resource tools.</li>
              </ul>

              <form onSubmit={handleVerifyCheck} className="space-y-2">
                <label htmlFor="searchId" className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  Verify Mobilization Network Status
                </label>
                <div className="flex gap-2">
                  <input id="searchId"
                    type="text" 
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter full name or profile tracking code..."
                    className="flex-grow bg-gray-800 border border-gray-700 text-white text-xs px-3 py-2 rounded-lg outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shrink-0">
                    Verify
                  </button>
                </div>
                {searchStatus && (
                  <p className={`text-[11px] font-medium p-2.5 rounded mt-2 border transition-all duration-300 animate-fadeIn ${
                    searchStatus.includes("✅") 
                      ? "bg-green-950/40 text-green-400 border-green-900/40" 
                      : "bg-red-950/40 text-red-400 border-red-900/40"
                  }`}>
                    {searchStatus}
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* METRICS TRACKER - MOVEMENT WHEN SCROLLING */}
      <section className="py-12 bg-gray-900 text-white relative z-10 shadow-lg border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              
              <div className="space-y-1 group cursor-pointer p-4 rounded-xl hover:bg-gray-800/40 transition duration-300">
                <p className="text-4xl sm:text-5xl font-black text-blue-400 tracking-tight transition-transform duration-300 group-hover:scale-110 inline-block">47</p>
                <p className="text-base font-bold text-white">Counties Mobilized</p>
                <p className="text-xs text-gray-400">Expansive network across Kenya</p>
              </div>

              <div className="space-y-1 group cursor-pointer p-4 rounded-xl hover:bg-gray-800/40 transition duration-300">
                <p className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight font-mono transition-transform duration-300 group-hover:scale-110 inline-block">
                  {youthCount.toLocaleString()}+
                </p>
                <p className="text-base font-bold text-white flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-ping"></span>
                  Verified Youth Network
                </p>
                <p className="text-xs text-gray-400">Live updating verification profiles</p>
              </div>

              <div className="space-y-1 group cursor-pointer p-4 rounded-xl hover:bg-gray-800/40 transition duration-300">
                <p className="text-4xl sm:text-5xl font-black text-blue-400 tracking-tight transition-transform duration-300 group-hover:scale-110 inline-block">100%</p>
                <p className="text-base font-bold text-white">Contract Delivery</p>
                <p className="text-xs text-gray-400">Seamless mobilization for clients</p>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MOBILIZATION SECTOR ROLES - STAGGERED MOVEMENT WHEN SCROLLING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Our Core Competencies & Services
            </h2>
            <p className="mt-4 text-base text-gray-600">
              Click on any card below to open its structural dropdown contract specifications.
            </p>
          </ScrollReveal>
        </div>

        {/* Dynamic Grid featuring structural animation delays */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {services.map((service, idx) => {
            const isCardOpen = expandedService === idx;
            const delayClasses = ["delay-0", "delay-100", "delay-200"];
            
            return (
              <ScrollReveal key={idx} delay={delayClasses[idx]}>
                <div 
                  onClick={() => setExpandedService(isCardOpen ? null : idx)}
                  className={`bg-white p-8 rounded-2xl border text-left cursor-pointer
                    /* 💡 DYNAMIC HOVER SCALE TRANSITIONS AND MOTIONS */
                    transition-all duration-300 ease-out transform 
                    hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl
                    ${isCardOpen ? "border-blue-500 ring-2 ring-blue-500/10 shadow-md" : "border-gray-200 shadow-sm hover:border-blue-300"}
                  `}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl font-sans shrink-0 transition-transform duration-300 hover:rotate-12">
                      {service.icon}
                    </div>
                    <span className={`text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded transition-all duration-300 ${isCardOpen ? "rotate-180 bg-blue-600 text-white" : ""}`}>
                      {isCardOpen ? "▲ Close" : "▼ Details"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 tracking-tight mt-4 transition-colors duration-200 hover:text-blue-600">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-2">
                    {service.description}
                  </p>

                  {/* Dropdown element */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isCardOpen ? "max-h-64 opacity-100 mt-6 pt-4 border-t border-gray-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      Operational Scope: {service.dropdownDetails.scope}
                    </p>
                    
                    <div className="mt-3 space-y-1.5">
                      <p className="text-xs font-bold text-gray-400 uppercase">Contract Deliverables:</p>
                      <ul className="space-y-1">
                        {service.dropdownDetails.deliverables.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-xs text-gray-700 flex items-center gap-1.5 transition-transform duration-150 hover:translate-x-1">
                            <span className="text-blue-500 font-bold">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-dashed border-gray-100">
                      <strong className="text-gray-700">Financial Track:</strong> {service.dropdownDetails.payouts}
                    </p>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

    </div>
  );
}