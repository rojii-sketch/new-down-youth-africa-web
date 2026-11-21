import { ArrowRight, BadgeCheck, Briefcase, Check, ChevronDown, CircleAlert, Landmark, MapPin, Megaphone, MessagesSquare, Radio, Target, UserRound, UsersRound, Wallet } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import communityHeroBg from "../assets/images.jpeg";
import ScrollReveal from "../components/ScrollReveal";
import { liveNotifications, services } from "~/data/content";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Dawn Youth Africa | Mobilizing the Future" },
    { name: "description", content: "Empowering and mobilizing Kenyan youth through civic engagement, contract scoping, and community development." },
  ];
}

const serviceIcons = { landmark: Landmark, megaphone: Megaphone, messages: MessagesSquare };

export default function Home() {
  const [dispatchIndex, setDispatchIndex] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [searchStatus, setSearchStatus] = useState<{ found: boolean; message: string } | null>(null);
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const handleVerifyCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    if (searchId.toLowerCase().includes("ndy") || searchId.length > 4) {
      setSearchStatus({ found: true, message: "Demo match. This is an example of a successful check." });
    } else {
      setSearchStatus({ found: false, message: "No demo match. Try NDY-demo." });
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans overflow-x-hidden">

      {/* Sample dispatches are advanced by the visitor. */}
      <div className="dispatch-bar">
        <div className="dispatch-inner max-w-7xl mx-auto">
          <div className="flex items-center gap-2 shrink-0">
            <Radio size={16} aria-hidden="true" />
            <span>Sample dispatches</span>
          </div>
          <p className="text-sm text-slate-100" aria-live="polite">
            {liveNotifications[dispatchIndex]}
          </p>
          <button
            type="button"
            className="dispatch-next"
            onClick={() => setDispatchIndex((index) => (index + 1) % liveNotifications.length)}
          >
            Next sample <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* HERO SECTION WITH LIFTING HOVER AND LOAD SCALE EFFECT */}
      <section id="hero" className="home-hero relative overflow-hidden">
        <div className="hero-media absolute inset-0 z-0">
          <img
            src={communityHeroBg}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column Content - Interactive text scaling and shifts */}
          <ScrollReveal direction="left">
            <div className="space-y-6 max-w-xl group/text">
              <span className="hero-kicker"><MapPin size={16} aria-hidden="true" />
                Youth mobilization across Kenya
              </span>

              {/* Dynamic heading that enlarges slightly and brightens text gradients on hover */}
              <h1 className="hero-title">
                Connecting Kenyan youth with <span>opportunity.</span>
              </h1>

              <p className="hero-copy">
                We help county governments, businesses, and civic leaders organize programs that connect young people with training, community forums, and paid opportunities.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/programs" className="action-button action-primary">
                  View upcoming briefings <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link to="/contact" className="action-button action-secondary">
                  <Briefcase size={17} aria-hidden="true" /> Hire our network
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - LIVE ENGAGEMENT CARD (Upgraded with smooth floating scale transitions) */}
          <ScrollReveal direction="right" delay="delay-100">
            <div className="flex justify-center lg:justify-end">
              <div className="engagement-panel p-6 sm:p-8 bg-gray-900/95 backdrop-blur-sm text-white rounded-2xl shadow-xl max-w-md w-full border border-gray-800 space-y-6
                transition-all duration-500 ease-out transform
                hover:scale-[1.04] hover:shadow-2xl hover:border-gray-700 hover:bg-gray-900"
              >
                <div>
                  <h3 className="font-bold text-lg text-blue-400 mb-2 flex items-center gap-2">
                    <Radio size={20} aria-hidden="true" /> Youth engagement briefing
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    We break down every client project so youth know exactly what to expect before stepping on the ground:
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-gray-300 border-b border-gray-800 pb-5">
                  <li className="flex items-start gap-2"><Target size={17} aria-hidden="true" /> <span><strong>The agenda:</strong> Clear, upfront mission details.</span></li>
                  <li className="flex items-start gap-2"><UserRound size={17} aria-hidden="true" /> <span><strong>Guests of honor:</strong> MCAs, dignitaries, or brand managers.</span></li>
                  <li className="flex items-start gap-2"><Wallet size={17} aria-hidden="true" /> <span><strong>Youth benefits:</strong> Stipends, skills certifications, or resources.</span></li>
                </ul>

                <form onSubmit={handleVerifyCheck} className="space-y-2">
                  <label htmlFor="searchId" className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    Try a sample profile check
                  </label>
                  <div className="flex gap-2">
                    <input id="searchId"
                      type="text"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      placeholder="e.g. NDY-demo"
                      aria-describedby="profile-demo-hint"
                      className="flex-grow min-w-0 min-h-[44px] bg-gray-800 border border-gray-700 text-white text-xs px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-ndy-primary focus:border-ndy-primary transition-colors duration-200"
                    />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 min-h-[44px] rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shrink-0">
                      Check sample
                    </button>
                  </div>
                  <p id="profile-demo-hint" className="text-xs leading-relaxed text-gray-400">
                    Demo only. Use a sample code and keep personal details private.
                  </p>
                  {searchStatus && (
                    <p role="status" className={`flex items-start gap-2 text-xs font-medium p-2.5 rounded mt-2 border transition-all duration-300 animate-fade-in ${
                      searchStatus.found
                        ? "bg-green-950/40 text-green-400 border-green-900/40"
                        : "bg-red-950/40 text-red-400 border-red-900/40"
                    }`}>
                      {searchStatus.found ? <BadgeCheck size={16} aria-hidden="true" /> : <CircleAlert size={16} aria-hidden="true" />}
                      {searchStatus.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      <section id="metrics" className="metrics-band py-8 sm:py-10 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Who we work with</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="audience-item">
              <div className="icon-tile"><MapPin size={21} aria-hidden="true" /></div>
              <div><h3>County partners</h3><p>Public forums and community outreach</p></div>
            </li>
            <li className="audience-item">
              <div className="icon-tile"><UsersRound size={21} aria-hidden="true" /></div>
              <div><h3>Youth networks</h3><p>Training, participation and local opportunities</p></div>
            </li>
            <li className="audience-item">
              <div className="icon-tile"><Briefcase size={21} aria-hidden="true" /></div>
              <div><h3>Businesses and civic leaders</h3><p>Campaigns and community engagement</p></div>
            </li>
          </ul>
        </div>
      </section>

      {/* MOBILIZATION SECTOR ROLES - STAGGERED MOVEMENT WHEN SCROLLING */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              How we mobilize
            </h2>
            <p className="mt-4 text-base text-gray-600">
              Explore what we deliver for counties, businesses, and civic leaders.
            </p>
          </ScrollReveal>
        </div>

        {/* Dynamic Grid featuring structural animation delays */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-8 items-start">
          {services.map((service, idx) => {
            const isCardOpen = expandedService === idx;
            const ServiceIcon = serviceIcons[service.icon];
            const delayClasses = ["delay-0", "delay-100", "delay-200"];

            return (
              <ScrollReveal key={idx} delay={delayClasses[idx]}>
                <article
                  className={`surface-card bg-white p-6 sm:p-8 rounded-2xl border text-left
                    transition-all duration-300 ease-out transform
                    hover:-translate-y-0.5
                    ${isCardOpen ? "border-blue-500 ring-2 ring-blue-500/10 shadow-2xl" : "border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300"}
                  `}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="icon-tile">
                      <ServiceIcon size={23} aria-hidden="true" />
                    </div>
                    <button type="button" aria-expanded={isCardOpen} aria-controls={`service-details-${idx}`} aria-label={`Details for ${service.title}`} onClick={() => setExpandedService(isCardOpen ? null : idx)} className="details-button">
                      {isCardOpen ? "Close" : "Details"} <ChevronDown size={16} className={isCardOpen ? "rotate-180" : ""} aria-hidden="true" />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 tracking-tight mt-4 transition-colors duration-200 hover:text-blue-600">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-2">
                    {service.description}
                  </p>

                  {/* Dropdown element */}
                  <div id={`service-details-${idx}`} hidden={!isCardOpen} className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      Scope: {service.dropdownDetails.scope}
                    </p>

                    <div className="mt-3 space-y-1.5">
                      <p className="text-xs font-bold text-gray-400 uppercase">Deliverables</p>
                      <ul className="space-y-1">
                        {service.dropdownDetails.deliverables.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-xs text-gray-700 flex items-center gap-1.5 transition-transform duration-150 hover:translate-x-1">
                            <Check size={15} className="text-blue-600 shrink-0" aria-hidden="true" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-dashed border-gray-100">
                      <strong className="text-gray-700">Payment:</strong> {service.dropdownDetails.payouts}
                    </p>
                  </div>

                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

    </div>
  );
}
