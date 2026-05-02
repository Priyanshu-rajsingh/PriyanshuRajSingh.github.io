/**
 * certificates.js
 * ─────────────────────────────────────────────────────────────────────────────
 * DATA FILE — Edit this file to add, remove or update certificates.
 *
 * Each certificate object supports these fields:
 *   id          {string}  Unique identifier (no spaces)
 *   title       {string}  Full certificate title
 *   issuer      {string}  Issuing organisation / platform
 *   date        {string}  Date of issue  (YYYY-MM-DD)
 *   expiry      {string}  Expiry date (optional, YYYY-MM-DD)
 *   category    {string}  One of: Cloud | AI/ML | Security | Blockchain |
 *                                  Development | Professional | Finance
 *   description {string}  Short description shown in the modal
 *   certId      {string}  Certificate ID / credential number (optional)
 *   highlight   {boolean} If true, card gets a golden accent ring
 * ─────────────────────────────────────────────────────────────────────────────
 */

const CERTIFICATES = [

  // ── CLOUD ──────────────────────────────────────────────────────────────────
  {
    id: "oci-ai-foundations",
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle University",
    date: "2025-07-10",
    expiry: "2027-07-10",
    category: "Cloud",
    description:
      "Validates foundational knowledge of artificial intelligence and machine learning services on Oracle Cloud Infrastructure, including OCI AI services, generative AI features, and cloud-based ML pipelines.",
    certId: "102005297OCI25AICFA",
    highlight: false,
  },
  {
    id: "oci-foundations",
    title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle University",
    date: "2025-07-25",
    expiry: "2027-07-25",
    category: "Cloud",
    description:
      "Demonstrates understanding of core OCI concepts including compute, networking, storage, identity and access management, database services, and cloud architecture fundamentals.",
    certId: "102005297OCI25FNDCFA",
    highlight: false,
  },
  {
    id: "oci-data-science",
    title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    issuer: "Oracle University",
    date: "2025-08-25",
    expiry: null,
    category: "Cloud",
    description:
      "Professional-level certification covering end-to-end data science workflows on OCI: model training, deployment with OCI Data Science service, AutoML, model monitoring, and MLOps practices.",
    certId: "102005297OCI25DSOCP",
    highlight: true,
  },

  // ── AI/ML ───────────────────────────────────────────────────────────────────
  {
    id: "langchain-ts",
    title: "LangChain Essentials — TypeScript",
    issuer: "LangChain Academy",
    date: "2026-03-31",
    expiry: null,
    category: "AI/ML",
    description:
      "Covers building production-ready LLM applications using LangChain in TypeScript: chains, agents, retrieval-augmented generation (RAG), memory management, and tool integrations.",
    certId: "tmpuslzxv8",
    highlight: false,
  },
  {
    id: "massmutual-uipath",
    title: "Automating Bike Route Generation and CSV Export with UiPath",
    issuer: "MassMutual India (AIDEA)",
    date: "2025-10-13",
    expiry: null,
    category: "AI/ML",
    description:
      "Certificate of Appreciation for completing a hands-on case study at MassMutual India focused on robotic process automation using UiPath to automate route generation and data export workflows.",
    certId: null,
    highlight: false,
  },
  {
    id: "nptel-cpp",
    title: "Programming in Modern C++ — Elite",
    issuer: "NPTEL / IIT Kharagpur (SWAYAM)",
    date: "2024-10-01",
    expiry: null,
    category: "Development",
    description:
      "12-week NPTEL Elite certification with a consolidated score of 69 % (25/25 assignments, 44.25/75 proctored exam). Covers modern C++ features: move semantics, smart pointers, templates, STL, and concurrency.",
    certId: "NPTEL24CS125S950200176",
    highlight: false,
  },

  // ── SECURITY ────────────────────────────────────────────────────────────────
  {
    id: "iso-42001-lead-auditor",
    title: "ISO/IEC 42001:2023 Lead Auditor",
    issuer: "Mastermind Assurance",
    date: "2025-11-01",
    expiry: "2028-10-31",
    category: "Security",
    description:
      "24 credit-hour skills-based examination certifying competence to lead audits of AI Management Systems (AIMS) against the ISO/IEC 42001:2023 standard — the world's first international AI governance framework.",
    certId: "fqav2hn2iq",
    highlight: true,
  },
  {
    id: "iirs-geo-cyber",
    title: "Geo-Data Sharing and Cyber Security",
    issuer: "ISRO — Indian Institute of Remote Sensing (IIRS)",
    date: "2025-01-08",
    expiry: null,
    category: "Security",
    description:
      "10-hour online course by ISRO/IIRS covering geospatial data-sharing frameworks and cyber-security practices for remote sensing data. Completed with 100 % attendance (9–20 Dec 2024).",
    certId: "20241542638703",
    highlight: false,
  },

  // ── BLOCKCHAIN ──────────────────────────────────────────────────────────────
  {
    id: "iitm-blockchain-school",
    title: "Winter School on Decentralised Trust and Blockchains 2025",
    issuer: "CyStar, IIT Madras",
    date: "2025-12-20",
    expiry: null,
    category: "Blockchain",
    description:
      "Successfully completed the offline phase (8–20 Dec 2025) of the IIT Madras Winter School, featuring expert lectures on decentralised trust, consensus protocols, zero-knowledge proofs, and Web3 applications.",
    certId: null,
    highlight: false,
  },
  {
    id: "iitm-cystar-hackathon",
    title: "CyStar IIT Madras Blockchain Hackathon — 2nd Place",
    issuer: "Centre for Cybersecurity, Trust and Reliability (CyStar), IIT Madras",
    date: "2024-12-20",
    expiry: null,
    category: "Blockchain",
    description:
      "Secured 2nd place out of 10 teams as a member of Team IOU on-chain at the Winter School Hackathon. Built a blockchain-based IOU (I Owe You) system enabling decentralised peer-to-peer credit tracking.",
    certId: null,
    highlight: true,
  },

  // ── DEVELOPMENT ─────────────────────────────────────────────────────────────
  {
    id: "django-codetantra",
    title: "Hands-on Web Development with Python & Django",
    issuer: "CodeTantra / Vardhaman College of Engineering",
    date: "2025-01-01",   // approximate — certificate is undated
    expiry: null,
    category: "Development",
    description:
      "Participation certificate for completing a hands-on Django session organised by Connect Club in collaboration with CDC and delivered by CodeTantra experts. Covered Django MVC, database integration, and deployment.",
    certId: null,
    highlight: false,
  },
  {
    id: "mongodb",
    title: "MongoDB and the Document Model",
    issuer: "MongoDB, Inc.",
    date: "2024-01-08",
    expiry: null,
    category: "Development",
    description:
      "Proof of completion for the MongoDB foundational course covering the document model, BSON, CRUD operations, data modelling patterns, indexing, and aggregation pipelines.",
    certId: "MDBz8qjhpuubs",
    highlight: false,
  },
  {
    id: "smart-interviews",
    title: "Smart Coder — Diamond Certified",
    issuer: "Smart Interviews",
    date: "2026-01-01",   // 2026 as stated on certificate
    expiry: null,
    category: "Development",
    description:
      "Diamond-level certification awarded for completing the Smart Coder course in 2026. Global rank: 2211 out of 53 921 certified participants. Covers data structures, algorithms, and competitive programming.",
    certId: "2211/53921 (global rank)",
    highlight: true,
  },

  // ── PROFESSIONAL ────────────────────────────────────────────────────────────
  {
    id: "tcs-career-edge",
    title: "TCS iON Career Edge — Young Professional",
    issuer: "Tata Consultancy Services (TCS iON)",
    date: "2024-12-27",
    expiry: null,
    category: "Professional",
    description:
      "Achievement certificate covering communication skills, presentation, soft skills, career guidance, resume writing, group discussion, interview skills, business etiquette, accounting fundamentals, IT skills, and an overview of AI.",
    certId: "119854-27324360-1016",
    highlight: false,
  },

  // ── FINANCE ─────────────────────────────────────────────────────────────────
  {
    id: "nism-financial-literacy",
    title: "Financial Literacy Course for Bharat",
    issuer: "National Institute of Securities Markets (NISM) — A SEBI Initiative",
    date: "2025-11-09",
    expiry: null,
    category: "Finance",
    description:
      "eLearning completion certificate from NISM (SEBI's capacity-building arm) covering financial literacy fundamentals: savings, investments, insurance, banking, and securities markets awareness for retail investors.",
    certId: null,
    highlight: false,
  },

];

// ── CATEGORY COLOUR MAP ────────────────────────────────────────────────────────
// Maps category name → CSS custom-property accent colour
const CATEGORY_COLORS = {
  "Cloud":        "#4A9EFF",
  "AI/ML":        "#A78BFA",
  "Security":     "#F97316",
  "Blockchain":   "#34D399",
  "Development":  "#FBBF24",
  "Professional": "#60A5FA",
  "Finance":      "#F472B6",
};
