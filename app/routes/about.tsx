import { Link } from "react-router";
import ScrollReveal from "../components/ScrollReveal";
import { coreValues, mobilizationSteps } from "~/data/content";

export default function About() {
  return (
    <div className="bg-gray-50 text-gray-900 overflow-x-hidden scroll-smooth">
      
      {/* 1. HERO CONTEXT BLOCK (Mapped with #who-we-are Anchor Link) */}
      <section id="who-we-are" className="bg-white border-b border-gray-100 py-16 sm:py-24 relative overflow-hidden">
        {/* Abstract animated design ring watermark background decoration */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-50/40 rounded-full pointer-events-none animate-pulse duration-1000"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <ScrollReveal>
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md shadow-sm transition-all duration-300 hover:scale-105 hover:bg-blue-100">
              Who We Are
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mt-3 transition-transform duration-300 hover:scale-[1.005]">
              The Preferred Mobilization Partner for <span className="text-blue-600">Youth Engagement</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4 font-medium">
              New Dawn Youth Africa is a premier community outreach agency and information hub. We specialize in connecting government agencies, corporate investors, and civic leaders with verified, active networks of young citizens for targeted programs, marketing activations, and policy town halls.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. THE BUSINESS MODEL & PIPELINE (Mapped with #pipeline Anchor Link) */}
      <section id="pipeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column Description Layout */}
        <div className="space-y-6 group/story">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight transition-all duration-300 group-hover/story:text-gray-800">
              Connecting Organizations with Grassroots Audiences
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed mt-4">
              <p>
                Organizations frequently struggle to reach, engage, and organize local youth effectively. New Dawn solves this operational challenge. When clients contract us, our main objective is to translate their mission into active youth participation.
              </p>
              <p>
                We handle the end-to-end communication pipeline. From clarifying who the guest of honor is and structuring the meeting agenda, to explaining precisely what the youth will gain (such as stipends, equipment toolkits, or skills certifications), we remove ambiguity to ensure highly productive community forums.
              </p>
            </div>
            
            {/* Local Coastal HQ Highlight Badge */}
            <div className="p-5 bg-blue-50/80 border-l-4 border-blue-600 rounded-r-2xl mt-6 transition-all duration-300 hover:bg-blue-50 hover:shadow-md transform hover:translate-x-1">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                <span className="animate-ping w-1.5 h-1.5 bg-blue-600 rounded-full inline-block"></span>
                📍 Regional Footprint
              </p>
              <p className="text-sm text-blue-950 mt-1.5">
                Operated out of our main headquarters in <strong className="text-blue-900">Kadzandani Ward, Kisauni Sub-County (Mombasa)</strong>, with a scalable operational framework ready to deploy networks across all 47 Kenyan counties.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column - BLUEPRINT METHOD PIPELINE (Upgraded with highly responsive list-group card hover item highlights) */}
        <div className="bg-gray-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-800 space-y-6 transition-all duration-500 hover:shadow-2xl hover:border-gray-700">
          <ScrollReveal>
            <h3 className="text-lg font-black text-blue-400 border-b border-gray-800 pb-3 uppercase tracking-wider flex items-center justify-between">
              <span>Our Operational Method</span>
              <span className="text-[10px] text-gray-500 font-mono tracking-normal lowercase">contract execution pipeline</span>
            </h3>
            
            <div className="space-y-3 pt-2">
              {mobilizationSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-4 text-sm p-3 rounded-xl transition-all duration-200 group/step cursor-pointer hover:bg-gray-800/60 transform hover:translate-x-1.5"
                >
                  <span className="font-mono font-black text-blue-500 text-xl leading-none pt-0.5 transition-colors duration-200 group-hover/step:text-emerald-400">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-base leading-tight transition-colors duration-150 group-hover/step:text-blue-400">
                      {step.name}
                    </h4>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed group-hover/step:text-gray-300">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

      </section>

      {/* 3. CORE VALUE PRINCIPLES (Mapped with #values Anchor Link and Staggered Scroll Reveals) */}
      <section id="values" className="bg-white border-y border-gray-200/60 py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Our Professional Guiding Values
              </h2>
              <p className="mt-3 text-sm text-gray-600 font-medium">
                The foundational standards that make New Dawn a trusted contractual partner for both public administrators and global investors.
              </p>
            </ScrollReveal>
          </div>

          {/* Value cards rendering with horizontal spatial stagger lifts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => {
              const staggerDelays = ["delay-0", "delay-100", "delay-200"];
              
              return (
                <ScrollReveal key={idx} delay={staggerDelays[idx]}>
                  <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100/80 flex flex-col space-y-3 text-left
                    /* HOVER LIFTS AND SMOOTH GRAPHIC SCALE INTERACTION MOTIONS */
                    transition-all duration-300 ease-out transform 
                    shadow-lg hover:shadow-xl
                    hover:-translate-y-2 hover:scale-[1.02] hover:bg-white hover:border-blue-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-black flex items-center justify-center text-sm mb-1">
                      {idx + 1}
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-lg tracking-tight transition-colors duration-200">
                      {val.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. CLOSING CTA BANNER (With full motion spring reactions) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-gray-900 to-blue-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-800 space-y-6 transform transition-transform duration-500 hover:scale-[1.01]">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Need Verified Turnout for Your Next Project?
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Put your community development strategy, product marketing activation, or local leadership agenda in front of an organized youth cohort.
            </p>
            <div className="pt-4">
              <Link 
                to="/contact" 
                className="inline-block bg-gradient-to-r from-ndy-primary to-ndy-secondary text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg text-sm transform transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl"
              >
                Initiate a Mobilization Contract
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}