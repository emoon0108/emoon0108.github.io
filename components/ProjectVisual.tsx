"use client";

import { motion } from "framer-motion";

const stream = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: [0, 1, 1], opacity: [0, 1, 0.25] },
  transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const }
};

const pulse = {
  animate: { scale: [1, 1.18, 1], opacity: [0.45, 0.95, 0.45] },
  transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const }
};

export function ProjectVisual({
  type,
  accent
}: {
  type: string;
  accent: string;
}) {
  if (type === "field") return <FieldIntelligence accent={accent} />;
  if (type === "fluid") return <BioprintFlow accent={accent} />;
  if (type === "waveform") return <ResonanceWave accent={accent} />;
  if (type === "twin") return <InstrumentTwin accent={accent} />;
  if (type === "health") return <HealthLoop accent={accent} />;
  return <PlanningGraph accent={accent} />;
}

function SceneShell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="visual-shell relative h-[230px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/50 sm:h-[250px]">
      <div className="absolute inset-0 bg-radial-grid bg-[length:26px_26px] opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.08),transparent)] opacity-0 transition duration-700 group-hover:translate-x-20 group-hover:opacity-100" />
      <div className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/55 backdrop-blur-xl">
        {label}
      </div>
      {children}
    </div>
  );
}

function FieldIntelligence({ accent }: { accent: string }) {
  const players = [
    [25, 32],
    [38, 48],
    [50, 37],
    [65, 55],
    [76, 42],
    [52, 68]
  ];

  return (
    <SceneShell label="Spatial engine">
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="fieldHeat" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#39d8ff" stopOpacity=".34" />
            <stop offset="55%" stopColor="#7c3aed" stopOpacity=".16" />
            <stop offset="100%" stopColor="#03050b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="50" y="42" width="400" height="216" rx="12" fill="rgba(2,8,23,.35)" stroke="rgba(148,163,184,.28)" />
        <line x1="250" y1="42" x2="250" y2="258" stroke="rgba(148,163,184,.22)" />
        <circle cx="250" cy="150" r="42" fill="none" stroke="rgba(148,163,184,.2)" />
        <motion.ellipse cx="285" cy="145" rx="145" ry="72" fill="url(#fieldHeat)" animate={{ rx: [110, 155, 110], opacity: [.45, .8, .45] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.path d="M95 212 C150 168 196 176 250 142 C318 98 371 102 421 76" stroke="#39d8ff" strokeWidth="2" fill="none" strokeDasharray="8 10" animate={{ strokeDashoffset: [80, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
        {players.map(([x, y], index) => (
          <motion.g key={index} animate={{ x: [0, index % 2 ? 8 : -8, 0], y: [0, index % 2 ? -6 : 6, 0] }} transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}>
            <circle cx={(x / 100) * 500} cy={(y / 100) * 300} r="13" fill="rgba(57,216,255,.12)" stroke="#39d8ff" />
            <circle cx={(x / 100) * 500} cy={(y / 100) * 300} r="3" fill="#fff" />
          </motion.g>
        ))}
      </svg>
      <OverlayGrid accent={accent} left="Compactness 82" right="xT suppressed .15" />
    </SceneShell>
  );
}

function BioprintFlow({ accent }: { accent: string }) {
  return (
    <SceneShell label="CFD surrogate">
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="filament" x1="0" x2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#39d8ff" />
            <stop offset="100%" stopColor="#ecfeff" />
          </linearGradient>
        </defs>
        <path d="M240 20 L300 20 L282 105 L258 105 Z" fill="rgba(167,139,250,.2)" stroke="rgba(255,255,255,.28)" />
        <motion.path d="M270 104 C270 142 150 136 150 180 C150 225 360 202 360 248" stroke="url(#filament)" strokeWidth="20" strokeLinecap="round" fill="none" filter="blur(.2px)" animate={{ pathLength: [0.08, 1, 0.08] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        {[72, 104, 136, 168, 200, 232, 264, 296, 328, 360, 392].map((x, index) => (
          <motion.path key={x} d={`M${x} 62 C${x + 26} ${92 + index * 5}, ${x - 24} ${176 - index * 4}, ${x + 18} 238`} stroke={index % 2 ? "rgba(57,216,255,.32)" : "rgba(167,139,250,.3)"} strokeWidth="1.4" fill="none" strokeDasharray="6 10" animate={{ strokeDashoffset: [60, 0] }} transition={{ duration: 2.5 + index * 0.1, repeat: Infinity, ease: "linear" }} />
        ))}
        <motion.circle cx="350" cy="206" r="36" fill="none" stroke="#fb7185" strokeWidth="2" {...pulse} />
        <text x="373" y="198" fill="rgba(255,255,255,.72)" fontSize="10" fontFamily="monospace">residual spike</text>
      </svg>
      <OverlayGrid accent={accent} left="Pressure residual +2.1" right="Anomaly score .04" />
    </SceneShell>
  );
}

function ResonanceWave({ accent }: { accent: string }) {
  const bars = Array.from({ length: 54 }, (_, i) =>
    Math.round((35 + Math.sin(i * 0.55) * 22 + Math.cos(i * 0.17) * 14) * 100) / 100
  );
  return (
    <SceneShell label="Audio twin">
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        {[74, 112, 150].map((r, index) => (
          <motion.circle key={r} cx="250" cy="145" r={r} fill="none" stroke={index % 2 ? "rgba(167,139,250,.35)" : "rgba(57,216,255,.35)"} strokeWidth="1.5" animate={{ r: [r, r + 16, r], opacity: [.28, .76, .28] }} transition={{ duration: 3 + index, repeat: Infinity }} />
        ))}
        <path d="M219 68 C177 92 165 208 224 231 C292 252 347 203 315 96 C292 69 255 57 219 68Z" fill="rgba(255,255,255,.035)" stroke="rgba(255,255,255,.2)" />
        {bars.map((height, index) => (
          <motion.rect key={index} x={40 + index * 8} y={220 - height} width="3" height={height} rx="2" fill={index % 3 ? "#39d8ff" : "#a78bfa"} animate={{ height: [height, height * 1.55, height], y: [220 - height, 220 - height * 1.55, 220 - height] }} transition={{ duration: 1.3 + (index % 7) * 0.08, repeat: Infinity, ease: "easeInOut" }} opacity=".72" />
        ))}
        <motion.path d="M70 148 C120 92 163 204 210 147 C265 80 300 215 356 144 C395 92 430 162 456 132" stroke="#fff" strokeWidth="2" fill="none" {...stream} />
      </svg>
      <OverlayGrid accent={accent} left="Pitch drift -7c" right="Target lock A major" />
    </SceneShell>
  );
}

function InstrumentTwin({ accent }: { accent: string }) {
  return (
    <SceneShell label="Geometry + airflow">
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        <motion.path d="M250 45 C176 54 174 118 211 147 C165 178 184 248 250 253 C316 248 335 178 289 147 C326 118 324 54 250 45Z" fill="rgba(167,139,250,.08)" stroke="rgba(255,255,255,.28)" strokeWidth="2" animate={{ filter: ["drop-shadow(0 0 0px #a78bfa)", "drop-shadow(0 0 18px #a78bfa)", "drop-shadow(0 0 0px #a78bfa)"] }} transition={{ duration: 3.6, repeat: Infinity }} />
        <line x1="250" y1="38" x2="250" y2="260" stroke="rgba(57,216,255,.38)" strokeDasharray="6 8" />
        {[80, 115, 150, 185, 220, 255, 290, 325, 360, 395].map((x, index) => (
          <motion.path key={x} d={`M${x} 72 C${x + 45} ${90 + index * 8}, ${x - 30} ${185 - index * 4}, ${x + 38} 238`} stroke="rgba(57,216,255,.28)" strokeWidth="1.3" fill="none" strokeDasharray="5 9" animate={{ strokeDashoffset: [40, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }} />
        ))}
        <motion.rect x="173" y="214" width="154" height="28" rx="8" fill="rgba(0,0,0,.38)" stroke="rgba(255,255,255,.16)" animate={{ opacity: [.55, 1, .55] }} transition={{ duration: 2.2, repeat: Infinity }} />
        <text x="190" y="232" fill="rgba(255,255,255,.72)" fontSize="10" fontFamily="monospace">symmetry 0.91 / cfd mock</text>
      </svg>
      <OverlayGrid accent={accent} left="MFCC vector synced" right="Twin JSON stable" />
    </SceneShell>
  );
}

function HealthLoop({ accent }: { accent: string }) {
  const nodes = [
    [250, 62, "look"],
    [365, 132, "interact"],
    [320, 235, "taste"],
    [178, 235, "complete"],
    [135, 132, "reward"]
  ] as const;

  return (
    <SceneShell label="Behavior loop">
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        <motion.path d="M250 62 C340 58 402 102 365 132 C410 190 370 252 320 235 C250 286 178 250 178 235 C105 210 96 145 135 132 C106 78 190 54 250 62" fill="none" stroke="rgba(57,216,255,.35)" strokeWidth="2" strokeDasharray="8 10" animate={{ strokeDashoffset: [80, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
        <motion.circle cx="250" cy="154" r="62" fill="rgba(57,216,255,.08)" stroke="rgba(255,255,255,.18)" animate={{ r: [55, 72, 55] }} transition={{ duration: 3, repeat: Infinity }} />
        <text x="220" y="149" fill="white" fontSize="12" fontFamily="monospace">smart</text>
        <text x="218" y="166" fill="white" fontSize="12" fontFamily="monospace">plate</text>
        {nodes.map(([x, y, label], index) => (
          <motion.g key={label} animate={{ y: [0, index % 2 ? 7 : -7, 0] }} transition={{ duration: 2.5 + index * 0.2, repeat: Infinity }}>
            <circle cx={x} cy={y} r="25" fill="rgba(2,8,23,.78)" stroke={index % 2 ? "#a78bfa" : "#39d8ff"} />
            <text x={x - 18} y={y + 4} fill="rgba(255,255,255,.75)" fontSize="9" fontFamily="monospace">{label}</text>
          </motion.g>
        ))}
      </svg>
      <OverlayGrid accent={accent} left="Low-stim enabled" right="Token loop balanced" />
    </SceneShell>
  );
}

function PlanningGraph({ accent }: { accent: string }) {
  const nodes = [
    [82, 206],
    [156, 102],
    [230, 190],
    [286, 76],
    [360, 168],
    [426, 94]
  ];

  return (
    <SceneShell label="Scenario graph">
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full">
        <motion.path d="M82 206 L156 102 L230 190 L286 76 L360 168 L426 94" stroke="rgba(167,139,250,.75)" strokeWidth="2.5" fill="none" {...stream} />
        <path d="M156 102 L360 168 M230 190 L426 94 M82 206 L286 76" stroke="rgba(57,216,255,.18)" />
        {nodes.map(([x, y], index) => (
          <motion.g key={index} animate={{ scale: [1, 1.16, 1] }} transition={{ duration: 2 + index * 0.12, repeat: Infinity }}>
            <circle cx={x} cy={y} r="30" fill="rgba(255,255,255,.035)" stroke={index % 2 ? "#a78bfa" : "#39d8ff"} />
            <circle cx={x} cy={y} r="5" fill="#fff" />
          </motion.g>
        ))}
        <motion.rect x="302" y="206" width="128" height="42" rx="12" fill="rgba(0,0,0,.42)" stroke="rgba(255,255,255,.16)" animate={{ opacity: [.55, .95, .55] }} transition={{ duration: 2.4, repeat: Infinity }} />
        <text x="318" y="231" fill="rgba(255,255,255,.72)" fontSize="10" fontFamily="monospace">best path: 91%</text>
      </svg>
      <OverlayGrid accent={accent} left="7 scenario branches" right="Career model live" />
    </SceneShell>
  );
}

function OverlayGrid({ accent, left, right }: { accent: string; left: string; right: string }) {
  const glow = accent === "violet" ? "text-violet" : "text-cyan";
  return (
    <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-2 gap-3">
      {[left, right].map((item) => (
        <div key={item} className="rounded-2xl border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-xl">
          <p className={`font-mono text-[10px] uppercase tracking-[0.16em] ${glow}`}>{item}</p>
        </div>
      ))}
    </div>
  );
}
