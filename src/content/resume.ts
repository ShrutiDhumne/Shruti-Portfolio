/**
 * Single source of truth for every piece of résumé content on the site.
 * Sections read from here; nothing hard-codes copy in JSX.
 *
 * THE RULE: nothing appears here that the résumé does not support. Every skill,
 * number, date and technology below is either in the résumé's Skills section or
 * named explicitly in one of its experience bullets. If it isn't, it doesn't go
 * on the page — an invented line is one she'd have to defend in an interview.
 *
 * The phone number is deliberately absent: removed at her request.
 */

export const profile = {
  name: "Shruti Dhumne",
  role: "AI & Backend Developer",
  location: "Pune, India",
  email: "shrutidhumne29@gmail.com",
  linkedin: "https://www.linkedin.com/in/shruti-dhumne",
  linkedinLabel: "linkedin.com/in/shruti-dhumne",
  summary:
    "Backend & AI Engineer with experience building scalable backend systems and intelligent workflows. 3 years of experience delivering AI-powered tools, agent-based platforms, and automation pipelines for product and enterprise teams.",
  availability: "Seeking challenging roles to build high-impact systems at scale",
};

/** Headline figures. Each one is stated verbatim in the résumé. */
export const facts = [
  { value: "3", suffix: "yrs", label: "Building production systems" },
  { value: "150", suffix: "+", label: "Automation workflows deployed" },
  { value: "20", suffix: "+", label: "AI voice agents in production" },
  { value: "9.64", suffix: "", label: "B.Tech CGPA" },
];

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  skills: { name: string; note?: string }[];
};

/**
 * The résumé's own four categories, in its own order. The extra entries in each
 * group are technologies the résumé names explicitly in an experience bullet
 * (Sora 2, ElevenLabs, XGBoost, Stripe webhooks, and so on) — nothing invented.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Programming Languages",
    blurb: "What I think in.",
    skills: [{ name: "Python", note: "primary" }, { name: "JavaScript" }, { name: "SQL" }],
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    blurb: "APIs, services, and the plumbing between them.",
    skills: [
      { name: "FastAPI", note: "primary" },
      { name: "Django" },
      { name: "Django REST" },
      { name: "Flask" },
      { name: "React" },
      { name: "Angular" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    blurb: "Shipping it, and keeping it up.",
    skills: [{ name: "Docker" }, { name: "Git" }, { name: "Nginx" }],
  },
  {
    id: "ai",
    title: "AI / ML & Automation",
    blurb: "Models in production, not notebooks.",
    skills: [
      { name: "LLM pipelines", note: "primary" },
      { name: "AI agents" },
      { name: "OpenAI APIs" },
      { name: "OpenAI Sora 2" },
      { name: "OpenRouter" },
      { name: "ElevenLabs" },
      { name: "Pydantic" },
      { name: "XGBoost" },
      { name: "KNN" },
      { name: "Machine Learning" },
      { name: "Vapi.ai" },
      { name: "Make.com" },
    ],
  },
  {
    id: "data",
    title: "Data & Integrations",
    blurb: "Where the state actually lives.",
    skills: [
      { name: "Supabase" },
      { name: "Stripe webhooks" },
      { name: "Facebook Marketing API" },
      { name: "Airtable" },
      { name: "Google Sheets" },
      { name: "Web scraping" },
      { name: "Proxy rotation" },
      { name: "CAPTCHA avoidance" },
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  company: string;
  period: string;
  kicker: string;
  summary: string;
  impact: { metric: string; label: string }[];
  stack: string[];
};

export const projects: Project[] = [
  {
    id: "radar",
    name: "Radar",
    company: "Etherwise",
    period: "Dec 2024 — Present",
    kicker: "Ad tracking & attribution platform",
    summary:
      "A self-hosted ad tracking and attribution platform, similar to Hyros. Visitor tracking, conversion mapping, multi-project funnel analytics, identity resolution and real-time dashboard APIs — plus a custom tracker.js capturing events, UTM parameters and funnel activity across landing and order pages.",
    impact: [
      { metric: "Self-hosted", label: "You own the data" },
      { metric: "High-volume", label: "Event ingestion pipelines" },
      { metric: "Real-time", label: "Dashboard APIs" },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Supabase",
      "Stripe webhooks",
      "Facebook Marketing API",
      "JavaScript",
    ],
  },
  {
    id: "automatic-ads",
    name: "Automatic Ads",
    company: "Etherwise",
    period: "Dec 2024 — Present",
    kicker: "AI video ad generation, end to end",
    summary:
      "An AI system that generates video ads end-to-end from business context — automating script creation, AI video rendering and final assembly through a multi-stage asynchronous pipeline.",
    impact: [
      { metric: "100+", label: "Concurrent video workflows" },
      { metric: "End-to-end", label: "Script → render → assembly" },
      { metric: "Fault-tolerant", label: "State, with recovery handling" },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Supabase",
      "OpenAI Sora 2",
      "OpenRouter",
      "ElevenLabs",
      "Pydantic",
    ],
  },
  {
    id: "voice-agents",
    name: "AI Voice Agents",
    company: "Etherwise",
    period: "Dec 2024 — Present",
    kicker: "20+ agents in production",
    summary:
      "Custom AI voice agents built and managed on Vapi.ai for appointment booking, lead qualification and customer support — improving lead conversion through integrated voice-driven workflows.",
    impact: [
      { metric: "20+", label: "Custom agents built and managed" },
      { metric: "Improved", label: "Lead conversion rates" },
      { metric: "3 use cases", label: "Booking, qualification, support" },
    ],
    stack: ["Vapi.ai", "OpenAI APIs", "Python"],
  },
  {
    id: "automations",
    name: "Automation Workflows",
    company: "Etherwise",
    period: "Dec 2024 — Present",
    kicker: "150+ workflows deployed",
    summary:
      "Automation workflows on Make.com integrating Airtable, Google Sheets, CRMs and OpenAI — streamlining operations and cutting manual effort out of the day.",
    impact: [
      { metric: "150+", label: "Workflows deployed" },
      { metric: "Integrated", label: "Airtable, Sheets, CRMs, OpenAI" },
      { metric: "Reduced", label: "Manual operational effort" },
    ],
    stack: ["Make.com", "Airtable", "Google Sheets", "OpenAI APIs", "CRMs"],
  },
  {
    id: "scrapers",
    name: "Web Scraping Systems",
    company: "Etherwise",
    period: "Dec 2024 — Present",
    kicker: "Large-scale product data extraction",
    summary:
      "Robust scrapers for high-traffic platforms including Amazon, REI and Backcountry, with proxy rotation, session handling, CAPTCHA avoidance and data normalization pipelines — extracting product data reliably, at scale.",
    impact: [
      { metric: "Large-scale", label: "Product data, extracted reliably" },
      { metric: "Amazon · REI", label: "Backcountry, and others" },
      { metric: "Normalized", label: "Data pipelines, one clean schema" },
    ],
    stack: ["Python", "Proxy rotation", "Session handling", "CAPTCHA avoidance"],
  },

  /* ── Veritas ── */
  {
    id: "suite-recommender",
    name: "AI Suite Recommender",
    company: "Veritas Technologies",
    period: "Jul 2023 — Nov 2024",
    kicker: "Predicting test failures before they happen",
    summary:
      "An AI system predicting which test suites are likely to fail on a new pull request. It reads filenames, commit messages, lines changed and files modified, and an XGBoost classifier does the rest — so developers test the suites most likely to break, first.",
    impact: [
      { metric: "87%", label: "Suite prediction accuracy" },
      { metric: "−28%", label: "Daily test failure rate" },
    ],
    stack: ["Python", "XGBoost", "Machine Learning"],
  },
  {
    id: "etrack",
    name: "E-Track Recommender System",
    company: "Veritas Technologies",
    period: "Jul 2023 — Nov 2024",
    kicker: "Automated defect mapping",
    summary:
      "An automated defect mapping tool inside the E-Track platform. It extracts failure signatures from logs, detects recurring issues with KNN and MD5, and recommends the defect to map against — eliminating the manual hunt entirely.",
    impact: [
      { metric: "89%", label: "Issue identification accuracy" },
      { metric: "KNN + MD5", label: "Failure-signature matching" },
    ],
    stack: ["Python", "KNN", "MD5", "Log parsing"],
  },
  {
    id: "car-reporting",
    name: "Consolidated CAR Reporting",
    company: "Veritas Technologies",
    period: "Jul 2023 — Nov 2024",
    kicker: "8–10 daily emails → one report",
    summary:
      "A Consolidated Continuous Automation Regression reporting system unifying reporting across multiple products and releases — eliminating 8–10 separate daily emails and streamlining the release team's review. Dockerized front and back, deployed on Nginx.",
    impact: [
      { metric: "8–10 → 1", label: "Daily reports consolidated" },
      { metric: "Dockerized", label: "Deployed behind Nginx" },
    ],
    stack: ["Django REST", "Angular", "ORM", "SQL", "Docker", "Nginx"],
  },
  {
    id: "car-portal",
    name: "CAR Portal Rebuild",
    company: "Veritas Technologies",
    period: "Jul 2023 — Nov 2024",
    kicker: "Rebuilt from the ground up",
    summary:
      "The Continuous Automation Regression portal, rebuilt from scratch on Django and Angular — better scalability, support for multiple products, and the data analysis and reporting the old one was missing.",
    impact: [
      { metric: "Multi-product", label: "Support integrated" },
      { metric: "Ground-up", label: "Rebuild for scalability" },
    ],
    stack: ["Django", "Angular", "SQL"],
  },
];

export type Role = {
  id: string;
  company: string;
  title: string;
  period: string;
  current: boolean;
  blurb: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    id: "etherwise",
    company: "Etherwise",
    title: "AI & Backend Developer",
    period: "Dec 2024 — Present",
    current: true,
    blurb:
      "Building AI-powered products end to end — an ad attribution platform, a generative video pipeline, voice agents and automation at volume — and working directly with clients to turn business requirements into systems.",
    highlights: [
      "Built Radar, a self-hosted ad tracking and attribution platform, and Automatic Ads, an end-to-end AI video ad generator.",
      "Built and managed 20+ custom AI voice agents on Vapi.ai for appointment booking, lead qualification and customer support.",
      "Developed and deployed 150+ automation workflows on Make.com, integrating Airtable, Google Sheets, CRMs and OpenAI.",
      "Built robust web scrapers for Amazon, REI and Backcountry with proxy rotation, session handling and CAPTCHA avoidance.",
      "Worked directly with clients to translate business requirements into technical solutions, coordinating development tasks and guiding junior engineers to ensure on-time delivery.",
    ],
  },
  {
    id: "veritas",
    company: "Veritas Technologies LLC",
    title: "Associate Software Engineer",
    period: "Jul 2023 — Nov 2024",
    current: false,
    blurb:
      "Applied machine learning to developer productivity, and rebuilt the reporting infrastructure the release team depended on every day.",
    highlights: [
      "Architected an XGBoost system predicting which test suites a pull request would break — 87% accuracy, cutting the daily test failure rate by 28%.",
      "Built an automated defect mapping tool on KNN and MD5 failure signatures, reaching 89% accuracy in issue identification.",
      "Spearheaded the Consolidated CAR Reporting System (Django REST, Angular, ORM, SQL), replacing 8–10 daily emails with one unified report.",
      "Rebuilt the CAR Portal from the ground up on Django and Angular, adding multi-product support and better analysis and reporting.",
    ],
  },
];

export type Education = {
  id: string;
  institution: string;
  qualification: string;
  field: string;
  period: string;
  score: string;
  scoreLabel: string;
};

export const education: Education[] = [
  {
    id: "btech",
    institution: "MIT Academy of Engineering, Pune",
    qualification: "Bachelor of Technology",
    field: "Computer Engineering",
    period: "2020 — 2023",
    score: "9.64",
    scoreLabel: "CGPA",
  },
  {
    id: "diploma",
    institution: "Government Polytechnic, Ahmednagar",
    qualification: "Diploma",
    field: "Computer Technology",
    period: "2017 — 2020",
    score: "92.46%",
    scoreLabel: "Percentage",
  },
];

export type Achievement = {
  id: string;
  title: string;
  placement: string;
  date: string;
  note: string;
};

export const achievements: Achievement[] = [
  {
    id: "sih",
    title: "Smart India Hackathon",
    placement: "1st",
    date: "August 2022",
    note: "First position — the national-level hackathon run by the Government of India.",
  },
  {
    id: "datathon",
    title: "Datathon",
    placement: "1st",
    date: "March 2022",
    note: "First position in a competitive data science and modelling contest.",
  },
];
