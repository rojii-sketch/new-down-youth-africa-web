import { ArrowRight, CalendarDays, Check, Clock, Gift, Landmark, LayoutGrid, MapPin, Megaphone, MessagesSquare, Target, UserRound } from "lucide-react";
import PageIntro from "../components/PageIntro";
import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import { deployments, programFilters } from "~/data/content";

import type { Route } from "./+types/programs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Programs & Deployments | New Dawn Youth Africa" },
    { name: "description", content: "Browse active mobilization deployments, upcoming civic forums, and corporate brand activations open for youth registration." },
  ];
}

const filterIcons = { All: LayoutGrid, Government: Landmark, "Corporate Marketing": Megaphone, "Political / Civic": MessagesSquare };

export default function Programs() {
  // --- 💡 LIVE SIMULATOR REGISTRATION STATES ---
  const [registeredIds, setRegisteredIds] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState<(typeof programFilters)[number]>("All");

  const filteredDeployments = activeFilter === "All"
    ? deployments
    : deployments.filter(item => item.clientType === activeFilter);

  // Toggle function simulating a live backend signup push
  const handleSimulatedRegister = (id: number) => {
    if (registeredIds.includes(id)) return;
    setRegisteredIds((prev) => [...prev, id]);
  };

  return (
    <div className="inner-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 overflow-x-hidden scroll-smooth">

      <PageIntro id="focus" icon={CalendarDays} label="Programs" title={<>Find your next <em>opportunity</em></>}>
        Explore example forums and campaigns, compare participation details, and try the registration demo.
      </PageIntro>

      {/* 2. OPERATIONAL BOARD BLOCK CONTAINER (Mapped with #board Anchor Link Handle) */}
      <div id="board" className="space-y-8">

        {/* Filter Navigation Tabs with Micro-Scale Highlights */}
        <ScrollReveal>
          <div role="group" aria-label="Filter programs by sector" className="flex flex-wrap items-center gap-2">
            {programFilters.map((filter) => {
              const FilterIcon = filterIcons[filter];
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={`filter-button ${
                    activeFilter === filter
                      ? "bg-ndy-primary text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900"
                  }`}
                >
                  <FilterIcon size={17} aria-hidden="true" /> {filter}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-gray-600" role="status">
            {filteredDeployments.length} {filteredDeployments.length === 1 ? "program" : "programs"} shown. Sample schedules and registration steps are for demonstration.
          </p>
        </ScrollReveal>

        {/* Deployment Cards Stagger Loop Grid */}
        <div className="grid grid-cols-1 gap-8">
          {filteredDeployments.map((job, idx) => {
            const hasJoined = registeredIds.includes(job.id);
            const CategoryIcon = filterIcons[job.clientType];
            const cardDelays = ["delay-0", "delay-100", "delay-200"];

            return (
              <ScrollReveal key={job.id} delay={cardDelays[idx] || "delay-0"}>
                <div
                  className={`surface-card program-card bg-white border rounded-2xl overflow-hidden group/card text-left
                    transition-all duration-300 ease-out transform
                    hover:border-blue-300
                    ${hasJoined ? "border-emerald-500 ring-2 ring-emerald-500/5 shadow-2xl" : "border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300"}
                  `}
                >
                  <div className="p-6 sm:p-8">

                    {/* Upper Badge Panel Layout Row */}
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100 transition-all duration-300 group-hover/card:bg-blue-100">
                        <CategoryIcon size={15} aria-hidden="true" /> {job.clientType}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${
                        hasJoined
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : job.status === "Open Registration"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        <span className="status-dot" aria-hidden="true" /> {hasJoined ? "Demo complete" : job.status === "Open Registration" ? "Demo available" : job.status}
                      </span>
                    </div>

                    {/* Interactive title highlighting font colors on card hover focus */}
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 transition-colors duration-200 group-hover/card:text-blue-600">
                      {job.title}
                    </h2>

                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl mb-6 transition-colors duration-200 group-hover/card:bg-gray-50/80 group-hover/card:border-gray-200/60">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 flex items-center gap-2">
                        <Target size={17} aria-hidden="true" /> Project agenda
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        {job.agenda}
                      </p>
                    </div>

                    {/* Metadata Context Selection Row Grid Blocks */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm border-b border-gray-100 pb-6 mb-6">
                      <div className="p-2 rounded-xl transition-colors duration-200 hover:bg-gray-50 group/meta">
                        <p className="metadata-label"><UserRound size={16} aria-hidden="true" /> Guest of honor</p>
                        <p className="font-bold text-gray-800 mt-0.5 transition-colors duration-150 group-hover/meta:text-blue-600">{job.guestOfHonor}</p>
                      </div>
                      <div className="p-2 rounded-xl transition-colors duration-200 hover:bg-gray-50 group/meta">
                        <p className="metadata-label"><MapPin size={16} aria-hidden="true" /> Meeting venue</p>
                        <p className="font-bold text-gray-800 mt-0.5 transition-colors duration-150 group-hover/meta:text-blue-600">{job.location}</p>
                      </div>
                      <div className="p-2 rounded-xl transition-colors duration-200 hover:bg-gray-50 group/meta">
                        <p className="metadata-label"><Clock size={16} aria-hidden="true" /> Schedule</p>
                        <p className="font-bold text-blue-600 mt-0.5">{job.dateTime}</p>
                      </div>
                      <div className="p-2 rounded-xl transition-colors duration-200 hover:bg-gray-50 group/meta">
                        <p className="metadata-label"><Gift size={16} aria-hidden="true" /> Participant benefits</p>
                        <p className="font-bold text-blue-700 mt-0.5">{job.youthGain}</p>
                      </div>
                    </div>

                    {/* Action Panel Trigger Button (Configured with dynamic state text updates) */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm text-gray-600" role="status">
                        {hasJoined ? "Demo complete. No registration was submitted." : ""}
                      </p>
                      <button type="button"
                        onClick={() => handleSimulatedRegister(job.id)}
                        disabled={job.status !== "Open Registration" || hasJoined}
                        className={`action-button ${
                          hasJoined
                            ? "bg-blue-700 text-white font-extrabold shadow-inner cursor-default"
                            : job.status === "Open Registration"
                            ? "action-primary"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                        }`}
                      >
                        {hasJoined ? <Check size={17} aria-hidden="true" /> : job.status === "Open Registration" && <ArrowRight size={17} aria-hidden="true" />}
                        {hasJoined
                          ? "Demo completed"
                          : job.status === "Open Registration"
                          ? "Try demo registration"
                          : "Registration Closed"}
                      </button>
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Empty Search Filter State Catch */}
        {filteredDeployments.length === 0 && (
          <ScrollReveal>
            <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-3xl mt-4">
              <p className="text-gray-600 text-sm font-semibold">No programs match this filter.</p>
              <button type="button" className="action-button action-secondary mt-4" onClick={() => setActiveFilter("All")}>
                Show all programs
              </button>
            </div>
          </ScrollReveal>
        )}

      </div>

    </div>
  );
}
