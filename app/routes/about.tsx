import { ArrowRight, Eye, MapPin, Route as RouteIcon, ShieldCheck, UsersRound, Workflow } from "lucide-react";
import PageIntro from "../components/PageIntro";
import { Link } from "react-router";
import ScrollReveal from "../components/ScrollReveal";
import { coreValues, mobilizationSteps } from "~/data/content";

import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us | New Dawn Youth Africa" },
    { name: "description", content: "Learn how New Dawn Youth Africa connects governments, corporate investors, and civic leaders with verified youth networks across Kenya." },
  ];
}

const valueIcons = [Eye, RouteIcon, ShieldCheck];

export default function About() {
  return (
    <div className="bg-gray-50 text-gray-900 overflow-x-hidden scroll-smooth">

      <div className="inner-page about-intro max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageIntro id="who-we-are" icon={UsersRound} label="About New Dawn" title={<>We bring organizations and <em>young people</em> together</>}>
          New Dawn Youth Africa connects county governments, businesses, and civic leaders with youth networks across Kenya for programs, campaigns, and town halls.
        </PageIntro>
      </div>

      {/* 2. THE BUSINESS MODEL & PIPELINE (Mapped with #pipeline Anchor Link) */}
      <section id="pipeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Left Column Description Layout */}
        <div className="space-y-6 group/story">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight transition-all duration-300 group-hover/story:text-gray-800">
              From Mombasa to communities across Kenya
            </h2>
            <div className="space-y-5 text-base text-gray-600 leading-relaxed mt-4">
              <p>
                Based in Kadzandani Ward, New Dawn Youth Africa helps organizers turn community plans into events young people can take part in. We explain the agenda, who will attend and what participants can expect before they arrive.
              </p>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="surface-card rounded-2xl border bg-white p-4">
                  <dt className="font-extrabold text-gray-900">Our mission</dt>
                  <dd className="mt-1 text-sm">Connect young people with practical opportunities through clear, locally coordinated outreach.</dd>
                </div>
                <div className="surface-card rounded-2xl border bg-white p-4">
                  <dt className="font-extrabold text-gray-900">Our vision</dt>
                  <dd className="mt-1 text-sm">A Kenya where young people can shape local decisions and access opportunities in their communities.</dd>
                </div>
              </dl>
            </div>

            {/* Local Coastal HQ Highlight Badge */}
            <div className="p-5 bg-blue-50/80 border-l-4 border-blue-600 rounded-r-2xl mt-6 transition-all duration-300 hover:bg-blue-50 hover:shadow-md transform hover:translate-x-1">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                <MapPin size={17} aria-hidden="true" /> Our regional footprint
              </p>
              <p className="text-sm text-blue-950 mt-1.5">
                Operated out of our main headquarters in <strong className="text-blue-900">Kadzandani Ward, Kisauni Sub-County (Mombasa)</strong>, with a scalable operational framework ready to deploy networks across all 47 Kenyan counties.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column - BLUEPRINT METHOD PIPELINE (Upgraded with highly responsive list-group card hover item highlights) */}
        <div className="dark-panel bg-gray-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-800 space-y-6 transition-all duration-500 hover:shadow-2xl hover:border-gray-700">
          <ScrollReveal>
            <h3 className="text-lg font-black text-blue-400 border-b border-gray-800 pb-3 uppercase tracking-wider flex items-center justify-between">
              <span>How it works</span><Workflow size={21} aria-hidden="true" />
            </h3>

            <div className="space-y-3 pt-2">
              {mobilizationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 text-sm p-3 rounded-xl"
                >
                  <span className="font-mono font-black step-number text-xl leading-none">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-base leading-tight">
                      {step.name}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">
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
                What guides our work
              </h2>
              <p className="mt-3 text-sm text-gray-600 font-medium">
                The foundational standards that make New Dawn a trusted contractual partner for both public administrators and global investors.
              </p>
            </ScrollReveal>
          </div>

          {/* Value cards rendering with horizontal spatial stagger lifts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => {
              const ValueIcon = valueIcons[idx];
              const staggerDelays = ["delay-0", "delay-100", "delay-200"];

              return (
                <ScrollReveal key={idx} delay={staggerDelays[idx]}>
                  <div className="surface-card bg-white p-8 rounded-2xl border border-gray-100/80 flex flex-col space-y-3 text-left
                    transition-all duration-300 ease-out transform
                    shadow-lg hover:shadow-xl
                     hover:bg-white hover:border-blue-300"
                  >
                    <div className="icon-tile">
                      <ValueIcon size={22} aria-hidden="true" />
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
          <div className="dark-panel from-gray-900 to-blue-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-800 space-y-6 transform transition-transform duration-500 hover:scale-[1.01]">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Need Verified Turnout for Your Next Project?
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Put your community development strategy, product marketing activation, or local leadership agenda in front of an organized youth cohort.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="action-button action-primary"
              >
                Start a project <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
