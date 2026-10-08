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

export default function Programs() {
  // --- 💡 LIVE SIMULATOR REGISTRATION STATES ---
  const [registeredIds, setRegisteredIds] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredDeployments = activeFilter === "All"
    ? deployments
    : deployments.filter(item => item.clientType === activeFilter);

  // Toggle function simulating a live backend signup push
  const handleSimulatedRegister = (id: number) => {
    if (registeredIds.includes(id)) return;
    setRegisteredIds((prev) => [...prev, id]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-x-hidden scroll-smooth">
      
      {/* 1. FOCUS SECTION HEADER BLOCK (Mapped with #focus Anchor Link Handle) */}
      <div id="focus" className="text-center max-w-3xl mx-auto mb-16 relative pt-4">
        <ScrollReveal>
          <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md shadow-sm border border-blue-100">
            Deployment Control
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-3">
            Active Engagements & Deployment Board
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
            Transparent, upfront project briefs for our youth network. Read agendas, locate meeting points, view guest lineups, and verify your benefits before participating.
          </p>
        </ScrollReveal>
      </div>

      {/* 2. OPERATIONAL BOARD BLOCK CONTAINER (Mapped with #board Anchor Link Handle) */}
      <div id="board" className="space-y-8">
        
        {/* Filter Navigation Tabs with Micro-Scale Highlights */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
            {programFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  activeFilter === filter
                    ? "bg-ndy-primary text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Deployment Cards Stagger Loop Grid */}
        <div className="grid grid-cols-1 gap-8">
          {filteredDeployments.map((job, idx) => {
            const hasJoined = registeredIds.includes(job.id);
            const cardDelays = ["delay-0", "delay-700", "delay-200"]; // Loop index padding shifts
            
            return (
              <ScrollReveal key={job.id} delay={cardDelays[idx] || "delay-0"}>
                <div 
                  className={`bg-white border rounded-2xl overflow-hidden group/card text-left
                    /* 💡 ADVANCED TRANSITIONS AND LIFTS */
                    transition-all duration-300 ease-out transform 
                    hover:-translate-y-1.5 hover:scale-[1.005]
                    ${hasJoined ? "border-emerald-500 ring-2 ring-emerald-500/5 shadow-2xl" : "border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300"}
                  `}
                >
                  <div className="p-6 sm:p-8">
                    
                    {/* Upper Badge Panel Layout Row */}
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100 transition-all duration-300 group-hover/card:bg-blue-100">
                        {job.clientType}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${
                        hasJoined
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse"
                          : job.status === "Open Registration"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        ● {hasJoined ? "Profile Dispatched" : job.status}
                      </span>
                    </div>

                    {/* Interactive title highlighting font colors on card hover focus */}
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 transition-colors duration-200 group-hover/card:text-blue-600">
                      {job.title}
                    </h2>
                    
                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl mb-6 transition-colors duration-200 group-hover/card:bg-gray-50/80 group-hover/card:border-gray-200/60">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1.5">
                        <span>🎯 Complete Project Agenda</span>
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        {job.agenda}
                      </p>
                    </div>

                    {/* Metadata Context Selection Row Grid Blocks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-b border-gray-100 pb-6 mb-6">
                      <div className="p-2 rounded-xl transition-colors duration-200 hover:bg-gray-50 group/meta">
                        <p className="text-xs text-gray-400 font-extrabold uppercase tracking-wide">👤 Guest of Honor</p>
                        <p className="font-bold text-gray-800 mt-0.5 transition-colors duration-150 group-hover/meta:text-blue-600">{job.guestOfHonor}</p>
                      </div>
                      <div className="p-2 rounded-xl transition-colors duration-200 hover:bg-gray-50 group/meta">
                        <p className="text-xs text-gray-400 font-extrabold uppercase tracking-wide">📍 Exact Venue / Meeting Hub</p>
                        <p className="font-bold text-gray-800 mt-0.5 transition-colors duration-150 group-hover/meta:text-blue-600">{job.location}</p>
                      </div>
                      <div className="p-2 rounded-xl transition-colors duration-200 hover:bg-gray-50 group/meta">
                        <p className="text-xs text-gray-400 font-extrabold uppercase tracking-wide">⏱ Schedule Timing</p>
                        <p className="font-bold text-blue-600 mt-0.5">{job.dateTime}</p>
                      </div>
                      <div className="p-2 rounded-xl transition-colors duration-200 hover:bg-gray-50 group/meta">
                        <p className="text-xs text-gray-400 font-extrabold uppercase tracking-wide">🎁 Participant Gains & Provisions</p>
                        <p className="font-bold text-emerald-600 mt-0.5">{job.youthGain}</p>
                      </div>
                    </div>

                    {/* Action Panel Trigger Button (Configured with dynamic state text updates) */}
                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleSimulatedRegister(job.id)}
                        disabled={job.status !== "Open Registration" || hasJoined}
                        className={`px-6 py-3 rounded-full font-bold text-xs shadow-sm transition-all duration-200 transform active:scale-95 ${
                          hasJoined
                            ? "bg-emerald-600 text-white font-extrabold shadow-inner cursor-default"
                            : job.status === "Open Registration"
                            ? "bg-gradient-to-r from-ndy-primary to-ndy-secondary text-white hover:scale-105 hover:shadow-xl"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                        }`}
                      >
                        {hasJoined 
                          ? "✓ You Are Registered For This Track" 
                          : job.status === "Open Registration" 
                          ? "Register for this Mobilization Track" 
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
              <p className="text-gray-500 text-sm font-semibold">No deployment contracts currently match the selected tracking sector rules.</p>
            </div>
          </ScrollReveal>
        )}

      </div>

    </div>
  );
}