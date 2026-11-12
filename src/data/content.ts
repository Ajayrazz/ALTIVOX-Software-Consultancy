/** SAMPLE case studies: clearly labelled demonstrations, not real clients. Replace via /admin. */
export const projects = [
  { slug: "sample-clinic-platform", title: "Multi-branch Clinic Platform", client: "Sample Client (Demo)", category: "WEB" as const,
    summary: "A unified patient, appointment and billing platform for a multi-branch clinic group.",
    problem: "Each branch kept separate registers, making reporting and patient continuity difficult.",
    solution: "A central web platform with branch-level access, shared patient history, automated reminders and consolidated billing reports.",
    tech: ["Next.js", "PostgreSQL", "Resend"], features: ["Shared patient records", "Appointment reminders", "Branch-wise reports"],
    accentFrom: "#3DD9EB", accentTo: "#3B6CFF" },
  { slug: "sample-delivery-app", title: "Last-mile Delivery App", client: "Sample Client (Demo)", category: "MOBILE" as const,
    summary: "Driver and dispatcher apps for tracking deliveries with proof of delivery.",
    problem: "Dispatchers had no live view of deliveries and relied on phone calls.",
    solution: "A React Native driver app with trip assignment and photo proof, plus a dispatcher dashboard with live status.",
    tech: ["React Native", "Expo", "Node.js", "PostgreSQL"], features: ["Live trip status", "Photo proof of delivery", "Dispatcher dashboard"],
    accentFrom: "#7C5CFF", accentTo: "#3B6CFF" },
  { slug: "sample-support-assistant", title: "AI Support Assistant", client: "Sample Client (Demo)", category: "AI" as const,
    summary: "A retrieval-based assistant answering customer questions from product documentation.",
    problem: "Support staff spent most of their time answering repeat questions.",
    solution: "An LLM assistant grounded in the client's documents, with confidence thresholds and human hand-off.",
    tech: ["Python", "LLM APIs", "Vector search", "Next.js"], features: ["Document-grounded answers", "Human hand-off", "Topic analytics"],
    accentFrom: "#3B6CFF", accentTo: "#3DD9EB" },
  { slug: "sample-invoicing-saas", title: "Subscription Invoicing SaaS", client: "Sample Client (Demo)", category: "SAAS" as const,
    summary: "A multi-tenant invoicing product with recurring billing and reminders.",
    problem: "Founders needed an MVP to validate demand for a niche billing tool.",
    solution: "A focused multi-tenant MVP with auth, recurring invoices and payment reminders, built to evolve with user feedback.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"], features: ["Multi-tenant accounts", "Recurring invoices", "Reminder emails"],
    accentFrom: "#3DD9EB", accentTo: "#7C5CFF" },
  { slug: "sample-ops-automation", title: "Order-to-Invoice Automation", client: "Sample Client (Demo)", category: "AUTOMATION" as const,
    summary: "Automated flow from online orders to invoices, stock updates and customer notifications.",
    problem: "Staff re-entered each order into three systems.",
    solution: "Webhook-driven automation that syncs orders, generates invoices and notifies customers automatically.",
    tech: ["Node.js", "Webhooks", "Google Sheets API"], features: ["Order sync", "Auto invoices", "Customer notifications"],
    accentFrom: "#7C5CFF", accentTo: "#3DD9EB" },
  { slug: "sample-school-erp", title: "School Management System", client: "Sample Client (Demo)", category: "ENTERPRISE" as const,
    summary: "An end-to-end platform for attendance, fees, results and parent communication.",
    problem: "Records lived in spreadsheets and paper registers across departments.",
    solution: "A role-based system with attendance, fee collection, report cards and a parent portal.",
    tech: ["React", "Node.js", "PostgreSQL"], features: ["Role-based access", "Fee management", "Parent portal"],
    accentFrom: "#3B6CFF", accentTo: "#7C5CFF" },
];

export const posts = [
  { slug: "how-to-scope-a-software-project", title: "How to scope a software project without a technical background", category: "Business Technology", readMinutes: 5,
    excerpt: "A plain-language checklist for turning a business problem into a clear brief any developer can quote on.",
    content: `## Start with the problem, not the features

Write down what is going wrong today and what a good outcome looks like. "We lose leads" is a better starting point than "we need a CRM".

## Describe your users

Who will use the software every day? Staff, customers, partners? Each group has different needs.

## List must-haves and nice-to-haves

A short must-have list keeps cost and timeline under control. Everything else can follow in a second release.

## Share your constraints

Budget range, deadline and any tools that must integrate (payments, WhatsApp, accounting) shape the right solution.

## Ask for a phased plan

A good partner will propose a small first release so you can learn from real usage before investing further.` },
  { slug: "practical-ai-for-small-businesses", title: "Practical AI for small businesses: where to start", category: "AI & Automation", readMinutes: 6,
    excerpt: "Skip the hype. These are the everyday tasks where AI assistants already save real time.",
    content: `## Customer support first-response

A chatbot grounded in your own FAQs can answer routine questions instantly and hand complex ones to a person.

## Document and data entry

Extracting fields from invoices, forms and emails removes hours of copy-paste.

## Drafting and summarising

Draft replies, summarise long threads and prepare reports, with a human reviewing the output.

## What to avoid

Don't automate decisions that carry legal, financial or safety risk without review. Start small, measure results and expand.` },
  { slug: "nextjs-vs-wordpress-for-business-sites", title: "Next.js or WordPress for your business website?", category: "Software Development", readMinutes: 5,
    excerpt: "Both work. Here is how to pick based on speed, flexibility and who will maintain the site.",
    content: `## Choose WordPress when

You need a content-heavy site quickly, rely on existing plugins and have no custom workflows.

## Choose Next.js when

Performance, custom features, integrations or a product-like experience matter. It pairs well with a database and an admin panel.

## Consider maintenance

Plugins need updates in WordPress; custom code needs a developer. Decide who will look after the site long term.` },
  { slug: "what-an-mvp-should-include", title: "What an MVP should (and shouldn't) include", category: "Startups", readMinutes: 4,
    excerpt: "A minimum viable product is about learning fast. Here is how to keep the scope honest.",
    content: `## One core job

Pick the single problem your product must solve extremely well.

## Cut the rest

Roles, reports, settings and integrations can usually wait.

## Measure from day one

Add basic analytics so you know what users actually do, and let that data steer version two.` },
];

export const siteFaqs = [
  { q: "What services does Altivox offer?", a: "Custom software, websites and web apps, mobile apps, AI and automation, SaaS development, API integration, cloud/DevOps, UI/UX design and technology consulting." },
  { q: "How long does a project take?", a: "A simple website can take 1–3 weeks; a custom web or mobile app typically 6–16 weeks depending on scope. We give a realistic timeline after discovery." },
  { q: "How is pricing decided?", a: "Fixed-scope projects get a fixed quote. Ongoing or evolving work can be time-and-materials. Ready-made products list their price on the product page." },
  { q: "What do you need from me to start?", a: "A short description of the problem, your goals, rough budget and timeline. Our quote form guides you through it." },
  { q: "Do you provide maintenance and support?", a: "Yes. Every project includes a support window, and ongoing maintenance plans cover updates, monitoring and improvements." },
  { q: "Which technologies do you use?", a: "Mainly React, Next.js, TypeScript, Node.js, Python, PostgreSQL, React Native, Docker and cloud platforms such as Vercel and AWS." },
  { q: "How do I buy one of your software products?", a: "Each product page shows how to buy: online checkout, a demo request, WhatsApp or an Instagram message." },
  { q: "Can products be customised?", a: "Yes. Branding, features and integrations can be tailored. Use the customisation option on the product page." },
];
