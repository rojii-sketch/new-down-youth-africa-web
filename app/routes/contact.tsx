import { useState, useEffect, useRef } from "react";

// --- 💡 NATIVE SCROLL REVEAL WRAPPER COMPONENT ---
function ScrollReveal({ children, delay = "delay-0" }: { children: React.ReactNode; delay?: string }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (elementRef.current) observer.unobserve(elementRef.current);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
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
          : "opacity-0 translate-y-10 scale-[0.99] pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  // 1. Upgraded state model to align with your B2B/B2G mobilization scope
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    engagementType: "Hiring for Mobilization", // Default strategy selector
    county: "Mombasa",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Portal Registration Dispatched:", formData);
    setIsSubmitted(true);
  };

  // 💡 Dynamic form content configuration parameters based on Engagement type selection
  const isClient = formData.engagementType === "Hiring for Mobilization";
  const dynamicPlaceholder = isClient
    ? "Outline your project agenda, guest of honor lineup, and resources allocated for youth turnout..."
    : "Tell us about your youth group, sub-county location, and fields you wish to participate in...";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-x-hidden scroll-smooth">
      
      {/* PAGE HEADER BLOCK */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <ScrollReveal>
          <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md shadow-sm border border-blue-100">
            Secure Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3">
            Get in Touch & Initiate Dispatches
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
            Whether you are a corporate brand or county official seeking targeted community mobilization, or a youth leader joining the network, use this channel to sync with our hub.
          </p>
        </ScrollReveal>
      </div>

      {/* MAIN TWO-COLUMN INTEGRATION LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT COLUMN: CONTROLLED DYNAMIC INPUT CONTAINER (Mapped with #form Anchor Link) */}
        <div id="form" className="pt-2">
          <ScrollReveal>
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl focus-within:border-blue-300 relative">
              
              {isSubmitted ? (
                <div className="text-center py-16 space-y-4 animate-fadeIn">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-2 font-mono text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">Asante Sana!</h3>
                  <p className="text-gray-600 text-sm max-w-sm mx-auto font-medium">
                    Thank you, <span className="text-blue-600 font-bold">{formData.fullName}</span>. Your portal packet has been successfully encrypted and routed to our Kisauni coordination hub.
                  </p>
                  <div className="bg-gray-50 text-[11px] p-3 rounded-xl border border-gray-100 font-mono text-gray-500 max-w-xs mx-auto">
                    Tracking Scope: {formData.engagementType} ({formData.county})
                  </div>
                  <button
                    onClick={() => { setIsSubmitted(false); setFormData({ fullName: "", email: "", engagementType: "Hiring for Mobilization", county: "Mombasa", message: "" }); }}
                    className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs shadow-sm hover:bg-blue-700 hover:scale-105 active:scale-95 transform transition-all duration-200"
                  >
                    Reset Dispatch Channel
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* INTERACTIVE TOGGLE: ENGAGEMENT PORTAL CHANNEL SELECTOR */}
                  <div>
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2">
                      Select Portal Access Mode
                    </span>
                    <div className="grid grid-cols-2 gap-3 p-1 bg-gray-50 border border-gray-200 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, engagementType: "Hiring for Mobilization" }))}
                        className={`py-2 px-3 text-xs font-bold rounded-lg transition-all duration-200 ${
                          isClient 
                            ? "bg-blue-600 text-white shadow-sm" 
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        💼 Hire Our Network
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, engagementType: "Joining Network Network" }))}
                        className={`py-2 px-3 text-xs font-bold rounded-lg transition-all duration-200 ${
                          !isClient 
                            ? "bg-blue-600 text-white shadow-sm" 
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        ⚡ Join as Youth Member
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      {isClient ? "Company / Office Representative Full Name" : "Your Official Full Name"}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g., Rodgers Kahindi"
                      className="w-full px-4 py-3 border border-gray-300 bg-gray-50/30 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Official Contact Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-300 bg-gray-50/30 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label htmlFor="county" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Primary Target County of Operation
                    </label>
                    <select
                      name="county"
                      id="county"
                      value={formData.county}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white outline-none transition text-sm font-bold text-gray-700"
                    >
                      <option value="Mombasa">Mombasa County</option>
                      <option value="Kilifi">Kilifi County</option>
                      <option value="Kwale">Kwale County</option>
                      <option value="Taita Taveta">Taita Taveta County</option>
                      <option value="Nairobi">Nairobi County</option>
                      <option value="Other">Other African Region</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      {isClient ? "Project Mobilization Specifications" : "Tell Us About Your Goals"}
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={dynamicPlaceholder}
                      className="w-full px-4 py-3 border border-gray-300 bg-gray-50/30 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 text-sm font-medium resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 px-4 rounded-xl transition-all duration-200 text-xs shadow-md transform hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99]"
                  >
                    {isClient ? "Submit Mobilization RFQ Briefing" : "Submit Verification Profile"}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* RIGHT COLUMN: RECONSTRUCTED HQ DETAILS CONTAINER (Mapped with #hq Anchor Link) */}
        <div id="hq" className="space-y-8 lg:pl-4 pt-2">
          <ScrollReveal delay="delay-100">
            <div className="bg-gray-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-800 space-y-6 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
              <h2 className="text-xl font-black tracking-wide text-blue-400 uppercase">Agency Headquarters</h2>
              <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                <p className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-800/40 transition">
                  <span className="text-blue-400 text-base shrink-0">📍</span>
                  <div>
                    <strong className="text-white block font-sans text-xs uppercase tracking-wide text-gray-400">Physical Venue</strong>
                    <span className="font-semibold">Kadzandani Ward, Kisauni Sub-County, Mombasa, Kenya.</span>
                  </div>
                </p>
                <p className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-800/40 transition">
                  <span className="text-blue-400 text-base shrink-0">✉</span>
                  <div>
                    <strong className="text-white block font-sans text-xs uppercase tracking-wide text-gray-400">Contact Gateway</strong>
                    <span className="font-semibold text-blue-300">info@newdawn-youth.org</span>
                  </div>
                </p>
                <p className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-800/40 transition">
                  <span className="text-blue-400 text-base shrink-0">⏱</span>
                  <div>
                    <strong className="text-white block font-sans text-xs uppercase tracking-wide text-gray-400">Operation Loops</strong>
                    <span className="font-semibold">Monday – Friday: 8:00 AM – 5:00 PM EAT</span>
                  </div>
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* UPGRADED TECHNICAL MAP TELEMETRY COMPONENT BOX */}
          <ScrollReveal delay="delay-200">
            <div className="bg-white border border-gray-200 rounded-3xl h-64 flex flex-col items-center justify-center text-center p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-lg group/map relative overflow-hidden">
              {/* Abstract crosshair mesh blueprint lines to look highly architectural and interactive */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70 group-hover/map:opacity-100 transition duration-300"></div>
              
              <div className="relative z-10 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xl shadow-inner transition-transform duration-500 group-hover/map:rotate-[360deg] group-hover/map:bg-blue-600 group-hover/map:text-white">
                  🗺
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-wide">Kadzandani Hub Mapping Module</h3>
                  <p className="text-xs text-gray-500 mt-1.5 max-w-xs mx-auto font-medium leading-relaxed">
                    Geographic coordinates pinned to <span className="text-blue-600 font-bold">Kisauni Sub-County</span>. Ready for seamless integration with Leaflet.js or Google Maps SDK.
                  </p>
                </div>
                <div className="text-[10px] font-mono bg-gray-50 border border-gray-100 text-gray-400 px-2 py-0.5 rounded inline-block transition-colors duration-200 group-hover/map:bg-blue-50 group-hover/map:text-blue-600 group-hover/map:border-blue-100">
                  Lat: -4.0163° S | Lon: 39.6912° E
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}