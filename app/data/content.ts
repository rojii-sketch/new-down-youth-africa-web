export interface ServiceDropdownDetails {
  scope: string;
  deliverables: string[];
  payouts: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  dropdownDetails: ServiceDropdownDetails;
}

export interface CoreValue {
  title: string;
  description: string;
}

export interface MobilizationStep {
  num: string;
  name: string;
  desc: string;
}

export interface ContractEngagement {
  id: number;
  clientType: "Government" | "Corporate Marketing" | "Political / Civic";
  title: string;
  agenda: string;
  guestOfHonor: string;
  location: string;
  dateTime: string;
  youthGain: string;
  status: "Open Registration" | "Fully Mobilized" | "Concluded";
}

export const liveNotifications: string[] = [
  "⚡ LIVE: 42 youth just checked into the Mombasa Planning Forum briefing.",
  "📢 CONTRACT SIGNED: Private Investor onboarding 200 youth marketers in Kwale.",
  "✅ DISPATCH: Kadzandani Ward venue locked for Saturday's MCA leadership summit.",
  "🔥 IMPACT: Network milestone reached—over 450 verified youth registrations this week alone!",
];

export const services: Service[] = [
  {
    icon: "🏛️",
    title: "Civic & County Mobilization",
    description:
      "Hired by county governments and officials to organize youth forums, community development activities, and town halls. We handle logistics, agendas, and clear participant mobilization.",
    dropdownDetails: {
      scope: "B2G Government Contracts",
      deliverables: [
        "100% verified regional attendance logs",
        "Secure structural venue setups in Kisauni",
        "Comprehensive community feedback reporting",
      ],
      payouts: "Facilitated via strict county stipend structures.",
    },
  },
  {
    icon: "📢",
    title: "Commercial Product Marketing",
    description:
      "Partnering with private investors and corporations to run product awareness campaigns, product testing panels, and educational marketing activations targeting young demographics.",
    dropdownDetails: {
      scope: "Corporate Brand Activations",
      deliverables: [
        "Direct product usage training groups",
        "High-conversion brand ambassadors selection",
        "Data-driven field demographic analysis",
      ],
      payouts: "Commission matrices & direct activation daily stipends.",
    },
  },
  {
    icon: "🗣️",
    title: "Political & Leadership Forums",
    description:
      "Contracted by leadership candidates, MCAs, and government dignitaries to structure orderly, highly productive meetings with youth groups, outlining clear parameters and tangible gains.",
    dropdownDetails: {
      scope: "Civic & Townhall Engagements",
      deliverables: [
        "Orderly agenda moderation channels",
        "Transparent candidate manifesto distribution",
        "Direct youth question-and-answer panels",
      ],
      payouts: "Funded group-registration grants and toolkits.",
    },
  },
];

export const coreValues: CoreValue[] = [
  {
    title: "Absolute Transparency",
    description:
      "We explicitly detail project agendas, expected guest lineups, and exact participant gains to the youth network prior to any deployment field mobilization.",
  },
  {
    title: "Logistical Excellence",
    description:
      "Whether managing a local community hall assembly in Kisauni or a large product activation across multiple coastal counties, we deliver organized, controlled turnouts.",
  },
  {
    title: "Accountable Delivery",
    description:
      "We treat every mobilization initiative as a critical contract, supplying our corporate, administrative, and civic clients with verified engagement data.",
  },
];

export const mobilizationSteps: MobilizationStep[] = [
  {
    num: "01",
    name: "Contract Scoping",
    desc: "Clients (Brands, MCAs, or County Offices) submit their specific target demographic criteria and project goals.",
  },
  {
    num: "02",
    name: "Agenda Simplification",
    desc: "We break down the client's complex project parameters into transparent, highly accessible briefs for the youth network.",
  },
  {
    num: "03",
    name: "Mass Mobilization",
    desc: "Leveraging our regional coordinators, we broadcast details, manage registrations, and secure structural venues.",
  },
  {
    num: "04",
    name: "Execution & Accountability",
    desc: "We coordinate orderly on-the-ground engagement, verify attendance parameters, and ensure smooth delivery of stipends or resources.",
  },
];

export const deployments: ContractEngagement[] = [
  {
    id: 1,
    clientType: "Government",
    title: "Mombasa County Development Planning Forum",
    agenda:
      "Reviewing spatial allocation budgets for local youth vocational centers and market stall distributions in Kisauni.",
    guestOfHonor: "County Executive Committee Member (CECM) for Youth & Gender",
    location: "Kadzandani Ward Office Hall, Kisauni, Mombasa",
    dateTime: "Wednesday, Next Week at 9:00 AM EAT",
    youthGain:
      "Direct policy input, networking channels, and transport facilitation allowances.",
    status: "Open Registration",
  },
  {
    id: 2,
    clientType: "Corporate Marketing",
    title: "Pwani Agribusiness Solar Pump Activation",
    agenda:
      "Private Investor showcasing energy-efficient automated farming kits. Demonstration of product usage and onboarding regional distributors.",
    guestOfHonor: "Head of Marketing, SoliTech East Africa",
    location: "Mtwapa Agriculture Demonstration Grounds",
    dateTime: "Friday, End of Month at 10:00 AM EAT",
    youthGain:
      "Free technical operation certificates, priority access to sub-agency seed contracts, and lunch packages.",
    status: "Open Registration",
  },
  {
    id: 3,
    clientType: "Political / Civic",
    title: "Youth Townhall with Aspiring MCA Leadership",
    agenda:
      "Debating local security infrastructure priorities, business permit waivers for youth groups, and coastal empowerment allocations.",
    guestOfHonor: "Kadzandani Ward Candidate Representatives",
    location: "Kisauni Community Social Hall, Mombasa",
    dateTime: "Saturday, 18th July at 2:00 PM EAT",
    youthGain:
      "Direct cross-examination of manifestos, youth-group registration funding sign-ups.",
    status: "Fully Mobilized",
  },
];

export const programFilters: string[] = [
  "All",
  "Government",
  "Corporate Marketing",
  "Political / Civic",
];