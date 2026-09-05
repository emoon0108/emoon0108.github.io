export type ModelKind = 'cinema' | 'printer' | 'violin' | 'planner' | 'plate' | 'funnel' | 'store' | 'drone' | 'space';
export type Project = {
  id: string; name: string; category: string; year: string; kind: ModelKind;
  color: string; object: string; summary: string; detail: string; note: string;
  tech: string[]; codeUrl?: string; liveUrl?: string; linkLabel?: string;
  action: string; actionDone: string;
};

export const projects: Project[] = [
  {
    id: 'nospoilers', name: 'NoSpoilers', category: 'Co-built · Live product', year: '2026', kind: 'cinema', color: '#a65235', object: 'Film projector',
    summary: 'Movie discovery, shared watchlists, and spoiler blocking.',
    detail: 'I co-built a movie discovery platform with collaborative picks, Movie DNA profiles, watchlist syncing, and a browser extension that hides spoilers on-device. My work spans the database, APIs, and the screens people use.',
    note: 'Launched to 80+ users. Built with a collaborator.', tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    codeUrl: 'https://github.com/BoatingToast/nospoilers', liveUrl: 'https://nospoilers.xyz', linkLabel: 'Visit NoSpoilers', action: 'Start projector', actionDone: 'Stop projector',
  },
  {
    id: 'bioprinting', name: 'Bioprinting', category: 'Research · GVSU', year: '2025–26', kind: 'printer', color: '#3d6d66', object: 'An extrusion bioprinter',
    summary: 'Simulation and monitoring for extrusion bioprinting.',
    detail: 'I build non-Newtonian, multiphase OpenFOAM models of bioink deposition and tools for inspecting the results. The research connects fluid simulation, machine vision, and sensor feedback in a closed-loop bioprinting system.',
    note: '32 deposition cases. Co-author on a peer-reviewed ASEE conference paper.', tech: ['OpenFOAM', 'Python', 'ParaView', 'Computer vision'],
    liveUrl: '/Ethan_Moon_Resume.pdf', linkLabel: 'Research background', action: 'Start printer', actionDone: 'Pause printer',
  },
  {
    id: 'violintwin', name: 'ViolinTwin', category: 'Independent · Prototype', year: '2026', kind: 'violin', color: '#a77538', object: 'A violin and its bow',
    summary: 'Pitch and rhythm analysis for violin practice.',
    detail: 'An Expo app that records practice, segments notes, and compares pitch and rhythm with scales or imported MusicXML/MIDI targets. The app identifies pitch and timing errors and provides slowed playback for repeated practice.',
    note: 'On-device analysis. Native tuner bridge requires a custom development build.', tech: ['React Native', 'Expo', 'Audio DSP', 'TypeScript'],
    codeUrl: 'https://github.com/emoon0108/ViolinTwin', liveUrl: 'https://emoon0108.github.io/ViolinTwin/', linkLabel: 'Project page', action: 'Move the bow', actionDone: 'Stop bow',
  },
  {
    id: 'academiq', name: 'AcademiQ', category: 'Independent · Open source', year: '2026', kind: 'planner', color: '#4e627d', object: 'Eight connected semesters',
    summary: 'Degree planning with prerequisite and scheduling constraints.',
    detail: 'I built a planning engine that compares fastest, lowest-stress, and most-flexible paths through eight semesters. Prerequisites, credit limits, course availability, and internship terms constrain every plan, with deterministic fallbacks for AI features.',
    note: '43 unit and integration tests. Includes a local, credential-free demo.', tech: ['React', 'tRPC', 'Drizzle', 'MySQL'],
    codeUrl: 'https://github.com/emoon0108/academic-planner', action: 'Show sequence', actionDone: 'Stop sequence',
  },
  {
    id: 'ody', name: 'Ody', category: 'Lead Full-Stack Engineer', year: '2026–now', kind: 'store', color: '#ba6f4b', object: 'Restaurant',
    summary: 'Consumer apps and restaurant management software.',
    detail: 'I lead full-stack engineering and the U.S. team at Ody. My work includes the consumer social app redesign, menu translation, email campaigns, automated discounts, and multi-location analytics across six client applications and the backend.',
    note: '187 PRs merged across six applications and the backend, May–August 2026.', tech: ['React', 'Expo', 'Hono', 'PostgreSQL'],
    liveUrl: '/Ethan_Moon_Resume.pdf', linkLabel: 'Résumé', action: 'Open the doors', actionDone: 'Close the doors',
  },
  {
    id: 'robotics', name: 'Robot autonomy', category: 'Undergraduate research · U-M', year: '2026–now', kind: 'drone', color: '#68714d', object: 'A morphable quadrotor',
    summary: 'Vision-language navigation for morphable drones.',
    detail: 'At Michigan’s Intelligent Robotics & Autonomy Laboratory, I investigate foundation models for onboard vision-language navigation and human–robot coordination on morphable drones, using hardware-in-the-loop testing before real flight.',
    note: 'Ongoing research with Professor Vasileios Tzoumas.', tech: ['Foundation models', 'Robotics', 'Vision-language navigation'],
    liveUrl: '/Ethan_Moon_Resume.pdf', linkLabel: 'Research background', action: 'Spin the rotors', actionDone: 'Stop the rotors',
  },
  {
    id: 'healthy-eaters', name: 'Healthy Eaters', category: 'Independent · Prototype', year: '2024–26', kind: 'plate', color: '#658059', object: 'Smart plate prototype',
    summary: 'A nutrition app with gradual food exposure and a simulated smart plate.',
    detail: 'A Lua/Defold prototype for gradual food exposure, with a simulated smart plate, low-stimulation settings, local progress tracking, and ten mini-games. Meal progress is stored locally and unlocks game rewards.',
    note: 'The public app simulates the plate connection; real BLE integration is future work.', tech: ['Lua', 'Defold', 'Local persistence', 'Hardware prototyping'],
    codeUrl: 'https://github.com/emoon0108/HealthyEaters', liveUrl: 'https://emoon0108.github.io/HealthyEaters/', linkLabel: 'Project page', action: 'Change portion', actionDone: 'Reset the plate',
  },
  {
    id: 'referrals', name: 'Referral Intelligence', category: 'Analytics · Prototype', year: '2026', kind: 'funnel', color: '#64828b', object: 'Referral funnel',
    summary: 'Referral funnels, cohort analysis, and executive reporting.',
    detail: 'A browser-based dashboard with CSV import, funnel analysis, cohort segmentation, and unit-economics calculations. The executive report includes configurable metrics, planning targets, and exportable summaries.',
    note: 'The live demo uses clearly labeled synthetic data. Uploaded CSVs stay in the browser.', tech: ['JavaScript', 'CSV', 'Analytics', 'Node tests'],
    codeUrl: 'https://github.com/emoon0108/sportlingo-referral-dashboard', liveUrl: 'https://emoon0108.github.io/sportlingo-referral-dashboard/', linkLabel: 'Open dashboard', action: 'Release the marbles', actionDone: 'Pause the marbles',
  },
  {
    id: 'flight', name: 'Flight & orbits', category: 'Research · GVSU', year: '2025', kind: 'space', color: '#657b93', object: 'A satellite and an airfoil',
    summary: 'Airfoil experiments and orbital dynamics research.',
    detail: 'Two mentored research projects: I co-designed and 3D-printed airfoils for Arduino-instrumented wind tunnel experiments, and used Octave and NASA GMAT to investigate orbital transfers, rendezvous, and formation flying.',
    note: 'Mentored research at Grand Valley State University, summer 2025.', tech: ['NASA GMAT', 'Octave', 'Arduino', 'CFD'],
    liveUrl: 'https://www.linkedin.com/in/ethan-moon0108/', linkLabel: 'Research on LinkedIn', action: 'Start the orbit', actionDone: 'Pause the orbit',
  },
];

export const timeline = [
  {year: 'May 2026–present', title: 'Lead Full-Stack Engineer · Ody', body: 'Joined as an intern in May; now leading engineering and the U.S. team. Consumer experiences, merchant tools, APIs, and database design.'},
  {year: 'Aug 2026–present', title: 'Undergraduate Researcher · University of Michigan', body: 'Vision-language navigation and human–robot coordination at the Intelligent Robotics & Autonomy Laboratory.'},
  {year: 'Sep 2025–Sep 2026', title: 'Researcher & Co-Author · Grand Valley State University', body: 'Bioink-deposition simulation, computer vision, and a research platform for inspecting CFD results. ASEE conference paper and ongoing journal manuscripts.'},
  {year: 'Summer 2025', title: 'Aerospace Research · Grand Valley State University', body: 'Airfoil prototypes and wind tunnel experiments; satellite relative motion and orbital dynamics in Octave and NASA GMAT.'},
];

export const exhibits = [...projects.map(({id,name})=>({id,name})), {id:"about",name:"About me"}];
