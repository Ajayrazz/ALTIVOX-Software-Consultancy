/**
 * DEMO product catalogue (all flagged isSample in the DB until replaced via /admin).
 * Prices are indicative starter prices, shown in INR and USD.
 */
export type SeedProduct = {
  slug: string; name: string; category: string; tagline: string; description: string;
  problem: string; audience: string; icon: string; accentFrom: string; accentTo: string;
  features: string[]; benefits: string[]; faqs: { q: string; a: string }[];
  priceINR: number | null; priceUSD: number | null;
  pricingModel: "ONE_TIME" | "MONTHLY" | "CUSTOM"; pricingNote?: string;
  purchaseAction: "BUY_NOW" | "DEMO" | "WHATSAPP" | "INSTAGRAM" | "CUSTOMIZATION";
  featured?: boolean;
};

export const productCategories = [
  { slug: "web-apps", name: "Web Applications" },
  { slug: "mobile-apps", name: "Mobile Apps" },
  { slug: "ai-tools", name: "AI Tools" },
  { slug: "saas", name: "SaaS" },
  { slug: "automation", name: "Automation" },
  { slug: "enterprise", name: "Enterprise" },
  { slug: "templates", name: "Templates & Kits" },
];

const supportFaq = {
  q: "Is support included?",
  a: "Yes. Every purchase includes setup help and 30 days of email/WhatsApp support. Extended maintenance plans are available on request.",
};
const customFaq = {
  q: "Can this be customised for my business?",
  a: "Absolutely. Branding, workflows, integrations and extra modules can be added. Share your requirements and we will send a fixed quote.",
};

export const products: SeedProduct[] = [
  {
    slug: "clinicdesk", name: "ClinicDesk", category: "web-apps", featured: true,
    tagline: "Run a clinic without the paperwork.",
    description: "A web-based clinic management system covering patient records, appointments, prescriptions, billing and daily reports in one clean dashboard.",
    problem: "Small clinics lose time and revenue to paper registers, missed follow-ups and manual billing.",
    audience: "Independent doctors, dental and physiotherapy clinics, small polyclinics.",
    icon: "stethoscope", accentFrom: "#3DD9EB", accentTo: "#3B6CFF",
    features: ["Patient profiles & visit history", "Appointment calendar with reminders", "Prescription templates & print", "Billing, invoices and payment tracking", "Role-based access for doctor / reception", "Daily and monthly reports"],
    benefits: ["Cut front-desk admin time", "Fewer missed follow-ups", "Searchable history in seconds"],
    faqs: [{ q: "Does it work on mobile?", a: "Yes, the interface is fully responsive and works on phones and tablets." }, { q: "Is patient data secure?", a: "Data is stored in an encrypted database with role-based access. You control who sees what." }, customFaq, supportFaq],
    priceINR: 14999, priceUSD: 179, pricingModel: "ONE_TIME", purchaseAction: "DEMO",
  },
  {
    slug: "schoolsync", name: "SchoolSync", category: "enterprise", featured: true,
    tagline: "Attendance, fees and results, in sync.",
    description: "A school management platform with student records, attendance, fee collection, timetables, report cards and a parent portal.",
    problem: "Schools juggle spreadsheets for attendance, fees and marks, and parents have no clear view of progress.",
    audience: "Schools, coaching institutes and training centres.",
    icon: "graduation-cap", accentFrom: "#7C5CFF", accentTo: "#3B6CFF",
    features: ["Student & staff management", "Daily attendance with parent alerts", "Fee schedules, receipts and dues", "Exam marks and printable report cards", "Timetable builder", "Parent & student portal"],
    benefits: ["One source of truth for the whole school", "Faster fee collection", "Parents stay informed"],
    faqs: [{ q: "How many students does it support?", a: "It is designed for institutions from tens to a few thousand students; larger deployments can be scaled on request." }, customFaq, supportFaq],
    priceINR: 19999, priceUSD: 239, pricingModel: "ONE_TIME", purchaseAction: "WHATSAPP",
  },
  {
    slug: "shopkit", name: "ShopKit", category: "web-apps", featured: true,
    tagline: "Launch your online store this week.",
    description: "A ready-to-launch e-commerce storefront with catalogue, cart, checkout, inventory and order management built for small Indian businesses.",
    problem: "Selling only through DMs and calls caps growth and makes order tracking messy.",
    audience: "Boutiques, home brands, D2C sellers and local retailers.",
    icon: "shopping-bag", accentFrom: "#3B6CFF", accentTo: "#7C5CFF",
    features: ["Product catalogue with variants", "Cart and checkout", "Inventory and low-stock alerts", "Order status and invoices", "Coupons and discounts", "Payment gateway ready (Razorpay / Stripe)"],
    benefits: ["Your own storefront, your own brand", "No per-order platform fees", "Simple admin for non-technical owners"],
    faqs: [{ q: "Which payment gateways work?", a: "The checkout is built to plug into Razorpay or Stripe. Integration is included with a paid setup." }, customFaq, supportFaq],
    priceINR: 9999, priceUSD: 119, pricingModel: "ONE_TIME", purchaseAction: "BUY_NOW",
  },
  {
    slug: "invoiceflow", name: "InvoiceFlow", category: "saas", featured: true,
    tagline: "GST-ready invoicing in under a minute.",
    description: "A lightweight invoicing and billing SaaS with GST-compliant invoices, customer ledgers, recurring bills and payment reminders.",
    problem: "Freelancers and small businesses waste hours building invoices and chasing payments.",
    audience: "Freelancers, agencies, shopkeepers and service businesses.",
    icon: "receipt", accentFrom: "#3DD9EB", accentTo: "#7C5CFF",
    features: ["GST invoices & PDF export", "Customer and item library", "Recurring invoices", "Payment reminders", "Expense tracking", "Monthly sales summary"],
    benefits: ["Look professional instantly", "Get paid faster", "Stay tax-ready"],
    faqs: [{ q: "Is there a free trial?", a: "Request a demo and we will give you trial access." }, { q: "Can I cancel anytime?", a: "Yes. Monthly plans can be cancelled at any time." }, supportFaq],
    priceINR: 499, priceUSD: 6, pricingModel: "MONTHLY", pricingNote: "per month", purchaseAction: "BUY_NOW",
  },
  {
    slug: "leadpilot", name: "LeadPilot", category: "saas",
    tagline: "A CRM that actually gets used.",
    description: "A simple sales CRM with pipelines, follow-up reminders, lead capture forms and WhatsApp click-to-chat, designed for small sales teams.",
    problem: "Leads from Instagram, calls and forms get lost across chats and notebooks.",
    audience: "Small sales teams, agencies, real-estate and education counsellors.",
    icon: "target", accentFrom: "#7C5CFF", accentTo: "#3DD9EB",
    features: ["Kanban sales pipeline", "Lead capture forms", "Follow-up reminders", "WhatsApp click-to-chat", "Team assignment", "Conversion reports"],
    benefits: ["No lead falls through the cracks", "Clear view of the pipeline", "Quick team onboarding"],
    faqs: [{ q: "Can I import existing leads?", a: "Yes, CSV import is supported." }, customFaq, supportFaq],
    priceINR: 799, priceUSD: 9, pricingModel: "MONTHLY", pricingNote: "per month, up to 3 users", purchaseAction: "DEMO",
  },
  {
    slug: "chatdesk-ai", name: "ChatDesk AI", category: "ai-tools", featured: true,
    tagline: "An AI assistant trained on your business.",
    description: "A customer-support chatbot that answers questions from your own documents and FAQs, hands off to a human when needed and embeds on any website.",
    problem: "Support teams answer the same questions repeatedly, and customers wait for replies outside office hours.",
    audience: "E-commerce stores, service businesses, SaaS and education providers.",
    icon: "bot", accentFrom: "#3B6CFF", accentTo: "#3DD9EB",
    features: ["Answers from your documents & FAQs", "Embeddable website widget", "Human hand-off with transcript", "Conversation inbox", "Multi-language replies", "Usage and topic analytics"],
    benefits: ["24/7 first response", "Lower support load", "Consistent answers"],
    faqs: [{ q: "Which AI models does it use?", a: "It uses leading LLM APIs. The provider can be chosen to fit your budget and privacy needs." }, { q: "Will it make things up?", a: "Answers are grounded in your supplied content and it falls back to a human when unsure." }, customFaq],
    priceINR: 1499, priceUSD: 18, pricingModel: "MONTHLY", pricingNote: "per month plus AI usage", purchaseAction: "DEMO",
  },
  {
    slug: "fleettrack", name: "FleetTrack", category: "enterprise",
    tagline: "Know where every delivery is.",
    description: "A logistics and fleet dashboard for tracking vehicles, assigning trips, recording proof of delivery and monitoring costs.",
    problem: "Dispatchers rely on phone calls to locate vehicles and confirm deliveries.",
    audience: "Transport operators, courier businesses and distributors.",
    icon: "truck", accentFrom: "#3DD9EB", accentTo: "#3B6CFF",
    features: ["Live vehicle map", "Trip & driver assignment", "Proof of delivery with photo", "Fuel and expense logs", "Delivery status notifications", "Route and cost reports"],
    benefits: ["Fewer 'where is it?' calls", "Visible delivery performance", "Control over fleet costs"],
    faqs: [{ q: "What hardware is needed?", a: "Drivers can use the companion mobile app; GPS devices can be integrated on request." }, customFaq, supportFaq],
    priceINR: 24999, priceUSD: 299, pricingModel: "ONE_TIME", purchaseAction: "CUSTOMIZATION",
  },
  {
    slug: "estatehub", name: "EstateHub", category: "web-apps",
    tagline: "Your property listings, beautifully presented.",
    description: "A real-estate listing portal with searchable properties, galleries, enquiry capture and an agent dashboard.",
    problem: "Agents share listings through scattered chats and PDFs that are hard to search or update.",
    audience: "Real-estate agents, brokers and property developers.",
    icon: "building-2", accentFrom: "#7C5CFF", accentTo: "#3B6CFF",
    features: ["Property listings with galleries", "Search by price, type and location", "Enquiry capture per property", "Agent dashboard", "Featured listings", "SEO-friendly pages"],
    benefits: ["Own your lead flow", "Listings always up to date", "Professional online presence"],
    faqs: [customFaq, supportFaq],
    priceINR: 17999, priceUSD: 215, pricingModel: "ONE_TIME", purchaseAction: "WHATSAPP",
  },
  {
    slug: "booknest", name: "BookNest", category: "web-apps",
    tagline: "Let customers book you 24/7.",
    description: "An appointment-booking system with services, staff calendars, slot management, reminders and online payment readiness.",
    problem: "Back-and-forth messages to fix appointment times cost time and cause no-shows.",
    audience: "Salons, consultants, trainers, tutors and clinics.",
    icon: "calendar-check", accentFrom: "#3B6CFF", accentTo: "#3DD9EB",
    features: ["Service and staff setup", "Live slot availability", "Email/WhatsApp reminders", "Reschedule & cancel links", "Booking dashboard", "Embeddable booking page"],
    benefits: ["Fewer no-shows", "Zero scheduling chatter", "Bookings while you sleep"],
    faqs: [customFaq, supportFaq],
    priceINR: 6999, priceUSD: 85, pricingModel: "ONE_TIME", purchaseAction: "BUY_NOW",
  },
  {
    slug: "autoflow", name: "AutoFlow", category: "automation", featured: true,
    tagline: "Automate the repetitive work.",
    description: "Custom business automations connecting forms, spreadsheets, WhatsApp, email and your existing tools, so routine tasks run themselves.",
    problem: "Teams copy data between tools by hand, causing delays and errors.",
    audience: "Operations teams, agencies, small businesses and e-commerce sellers.",
    icon: "workflow", accentFrom: "#7C5CFF", accentTo: "#3DD9EB",
    features: ["Form-to-sheet and CRM sync", "Automated notifications & reports", "Invoice and document generation", "Approval workflows", "API integrations", "Error alerts and logs"],
    benefits: ["Hours saved every week", "Fewer manual errors", "Processes that scale"],
    faqs: [{ q: "How is it priced?", a: "Starter automations begin at the listed price. Complex multi-tool workflows are quoted after a short discovery call." }, customFaq],
    priceINR: 4999, priceUSD: 59, pricingModel: "ONE_TIME", pricingNote: "starting from", purchaseAction: "CUSTOMIZATION",
  },
  {
    slug: "appstarter", name: "AppStarter Kit", category: "mobile-apps",
    tagline: "A mobile app foundation, ready to brand.",
    description: "A React Native (Expo) starter with authentication, onboarding, navigation, push notifications and a clean UI kit for iOS and Android.",
    problem: "Building login, navigation and notifications from scratch delays every new mobile app.",
    audience: "Startups, freelancers and agencies building mobile apps.",
    icon: "smartphone", accentFrom: "#3DD9EB", accentTo: "#7C5CFF",
    features: ["Auth & onboarding screens", "Tab and stack navigation", "Push notification setup", "Reusable UI components", "API client with error handling", "Dark and light themes"],
    benefits: ["Weeks of setup saved", "Clean, typed codebase", "iOS and Android from one code base"],
    faqs: [{ q: "What do I receive?", a: "Full source code, documentation and setup support." }, customFaq],
    priceINR: 7999, priceUSD: 95, pricingModel: "ONE_TIME", purchaseAction: "BUY_NOW",
  },
  {
    slug: "sitelaunch", name: "SiteLaunch Templates", category: "templates",
    tagline: "A professional website in a day.",
    description: "A set of fast, SEO-ready business website templates with contact forms, WhatsApp integration and easy content editing.",
    problem: "Small businesses need a credible website quickly without agency-level budgets.",
    audience: "Local businesses, consultants, restaurants and freelancers.",
    icon: "layout-template", accentFrom: "#3B6CFF", accentTo: "#7C5CFF",
    features: ["Multiple page templates", "Contact form + WhatsApp button", "SEO metadata ready", "Fast, mobile-first design", "Easy content editing", "Free tier hosting friendly"],
    benefits: ["Launch in a day", "Low cost", "Looks like a custom build"],
    faqs: [{ q: "Can you set it up for me?", a: "Yes, setup and branding service is available as an add-on." }, supportFaq],
    priceINR: 2999, priceUSD: 35, pricingModel: "ONE_TIME", purchaseAction: "INSTAGRAM",
  },
];
