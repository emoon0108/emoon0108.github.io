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
    detail: 'I co-built a spoiler-free movie discovery site with collaborative picks, Movie DNA profiles, and watchlist syncing. I single-handedly built the Chrome extension that hides spoilers across the web, plus an AI recap assistant that answers using only the scenes a viewer has already watched.',
    note: 'Launched to 150+ users. I wrote 58 of its 61 merged pull requests.', tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    codeUrl: 'https://github.com/BoatingToast/nospoilers', liveUrl: 'https://nospoilers.xyz', linkLabel: 'Visit NoSpoilers', action: 'Start projector', actionDone: 'Stop projector',
  },
  {
    id: 'bioprinting', name: 'Bioprinting', category: 'Research · GVSU', year: '2025–26', kind: 'printer', color: '#3d6d66', object: 'An extrusion bioprinter',
    summary: 'Fluid simulation for bio-ink and food-ink 3D printing.',
    detail: 'I ran 20 non-Newtonian, multiphase OpenFOAM simulations of thick bio-inks and food inks flowing through a 3D-printer nozzle, confirmed the results held at finer detail, and built a dashboard that lets the team explore results and trace where each number came from.',
    note: '3 papers: first author of a NAMRC 55 submission, co-author of an ASEE 2026 paper, and a bioink paper in preparation.', tech: ['OpenFOAM', 'Python', 'ParaView', 'Docker'],
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
    note: '57 unit and integration tests. Includes a local, credential-free demo.', tech: ['React', 'tRPC', 'Drizzle', 'MySQL'],
    codeUrl: 'https://github.com/emoon0108/academic-planner', action: 'Show sequence', actionDone: 'Stop sequence',
  },
  {
    id: 'ody', name: 'Ody', category: 'Lead Engineer & Head of U.S. Team', year: '2026–now', kind: 'store', color: '#ba6f4b', object: 'Restaurant',
    summary: 'Reservations, ordering, and loyalty software for restaurants.',
    detail: 'Ody is an early-stage restaurant-tech startup. I was promoted from intern to lead in three months and now lead a 10+ person U.S. team alongside teams in France and China. I lead development of the AI website builder and shipped AI menu translation in 7 languages, automatic discounts, email marketing, and a customer app redesign.',
    note: '414 merged pull requests (4th of 27 engineers). Restaurant pages load over 2× faster after my performance work.', tech: ['TypeScript', 'React', 'Expo', 'PostgreSQL'],
    liveUrl: '/Ethan_Moon_Resume.pdf', linkLabel: 'Résumé', action: 'Open the doors', actionDone: 'Close the doors',
  },
  {
    id: 'robotics', name: 'Robot autonomy', category: 'Undergraduate research · U-M', year: '2026–now', kind: 'drone', color: '#68714d', object: 'A morphable quadrotor',
    summary: 'Robotic-arm control for morphable aerial robots.',
    detail: 'At Michigan’s Intelligent Robotics & Autonomy Laboratory, I build the simulation and control software for a six-joint robotic arm in the lab’s morphable-drone research: Isaac Sim/ROS 2 motion control that updates 60 times per second, demo recording and replay, emergency-stop safety, and a web dashboard.',
    note: 'Ongoing research with Professor Vasileios Tzoumas. 5,000+ lines and 54% of the lab’s code.', tech: ['ROS 2', 'Isaac Sim', 'Python', 'Robotics'],
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
  {year: 'May 2026–present', title: 'Lead Engineer & Head of U.S. Team · Ody', body: 'Joined as an intern in May and promoted to lead within three months. Now leading the U.S. team alongside teams in France and China.'},
  {year: 'Aug 2026–present', title: 'Undergraduate Researcher · University of Michigan', body: 'Simulation and control software for a robotic arm in the Intelligent Robotics & Autonomy Laboratory’s morphable-drone research.'},
  {year: 'Sep 2025–Sep 2026', title: 'Researcher & Co-Author · Grand Valley State University', body: 'Bio-ink and food-ink flow simulation and a dashboard for exploring CFD results. First author of a NAMRC 55 submission; ASEE 2026 paper.'},
  {year: 'Summer 2025', title: 'Aerospace Research · Grand Valley State University', body: 'Airfoil prototypes and wind tunnel experiments; satellite relative motion and orbital dynamics in Octave and NASA GMAT.'},
];

export const exhibits = [...projects.map(({id,name})=>({id,name})), {id:"about",name:"About me"}];
