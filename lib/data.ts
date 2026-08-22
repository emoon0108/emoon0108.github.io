import {
  Activity,
  BrainCircuit,
  CircuitBoard,
  Cpu,
  Radar,
  Rocket,
  ScanEye,
} from "lucide-react";

export const navItems = ["About", "Projects", "Research", "Skills", "Timeline", "Contact"];

export const projects = [
  {
    name: "NoSpoilers",
    tag: "Collaborative Product Engineering",
    scope: "Public product",
    status: "Live product",
    summary:
      "Full-stack movie discovery platform with personalized recommendations, social features, creator uploads, and a companion spoiler-blocking browser extension.",
    signal: "Product Surface",
    metric: "Web + Extension",
    pulse: "Collaborative build",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Playwright"],
    icon: "Sparkles",
    visual: "field",
    accent: "cyan",
    telemetry: [28, 34, 31, 48, 42, 58, 54, 68, 63, 77, 72, 84],
    codeUrl: "https://github.com/BoatingToast/nospoilers",
    liveUrl: "https://nospoilers-blush.vercel.app/"
  },
  {
    name: "Bioprint Digital Twin",
    tag: "Computational Biofabrication",
    scope: "Research work",
    status: "Active research",
    summary:
      "Physics-guided extrusion bioprinting twin with CFD surrogate hooks, filament-width prediction, live stream monitoring, and Isolation Forest anomaly detection.",
    signal: "Research Stack",
    metric: "CFD + CV",
    pulse: "Closed-loop monitoring",
    tech: ["Python", "CFD", "Streamlit", "scikit-learn", "OpenFOAM"],
    icon: "FlaskConical",
    visual: "fluid",
    accent: "violet",
    telemetry: [18, 22, 30, 29, 42, 45, 52, 49, 63, 68, 71, 78],
    liveUrl: "/Ethan_Moon_CV.pdf"
  },
  {
    name: "ViolinTwin",
    tag: "Adaptive AI Music Coach",
    scope: "Public prototype",
    status: "Realtime tuner linked",
    summary:
      "React Native practice teacher that records real sessions, estimates pitch center, compares notes to MusicXML/MIDI targets, and builds a longitudinal digital twin of a player.",
    signal: "Analysis Loop",
    metric: "Audio → Action",
    pulse: "Native + TS paths",
    tech: ["Expo", "React Native", "DSP", "TypeScript", "Native Bridge"],
    icon: "Guitar",
    visual: "waveform",
    accent: "cyan",
    telemetry: [41, 36, 44, 39, 50, 47, 58, 52, 63, 61, 70, 66],
    codeUrl: "https://github.com/emoon0108/ViolinTwin",
    liveUrl: "https://emoon0108.github.io/ViolinTwin/"
  },
  {
    name: "Referral Intelligence",
    tag: "Analytics + Decision Support",
    scope: "Public prototype",
    status: "Live dashboard",
    summary:
      "Referral analytics workspace with deterministic demo data, real CSV ingestion, funnel and unit-economics modeling, segmentation, and an executive reporting view.",
    signal: "Automated Tests",
    metric: "7 passing",
    pulse: "No runtime dependencies",
    tech: ["JavaScript", "Analytics", "CSV", "Unit Economics", "Node Test"],
    icon: "DatabaseZap",
    visual: "twin",
    accent: "violet",
    telemetry: [24, 42, 27, 48, 35, 61, 39, 66, 44, 72, 51, 80],
    codeUrl: "https://github.com/emoon0108/sportlingo-referral-dashboard",
    liveUrl: "https://emoon0108.github.io/sportlingo-referral-dashboard/"
  },
  {
    name: "Healthy Eaters",
    tag: "Human-Centered Assistive System",
    scope: "Public prototype",
    status: "Low-stim mode stable",
    summary:
      "Defold/Lua prototype for autism-aware nutrition exposure with simulated smart-plate tracking, sensory modes, food challenges, tokenized games, and parent insights.",
    signal: "Exposure Steps",
    metric: "4",
    pulse: "10 mini-games integrated",
    tech: ["Lua", "Defold", "BLE Prototype", "UX Systems", "Persistence"],
    icon: "Sparkles",
    visual: "health",
    accent: "cyan",
    telemetry: [20, 24, 32, 38, 41, 45, 55, 57, 62, 70, 73, 82],
    codeUrl: "https://github.com/emoon0108/HealthyEaters",
    liveUrl: "https://emoon0108.github.io/HealthyEaters/"
  },
  {
    name: "Academic Planner",
    tag: "AI Planning Workspace",
    scope: "In progress",
    status: "Private build",
    summary:
      "Full-stack planning system with dashboards, chat, career pathways, scenario modeling, typed APIs, database schema work, and modern product UI primitives.",
    signal: "Plan States",
    metric: "∞",
    pulse: "TRPC + Drizzle stack",
    tech: ["React", "tRPC", "Drizzle", "MySQL", "Framer Motion"],
    icon: "DatabaseZap",
    visual: "network",
    accent: "violet",
    telemetry: [33, 31, 39, 45, 44, 55, 52, 64, 61, 69, 74, 79]
  }
];

export const experiences = [
  {
    title: "AI systems and product engineering",
    body: "Building end-to-end intelligent products that connect data models, simulations, interactive interfaces, and decision support.",
    icon: BrainCircuit
  },
  {
    title: "Digital twin and simulation research",
    body: "Experimenting with computational twins across bioprinting, acoustics, sports, and instrument analysis using physics baselines plus learned residuals.",
    icon: CircuitBoard
  },
  {
    title: "Realtime feedback systems",
    body: "Designing systems that observe live signals, extract meaningful structure, and turn analysis into immediate coaching or operational feedback.",
    icon: Radar
  }
];

export const skillGroups = [
  {
    label: "AI + Modeling",
    skills: ["Computer Vision", "Anomaly Detection", "Surrogate Models", "Feature Engineering", "Monte Carlo Simulation"]
  },
  {
    label: "Simulation + Sensing",
    skills: ["Digital Twins", "OpenFOAM", "CFD Workflows", "Audio DSP", "Geometry Processing"]
  },
  {
    label: "Product Engineering",
    skills: ["Next.js", "React Native", "TypeScript", "Python", "Full-Stack APIs"]
  },
  {
    label: "Systems Taste",
    skills: ["Research UX", "Telemetry Dashboards", "Motion Design", "Developer Tooling", "Human-Centered AI"]
  }
];

export const timeline = [
  {
    year: "2026",
    title: "Computer Science, University of Michigan",
    body: "Pursuing a B.S.E. in Computer Science at the College of Engineering after building a portfolio across AI, simulation, aerospace, bioprinting, and product engineering."
  },
  {
    year: "Oct 2025 - Present",
    title: "Bioprinting Researcher / Co-Author, Grand Valley State University",
    body: "Co-authored and presented closed-loop bioprinting research at ASEE North Central; developed an OpenFOAM/interFoam CFD digital twin and real-time computer vision + sensor feedback pipeline for defect detection and adaptive control."
  },
  {
    year: "Summer 2025",
    title: "Aerospace Research: Hysteresis + Satellite Dynamics",
    body: "Designed 3D-printed airfoil prototypes, ran Arduino-based wind tunnel experiments, analyzed CFD flow behavior, and simulated orbital transfers, rendezvous, and formation-flying algorithms with Octave and NASA GMAT."
  },
  {
    year: "Jan 2025 - Present",
    title: "WMU Design Build Fly Team",
    body: "Collaborating with university engineering students to design, build, and test model aircraft for AIAA collegiate competitions."
  },
  {
    year: "Mar 2024 - Present",
    title: "Software Simulation Intern, Casual Simulations",
    body: "Optimized rowing system simulations using XP exchange and Arduino technology; contributed to a rowing app sold to a high school rowing team."
  },
  {
    year: "2024",
    title: "Healthy Eaters: Smart Plate + Gamified Assistive App",
    body: "Built an Arduino/ESP32 smart-plate prototype with load-cell sensing and a Lua/Defold app for gradual food exposure, reward loops, parent monitoring, and autism-aware nutrition support."
  },
  {
    year: "2022 - Present",
    title: "Founder, Helping Hands N.P.O.",
    body: "Founded a nationwide volunteer soccer education club for underserved youth, recruited 10+ ECNL/MLS NEXT coaches, built the public website, and raised $3,000+ in donations."
  }
];

export const stats = [
  { label: "System domains", value: "6+" },
  { label: "Twin pipelines", value: "3" },
  { label: "Telemetry-first products", value: "5" },
  { label: "Stack range", value: "AI to UI" }
];

export const heroOrbit = [Cpu, Activity, ScanEye, Rocket];
