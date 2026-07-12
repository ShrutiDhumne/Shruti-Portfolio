/**
 * Single source of truth for every piece of résumé content on the site.
 * Sections read from here; nothing hard-codes copy in JSX.
 */

export const profile = {
  name: "Shruti Dhumne",
  role: "AI & Backend Developer",
  tagline: "I build the systems behind the systems.",
  location: "Pune, India",
  email: "shrutidhumne29@gmail.com",
  linkedin: "https://www.linkedin.com/in/shruti-dhumne",
  linkedinLabel: "linkedin.com/in/shruti-dhumne",
  summary:
    "Backend & AI engineer with 3 years of experience building scalable backend systems and intelligent workflows — AI-powered tools, agent-based platforms, and automation pipelines for product and enterprise teams.",
  longSummary: [
    "I work at the layer most people never see: the ingestion pipelines, the attribution graphs, the async orchestrators, the retry logic that decides whether a product feels reliable or feels broken.",
    "For the last two years that's meant AI systems in production — LLM pipelines that have to return structured data every time, video generation workflows that run 100+ jobs concurrently without eating themselves, and voice agents that book real appointments for real businesses.",
    "Before that, at Veritas, it meant machine learning applied to the unglamorous problem of a test suite that takes all night: predicting which suites would fail before anyone ran them, and cutting the daily failure rate by 28%.",
  ],
  availability: "Open to backend & AI engineering roles",
};

export const stats = [
  { value: 3, suffix: "+", label: "Years building production systems" },
  { value: 150, suffix: "+", label: "Automation workflows shipped" },
  { value: 20, suffix: "+", label: "AI voice agents deployed" },
  { value: 9.64, suffix: "", label: "B.Tech CGPA", decimals: 2 },
];

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  skills: { name: string; note?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    blurb: "What I think in.",
    skills: [
      { name: "Python", note: "primary" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "SQL" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Frameworks",
    blurb: "APIs, services, and the plumbing between them.",
    skills: [
      { name: "FastAPI", note: "primary" },
      { name: "Django" },
      { name: "Django REST" },
      { name: "Flask" },
      { name: "REST APIs" },
      { name: "Webhooks" },
      { name: "Async / concurrency" },
    ],
  },
  {
    id: "ai",
    title: "AI & ML",
    blurb: "Models in production, not notebooks.",
    skills: [
      { name: "LLM pipelines", note: "primary" },
      { name: "AI agents" },
      { name: "OpenAI APIs" },
      { name: "OpenRouter" },
      { name: "Sora 2" },
      { name: "ElevenLabs" },
      { name: "Pydantic" },
      { name: "XGBoost" },
      { name: "KNN" },
      { name: "Machine Learning" },
    ],
  },
  {
    id: "data",
    title: "Data & Infrastructure",
    blurb: "Where the state actually lives.",
    skills: [
      { name: "Supabase" },
      { name: "PostgreSQL" },
      { name: "Docker" },
      { name: "Nginx" },
      { name: "Git" },
      { name: "Stripe webhooks" },
      { name: "Facebook Marketing API" },
    ],
  },
  {
    id: "automation",
    title: "Automation & Agents",
    blurb: "Work that runs itself.",
    skills: [
      { name: "Vapi.ai" },
      { name: "Make.com" },
      { name: "Airtable" },
      { name: "Web scraping" },
      { name: "Proxy rotation" },
      { name: "CRM integrations" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Enough to ship the whole thing myself.",
    skills: [
      { name: "React" },
      { name: "Angular" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
    ],
  },
];

/**
 * The stack ledger. Not a proficiency bar — a bar says "React 70%", which is a
 * claim nobody can check. This says where each thing was actually shipped, which
 * is a claim you can be asked about in an interview. Provenance beats percentage.
 *
 * Every entry here must be traceable to a project below. No exceptions.
 */
export type LedgerRow = { name: string; where: string[] };
export type LedgerGroup = { group: string; rows: LedgerRow[] };

export const ledger: LedgerGroup[] = [
  {
    group: "language",
    rows: [
      { name: "python", where: ["radar", "automatic-ads", "scrapers", "suite-recommender"] },
      { name: "javascript", where: ["radar/tracker.js"] },
      { name: "sql", where: ["car-reporting", "car-portal"] },
    ],
  },
  {
    group: "framework",
    rows: [
      { name: "fastapi", where: ["radar", "automatic-ads"] },
      { name: "django", where: ["car-portal", "car-reporting"] },
      { name: "django rest", where: ["car-reporting"] },
      { name: "flask", where: ["veritas"] },
      { name: "react", where: ["dashboards"] },
      { name: "angular", where: ["car-reporting", "car-portal"] },
    ],
  },
  {
    group: "infra",
    rows: [
      { name: "supabase", where: ["radar", "automatic-ads"] },
      { name: "docker", where: ["car-reporting"] },
      { name: "nginx", where: ["car-reporting"] },
      { name: "stripe webhooks", where: ["radar"] },
      { name: "facebook marketing api", where: ["radar"] },
      { name: "git", where: ["everywhere"] },
    ],
  },
  {
    group: "ai",
    rows: [
      { name: "openai", where: ["automatic-ads", "voice-agents", "automations"] },
      { name: "sora 2", where: ["automatic-ads"] },
      { name: "openrouter", where: ["automatic-ads"] },
      { name: "elevenlabs", where: ["automatic-ads"] },
      { name: "pydantic", where: ["automatic-ads"] },
      { name: "xgboost", where: ["suite-recommender"] },
      { name: "knn · md5", where: ["etrack"] },
      { name: "vapi.ai", where: ["voice-agents — 20+ agents"] },
      { name: "make.com", where: ["automations — 150+ workflows"] },
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
  problem: string;
  approach: string[];
  impact: { metric: string; label: string }[];
  stack: string[];
  tags: string[];
  featured: boolean;
  link?: { href: string; label: string };
  /** Drives the per-project ambient visual. */
  motif: "attribution" | "pipeline" | "voice" | "automation" | "scraper" | "ml" | "graph" | "report";
};

export const projects: Project[] = [
  {
    id: "radar",
    name: "Radar",
    company: "Etherwise",
    period: "Dec 2024 — Present",
    kicker: "Ad tracking & attribution platform",
    summary:
      "A self-hosted ad tracking and attribution platform in the mould of Hyros — following a visitor from first ad click through to paid conversion, across projects, funnels and devices.",
    problem:
      "Marketing teams spend six figures on ads and still can't say which click paid for which sale. Off-the-shelf attribution is a black box you rent; Radar is one you own.",
    approach: [
      "Built the backend on FastAPI + Supabase: visitor tracking, conversion mapping, multi-project funnel analytics and identity resolution.",
      "Wrote a custom tracker.js that captures user events, UTM parameters and funnel activity across landing and order pages.",
      "Designed event ingestion pipelines and webhook-driven tracking built for high-volume marketing funnels.",
      "Integrated Stripe webhooks and the Facebook Marketing API to close the loop from ad spend to revenue.",
      "Shipped real-time dashboard APIs so the numbers move while you watch them.",
    ],
    impact: [
      { metric: "1:1", label: "Click → conversion mapping" },
      { metric: "Self-hosted", label: "You own the data" },
      { metric: "Real-time", label: "Dashboard APIs" },
    ],
    stack: ["Python", "FastAPI", "Supabase", "Stripe", "Facebook Marketing API", "JavaScript"],
    tags: ["Attribution", "Event ingestion", "Identity resolution"],
    featured: true,
    motif: "attribution",
  },
  {
    id: "automatic-ads",
    name: "Automatic Ads",
    company: "Etherwise",
    period: "Dec 2024 — Present",
    kicker: "AI video ad generation, end to end",
    summary:
      "Give it your business context; it writes the script, renders the video with AI, generates the voice, and assembles the final ad. No human in the loop.",
    problem:
      "A video ad is a dozen sequential creative steps, each one slow and each one able to fail. The hard part isn't calling a model — it's orchestrating many of them, concurrently, without the whole thing collapsing when step 7 of 9 times out.",
    approach: [
      "Architected a multi-stage asynchronous pipeline on FastAPI + Supabase, integrating OpenAI Sora 2, OpenRouter and ElevenLabs.",
      "Implemented concurrency-safe video processing with async execution and semaphore-based controls — 100+ concurrent generation workflows with no resource contention.",
      "Built a reliable LLM-to-structured-data parser with Pydantic, so free-form model output becomes a typed object every time.",
      "Designed fault-tolerant pipeline state management with real-time progress updates and recovery handling — a failed stage resumes, it doesn't restart.",
    ],
    impact: [
      { metric: "100+", label: "Concurrent video workflows" },
      { metric: "0", label: "Humans in the loop" },
      { metric: "Multi-stage", label: "Async pipeline" },
    ],
    stack: ["Python", "FastAPI", "Supabase", "Sora 2", "OpenRouter", "ElevenLabs", "Pydantic", "asyncio"],
    tags: ["Async pipelines", "Concurrency", "LLM structured output"],
    featured: true,
    motif: "pipeline",
  },
  {
    id: "voice-agents",
    name: "AI Voice Agents",
    company: "Etherwise",
    period: "2024 — Present",
    kicker: "20+ agents in production",
    summary:
      "Custom AI voice agents that book appointments, qualify leads and handle customer support — on the phone, with real customers, for real businesses.",
    problem:
      "A missed call is a lost customer. Small teams can't staff a phone line 24/7, and a bad IVR is worse than no phone line at all.",
    approach: [
      "Built and managed 20+ custom voice agents on Vapi.ai across appointment booking, lead qualification and customer support.",
      "Integrated each agent into the client's existing stack — CRMs, calendars, Airtable — so a booked call becomes a real row in a real system.",
      "Tuned prompts, tools and call flows against live transcripts until the agents held up under real conversation.",
    ],
    impact: [
      { metric: "20+", label: "Agents in production" },
      { metric: "24/7", label: "Coverage, no staffing" },
      { metric: "Booked", label: "Straight into their CRM" },
    ],
    stack: ["Vapi.ai", "OpenAI", "Python", "CRM integrations"],
    tags: ["Voice AI", "Agents", "Lead gen"],
    featured: true,
    motif: "voice",
  },
  {
    id: "automations",
    name: "Automation Workflows",
    company: "Etherwise",
    period: "2024 — Present",
    kicker: "150+ shipped",
    summary:
      "Operational automation at volume — the unglamorous work that quietly deletes hours of manual effort every week.",
    problem:
      "Every growing company has a person whose job is copying data from one tab to another. That job should not exist.",
    approach: [
      "Developed and deployed 150+ automation workflows on Make.com.",
      "Integrated Airtable, Google Sheets, CRMs and OpenAI into single coherent flows.",
      "Worked directly with clients to turn 'this takes us three hours every Monday' into something that takes nobody any time at all.",
    ],
    impact: [
      { metric: "150+", label: "Workflows deployed" },
      { metric: "0", label: "Manual copy-paste left" },
    ],
    stack: ["Make.com", "Airtable", "Google Sheets", "OpenAI", "CRMs"],
    tags: ["Automation", "Integrations"],
    featured: false,
    motif: "automation",
  },
  {
    id: "scrapers",
    name: "Web Scraping Systems",
    company: "Etherwise",
    period: "2024 — Present",
    kicker: "Large-scale product data extraction",
    summary:
      "Robust scrapers against high-traffic platforms that genuinely do not want to be scraped — Amazon, REI, Backcountry and others.",
    problem:
      "Anyone can fetch one page. The engineering is in fetching a million of them, reliably, from a site actively working to stop you.",
    approach: [
      "Built scrapers for Amazon, REI, Backcountry and other high-traffic platforms.",
      "Implemented proxy rotation, session handling and CAPTCHA avoidance to stay up under sustained load.",
      "Wrote data normalization pipelines so wildly different page structures land as one clean schema.",
    ],
    impact: [
      { metric: "Large-scale", label: "Product data, reliably" },
      { metric: "1", label: "Normalized output schema" },
    ],
    stack: ["Python", "Proxy rotation", "Session handling", "Data normalization"],
    tags: ["Scraping", "Resilience", "Data pipelines"],
    featured: false,
    motif: "scraper",
  },
  {
    id: "suite-recommender",
    name: "AI Suite Recommender",
    company: "Veritas Technologies",
    period: "2023 — 2024",
    kicker: "Predicting test failures before they happen",
    summary:
      "An ML system that reads a pull request and predicts which test suites are about to fail — so developers test the risky ones first instead of waiting all night to find out.",
    problem:
      "A full regression run takes hours. Developers open a PR, go home, and find out tomorrow that suite 14 broke. The feedback loop is the bug.",
    approach: [
      "Engineered features from the PR itself: filenames touched, commit messages, lines changed, files modified.",
      "Trained an XGBoost classifier to predict suite failure, reaching 87% accuracy on suite prediction.",
      "Surfaced the predictions to developers pre-merge, so the most-likely-to-fail suites get run first.",
    ],
    impact: [
      { metric: "87%", label: "Suite prediction accuracy" },
      { metric: "−28%", label: "Daily test failure rate" },
    ],
    stack: ["Python", "XGBoost", "Feature engineering", "SQL"],
    tags: ["Machine Learning", "Developer tooling"],
    featured: true,
    motif: "ml",
  },
  {
    id: "etrack",
    name: "E-Track Recommender System",
    company: "Veritas Technologies",
    period: "2023 — 2024",
    kicker: "Automated defect mapping",
    summary:
      "A recommender inside E-Track (Veritas' Jira) that reads a failure log, recognises the fingerprint, and tells you which existing defect it belongs to.",
    problem:
      "Engineers were manually reading stack traces and hunting for the defect someone already filed for the exact same failure last Tuesday.",
    approach: [
      "Extracted failure signatures from raw logs to fingerprint recurring issues.",
      "Combined KNN and MD5 hashing to match new failures against the existing defect corpus.",
      "Integrated the recommendations directly into the E-Track platform, at the moment of triage.",
    ],
    impact: [
      { metric: "89%", label: "Issue identification accuracy" },
      { metric: "0", label: "Manual defect hunting" },
    ],
    stack: ["Python", "KNN", "MD5", "Log parsing"],
    tags: ["Machine Learning", "Triage automation"],
    featured: false,
    motif: "graph",
  },
  {
    id: "car-reporting",
    name: "Consolidated CAR Reporting",
    company: "Veritas Technologies",
    period: "2023 — 2024",
    kicker: "8–10 daily emails → one dashboard",
    summary:
      "A unified reporting system for Continuous Automation Regression across every product and release — replacing the daily email avalanche the release team was drowning in.",
    problem:
      "Reporting was 8–10 separate emails a day, one per product, arriving in no particular order, read by people who just wanted one number.",
    approach: [
      "Spearheaded the build on Django REST + Angular, with an ORM/SQL data layer unifying reporting across products and releases.",
      "Dockerized frontend and backend services and deployed behind Nginx for a scalable, containerized architecture.",
      "Streamlined the release team's daily review down to a single consolidated view.",
    ],
    impact: [
      { metric: "8–10 → 1", label: "Daily reports consolidated" },
      { metric: "All", label: "Products & releases, one view" },
    ],
    stack: ["Django REST", "Angular", "SQL", "Docker", "Nginx"],
    tags: ["Full-stack", "DevOps", "Reporting"],
    featured: false,
    motif: "report",
  },
  {
    id: "car-portal",
    name: "CAR Portal Rebuild",
    company: "Veritas Technologies",
    period: "2023 — 2024",
    kicker: "Rebuilt from the ground up",
    summary:
      "A ground-up rebuild of the Continuous Automation Regression portal — more products supported, better analysis, actually scalable.",
    problem:
      "The existing portal couldn't scale to more products and couldn't answer the questions people were actually asking of it.",
    approach: [
      "Rebuilt the platform from scratch on Django and Angular.",
      "Added support for multiple products and improved the platform's scalability.",
      "Improved data analysis and reporting features for better decision-making on test automation.",
    ],
    impact: [
      { metric: "Multi-product", label: "Support added" },
      { metric: "Ground-up", label: "Rebuild" },
    ],
    stack: ["Django", "Angular", "SQL"],
    tags: ["Full-stack", "Platform"],
    featured: false,
    motif: "report",
  },
];

export type Role = {
  id: string;
  company: string;
  title: string;
  period: string;
  start: string;
  end: string;
  current: boolean;
  location: string;
  blurb: string;
  highlights: string[];
  projectIds: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    id: "etherwise",
    company: "Etherwise",
    title: "AI & Backend Developer",
    period: "Dec 2024 — Present",
    start: "Dec 2024",
    end: "Present",
    current: true,
    location: "Remote",
    blurb:
      "Building AI-native products end to end — attribution infrastructure, generative video pipelines, voice agents — and working directly with clients to turn business problems into systems.",
    highlights: [
      "Built Radar, a self-hosted ad tracking and attribution platform, and Automatic Ads, an end-to-end AI video ad generator.",
      "Shipped 20+ AI voice agents on Vapi.ai and 150+ Make.com automation workflows into production.",
      "Built resilient large-scale scrapers for Amazon, REI and Backcountry with proxy rotation and CAPTCHA avoidance.",
      "Worked directly with clients to translate business requirements into technical solutions, coordinating tasks and guiding junior engineers to on-time delivery.",
    ],
    projectIds: ["radar", "automatic-ads", "voice-agents", "automations", "scrapers"],
    stack: ["Python", "FastAPI", "Supabase", "OpenAI", "Vapi.ai", "Make.com", "Stripe", "Docker"],
  },
  {
    id: "veritas",
    company: "Veritas Technologies LLC",
    title: "Associate Software Engineer",
    period: "Jul 2023 — Nov 2024",
    start: "Jul 2023",
    end: "Nov 2024",
    current: false,
    location: "Pune, India",
    blurb:
      "Applied ML to developer productivity, and rebuilt the reporting infrastructure the release team depended on every single day.",
    highlights: [
      "Architected an XGBoost system predicting which test suites a PR would break — 87% accuracy, 28% drop in the daily failure rate.",
      "Built an automated defect mapper (KNN + MD5 log signatures) hitting 89% accuracy in issue identification.",
      "Spearheaded the Consolidated CAR Reporting System (Django REST + Angular, Dockerized behind Nginx), replacing 8–10 daily emails with one unified view.",
      "Rebuilt the CAR Portal from the ground up for multi-product support and better analytics.",
    ],
    projectIds: ["suite-recommender", "etrack", "car-reporting", "car-portal"],
    stack: ["Python", "XGBoost", "Django", "Angular", "SQL", "Docker", "Nginx"],
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
    placement: "1st Place",
    date: "August 2022",
    note: "National-level hackathon run by the Government of India — one of the largest in the world.",
  },
  {
    id: "datathon",
    title: "Datathon",
    placement: "1st Place",
    date: "March 2022",
    note: "First place in a competitive data science and modelling contest.",
  },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "recognition", label: "Recognition" },
  { id: "contact", label: "Contact" },
] as const;
