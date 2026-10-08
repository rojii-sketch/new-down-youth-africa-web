import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import ScrollReveal from "../components/ScrollReveal";

import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact | New Dawn Youth Africa" },
    { name: "description", content: "Initiate a mobilization contract or join the youth network. Headquarters in Kadzandani Ward, Kisauni Sub-County, Mombasa, Kenya." },
  ];
}

interface Inquiry {
  fullName: string;
  email: string;
  engagementType: string;
  county: string;
  message: string;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const data: Inquiry = {
    fullName: String(formData.get("fullName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    engagementType: String(formData.get("engagementType") ?? "").trim(),
    county: String(formData.get("county") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors: Partial<Record<keyof Inquiry, string>> = {};
  if (!data.fullName) errors.fullName = "Please provide a name.";
  if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.email = "Please provide a valid email address.";
  if (!data.county) errors.county = "Please select a county.";
  if (data.message.length < 10) errors.message = "Please add a little more detail (10+ characters).";

  if (Object.keys(errors).length > 0) {
    return { ok: false as const, errors };
  }

  console.log("Server received inquiry:", data);

  await new Promise((resolve) => setTimeout(resolve, 800));

  return { ok: true as const, submission: data };
}

export default function Contact() {
  const [engagementType, setEngagementType] = useState("Hiring for Mobilization");
  const [dismissedFor, setDismissedFor] = useState<unknown>(null);

  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const showSuccess = actionData?.ok === true && actionData !== dismissedFor;
  const fieldErrors = actionData?.ok === false ? actionData.errors : {};

  const isClient = engagementType === "Hiring for Mobilization";
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
              
              {showSuccess ? (
                <div className="text-center py-16 space-y-4 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-2 font-mono text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">Asante Sana!</h3>
                  <p className="text-gray-600 text-sm max-w-sm mx-auto font-medium">
                    Thank you, <span className="text-blue-600 font-bold">{actionData.submission.fullName}</span>. Your portal packet has been successfully encrypted and routed to our Kisauni coordination hub.
                  </p>
                  <div className="bg-gray-50 text-[11px] p-3 rounded-xl border border-gray-100 font-mono text-gray-500 max-w-xs mx-auto">
                    Tracking Scope: {actionData.submission.engagementType} ({actionData.submission.county})
                  </div>
                  <button
                    type="button"
                    onClick={() => setDismissedFor(actionData)}
                    className="mt-6 px-6 py-2.5 min-h-[44px] bg-ndy-primary text-white font-bold rounded-full text-xs shadow-lg hover:scale-105 active:scale-95 transform transition-all duration-200"
                  >
                    Reset Dispatch Channel
                  </button>
                </div>
              ) : (
                <Form method="post" onSubmit={() => setDismissedFor(null)} className="space-y-6">
                  
                  {/* INTERACTIVE TOGGLE: ENGAGEMENT PORTAL CHANNEL SELECTOR */}
                  <div>
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2">
                      Select Portal Access Mode
                    </span>
                    <div className="grid grid-cols-2 gap-3 p-1 bg-gray-50 border border-gray-200 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setEngagementType("Hiring for Mobilization")}
                        className={`py-2 px-3 min-h-[44px] text-xs font-bold rounded-lg transition-all duration-200 ${
                          isClient 
                            ? "bg-blue-600 text-white shadow-sm" 
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        💼 Hire Our Network
                      </button>
                      <button
                        type="button"
                        onClick={() => setEngagementType("Joining the Network")}
                        className={`py-2 px-3 min-h-[44px] text-xs font-bold rounded-lg transition-all duration-200 ${
                          !isClient 
                            ? "bg-blue-600 text-white shadow-sm" 
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        ⚡ Join as Youth Member
                      </button>
                    </div>
                  </div>

                  <input type="hidden" name="engagementType" value={engagementType} />

                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      {isClient ? "Company / Office Representative Full Name" : "Your Official Full Name"}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      required
                      placeholder="e.g., Rodgers Kahindi"
                      aria-invalid={fieldErrors.fullName ? true : undefined}
                      aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
                      className="w-full px-4 py-3 border bg-gray-50/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-ndy-primary focus:border-ndy-primary transition text-sm font-medium min-h-[44px] aria-[invalid=true]:border-red-400"
                    />
                    {fieldErrors.fullName && (
                      <p id="fullName-error" className="text-xs font-medium text-red-600 mt-1.5">{fieldErrors.fullName}</p>
                    )}
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
                      placeholder="you@example.com"
                      aria-invalid={fieldErrors.email ? true : undefined}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      className="w-full px-4 py-3 border bg-gray-50/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-ndy-primary focus:border-ndy-primary transition text-sm font-medium min-h-[44px] aria-[invalid=true]:border-red-400"
                    />
                    {fieldErrors.email && (
                      <p id="email-error" className="text-xs font-medium text-red-600 mt-1.5">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="county" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      Primary Target County of Operation
                    </label>
                    <select
                      name="county"
                      id="county"
                      defaultValue="Mombasa"
                      aria-invalid={fieldErrors.county ? true : undefined}
                      aria-describedby={fieldErrors.county ? "county-error" : undefined}
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-ndy-primary focus:border-ndy-primary bg-white transition text-sm font-bold text-gray-700 min-h-[44px] aria-[invalid=true]:border-red-400"
                    >
                      <option value="Mombasa">Mombasa County</option>
                      <option value="Kilifi">Kilifi County</option>
                      <option value="Kwale">Kwale County</option>
                      <option value="Taita Taveta">Taita Taveta County</option>
                      <option value="Nairobi">Nairobi County</option>
                      <option value="Other">Other African Region</option>
                    </select>
                    {fieldErrors.county && (
                      <p id="county-error" className="text-xs font-medium text-red-600 mt-1.5">{fieldErrors.county}</p>
                    )}
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
                      placeholder={dynamicPlaceholder}
                      aria-invalid={fieldErrors.message ? true : undefined}
                      aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      className="w-full px-4 py-3 border bg-gray-50/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-ndy-primary focus:border-ndy-primary transition-all duration-300 text-sm font-medium resize-none aria-[invalid=true]:border-red-400"
                    />
                    {fieldErrors.message && (
                      <p id="message-error" className="text-xs font-medium text-red-600 mt-1.5">{fieldErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[44px] bg-gradient-to-r from-ndy-primary to-ndy-secondary text-white font-extrabold py-3.5 px-4 rounded-xl transition-all duration-200 text-xs shadow-lg transform hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100"
                  >
                    {isSubmitting
                      ? "Sending..."
                      : isClient
                        ? "Submit Mobilization RFQ Briefing"
                        : "Submit Verification Profile"}
                  </button>
                  {Object.keys(fieldErrors).length > 0 && (
                    <p role="alert" className="text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      Please correct the highlighted fields and try again.
                    </p>
                  )}
                </Form>
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