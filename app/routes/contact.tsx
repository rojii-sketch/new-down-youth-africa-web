import { Briefcase, Check, Clock, ExternalLink, Mail, MapPin, MessageSquare, Send, UsersRound } from "lucide-react";
import PageIntro from "../components/PageIntro";
import { useEffect, useRef, useState } from "react";
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

  const feedbackRef = useRef<HTMLDivElement>(null);
  const firstModeRef = useRef<HTMLButtonElement>(null);

  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const showSuccess = actionData?.ok === true && actionData !== dismissedFor;
  const fieldErrors = actionData?.ok === false ? actionData.errors : {};

  useEffect(() => {
    if (!actionData) return;
    if (actionData === dismissedFor) {
      firstModeRef.current?.focus();
      return;
    }
    feedbackRef.current?.focus();
  }, [actionData, dismissedFor]);

  const isClient = engagementType === "Hiring for Mobilization";
  const dynamicPlaceholder = isClient
    ? "Outline your project agenda, guest of honor lineup, and resources allocated for youth turnout..."
    : "Tell us about your youth group, sub-county location, and fields you wish to participate in...";

  return (
    <div className="inner-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 overflow-x-hidden scroll-smooth">

      <PageIntro icon={MessageSquare} label="Contact" title={<>Let’s <em>work together</em></>}>
        Find our contact details or try the project and membership inquiry form.
      </PageIntro>

      {/* MAIN TWO-COLUMN INTEGRATION LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6 lg:gap-10 items-start">

        {/* LEFT COLUMN: CONTROLLED DYNAMIC INPUT CONTAINER (Mapped with #form Anchor Link) */}
        <div id="form" className="pt-2">
          <ScrollReveal>
            <div className="surface-card contact-form bg-white p-5 sm:p-8 rounded-3xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl focus-within:border-blue-300 relative">

              {showSuccess ? (
                <div ref={feedbackRef} tabIndex={-1} aria-labelledby="contact-success" className="text-center py-10 space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-2 font-mono text-xl font-bold">
                    <Check size={27} aria-hidden="true" />
                  </div>
                  <h2 id="contact-success" className="text-2xl font-extrabold text-gray-900">Asante sana</h2>
                  <p className="text-gray-600 text-sm max-w-sm mx-auto font-medium">
                    The demo form accepted your entry. To reach the team, use the headquarters email.
                  </p>
                  <div className="bg-gray-50 text-[11px] p-3 rounded-xl border border-gray-100 font-mono text-gray-500 max-w-xs mx-auto">
                    Inquiry type: {actionData.submission.engagementType} ({actionData.submission.county})
                  </div>
                  <button
                    type="button"
                    onClick={() => setDismissedFor(actionData)}
                    className="mt-6 px-6 py-2.5 min-h-[44px] bg-ndy-primary text-white font-bold rounded-full text-xs shadow-lg hover:scale-105 active:scale-95 transform transition-all duration-200"
                  >
                    Try another example
                  </button>
                </div>
              ) : (
                <Form method="post" aria-describedby="inquiry-demo-note" aria-busy={isSubmitting} onSubmit={() => setDismissedFor(null)} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold">Inquiry form demo</h2>
                    <p id="inquiry-demo-note" className="mt-2 text-sm leading-relaxed text-gray-600">
                      Use sample details only. This form does not send a message to our team. For a real inquiry, email <a href="mailto:info@newdawn-youth.org" className="font-semibold text-blue-700 underline">info@newdawn-youth.org</a>.
                    </p>
                  </div>
                  {Object.keys(fieldErrors).length > 0 && (
                    <div ref={feedbackRef} tabIndex={-1} aria-labelledby="inquiry-errors" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                      <p id="inquiry-errors" className="font-bold">Please check the highlighted fields.</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {Object.entries(fieldErrors).map(([field, message]) => (
                          <li key={field}>
                            <a
                              className="underline"
                              href={`#${field}`}
                              onClick={(event) => {
                                const input = document.getElementById(field);
                                if (!input) return;
                                event.preventDefault();
                                input.focus();
                              }}
                            >
                              {message}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* INTERACTIVE TOGGLE: ENGAGEMENT PORTAL CHANNEL SELECTOR */}
                  <fieldset>
                    <legend className="form-mode-label block text-sm font-extrabold mb-2">
                      What brings you here?
                    </legend>
                    <div className="grid grid-cols-2 gap-3 p-1 bg-gray-50 border border-gray-200 rounded-xl">
                      <button
                        type="button"
                        ref={firstModeRef}
                        onClick={() => setEngagementType("Hiring for Mobilization")}
                        aria-pressed={isClient}
                        className={`mode-button py-2 px-3 min-h-[44px] text-xs font-bold rounded-lg transition-all duration-200 ${
                          isClient
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Briefcase size={17} aria-hidden="true" /> Hire our network
                      </button>
                      <button
                        type="button"
                        onClick={() => setEngagementType("Joining the Network")}
                        aria-pressed={!isClient}
                        className={`mode-button py-2 px-3 min-h-[44px] text-xs font-bold rounded-lg transition-all duration-200 ${
                          !isClient
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <UsersRound size={17} aria-hidden="true" /> Join as a youth member
                      </button>
                    </div>
                  </fieldset>

                  <input type="hidden" name="engagementType" value={engagementType} />

                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      {isClient ? "Representative name" : "Full name"}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      required
                      placeholder="e.g. Demo Applicant"
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
                      Email address
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
                      County
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
                      {isClient ? "Project details" : "Your goals"}
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      required
                      placeholder={dynamicPlaceholder}
                      minLength={10}
                      aria-invalid={fieldErrors.message ? true : undefined}
                      aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      className="w-full px-4 py-3 border bg-gray-50/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-ndy-primary focus:border-ndy-primary transition-all duration-300 text-sm font-medium resize-y aria-[invalid=true]:border-red-400"
                    />
                    {fieldErrors.message && (
                      <p id="message-error" className="text-xs font-medium text-red-600 mt-1.5">{fieldErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="action-button action-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Send size={17} aria-hidden="true" />
                    {isSubmitting
                      ? "Checking entry…"
                      : "Submit demo inquiry"}
                  </button>

                </Form>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* RIGHT COLUMN: RECONSTRUCTED HQ DETAILS CONTAINER (Mapped with #hq Anchor Link) */}
        <div id="hq" className="space-y-8 lg:pl-4 pt-2">
          <ScrollReveal delay="delay-100">
            <div className="dark-panel bg-gray-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-800 space-y-6 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
              <h2 className="text-2xl font-extrabold">Agency headquarters</h2>
              <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                <div className="flex items-start gap-3 py-2">
                  <span className="icon-tile"><MapPin size={20} aria-hidden="true" /></span>
                  <div>
                    <strong className="text-white block font-sans text-xs uppercase tracking-wide text-gray-400">Address</strong>
                    <span className="font-semibold">Kadzandani Ward, Kisauni Sub-County, Mombasa, Kenya.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2">
                  <span className="icon-tile"><Mail size={20} aria-hidden="true" /></span>
                  <div>
                    <strong className="text-white block font-sans text-xs uppercase tracking-wide text-gray-400">Email</strong>
                    <a href="mailto:info@newdawn-youth.org" className="font-semibold text-blue-300 break-all hover:underline">info@newdawn-youth.org</a>
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2">
                  <span className="icon-tile"><Clock size={20} aria-hidden="true" /></span>
                  <div>
                    <strong className="text-white block font-sans text-xs uppercase tracking-wide text-gray-400">Office hours</strong>
                    <span className="font-semibold">Monday – Friday: 8:00 AM – 5:00 PM EAT</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay="delay-200">
            <div className="location-card surface-card">
              <div className="icon-tile"><MapPin size={24} aria-hidden="true" /></div>
              <h3>Kadzandani, Mombasa</h3>
              <p>Kisauni Sub-County, Kenya</p>
              <a className="action-button action-secondary" href="https://www.google.com/maps/search/?api=1&query=-4.0163%2C39.6912">
                Open in Maps <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}
