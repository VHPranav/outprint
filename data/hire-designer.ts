// Static content for the "Hire a Designer" flow. No backend, no matching
// logic — pricing, designer profiles and copy live here so the landing page
// and request form both read from one place.

export interface HowItWorksStep {
  title: string;
  description: string;
  /** lucide-react icon export name */
  icon: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    title: "Tell us what you need",
    description: "A few guided steps — what you're designing, your brief, references and style.",
    icon: "MessageSquareText",
  },
  {
    title: "We assign a designer",
    description: "A specialist matched to your project picks it up, usually within a couple of hours.",
    icon: "UserCheck",
  },
  {
    title: "Review your draft on WhatsApp",
    description: "Concepts and revisions land straight in chat — no portals, no logins.",
    icon: "MessageCircle",
  },
  {
    title: "Approve & we print",
    description: "Once you're happy, production starts immediately — no extra handoff.",
    icon: "PackageCheck",
  },
];

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  turnaround: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "basic",
    name: "Basic",
    price: 1499,
    turnaround: "3–5 business days",
    tagline: "A single piece, done right.",
    features: ["1 initial concept", "1 round of revisions", "Print-ready file"],
  },
  {
    id: "standard",
    name: "Standard",
    price: 3999,
    turnaround: "2–3 business days",
    tagline: "For multi-piece sets & packaging.",
    features: ["3 initial concepts", "3 rounds of revisions", "Source files included", "Priority queue"],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 8999,
    turnaround: "24–48 hours",
    tagline: "Full brand exploration, senior designer.",
    features: [
      "Dedicated senior designer",
      "Unlimited revisions (within brief)",
      "Full brand exploration",
      "Rush turnaround included",
    ],
  },
];

export const STYLE_TAGS = ["Minimal", "Bold", "Playful", "Luxury"] as const;
export type StyleTag = (typeof STYLE_TAGS)[number];

export interface DesignerProfile {
  id: string;
  name: string;
  photo: string;
  specialties: string[];
  portfolioImage: string;
  bio: string;
}

export const DESIGNERS: DesignerProfile[] = [
  {
    id: "priya",
    name: "Priya Nataraj",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    specialties: ["Packaging", "Illustration"],
    portfolioImage:
      "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=500&q=80",
    bio: "Six years designing packaging for D2C food and beauty brands, with a soft spot for hand-drawn detail.",
  },
  {
    id: "arvind",
    name: "Arvind Menon",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    specialties: ["Branding", "Typography"],
    portfolioImage:
      "https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=500&q=80",
    bio: "Focused on identity systems — logo, type and the business card that actually gets kept.",
  },
  {
    id: "sana",
    name: "Sana Fernandes",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
    specialties: ["Labels", "Illustration"],
    portfolioImage:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=500&q=80",
    bio: "Loves a tight label layout — cosmetics, candles and small-batch goods are her regulars.",
  },
  {
    id: "dev",
    name: "Dev Kulkarni",
    photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=300&q=80",
    specialties: ["Signage", "Bold Graphics"],
    portfolioImage:
      "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=500&q=80",
    bio: "Ex-event production designer — banners and booth graphics that read from across the room.",
  },
];

/** Shown on the confirmation screen after a request is prepared. */
export const RESPONSE_TIME_HOURS = 2;

export const RUSH_FEE = 799;
export const RUSH_TURNAROUND = "Next business day";
