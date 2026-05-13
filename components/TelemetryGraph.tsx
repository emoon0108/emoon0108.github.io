"use client";

import { motion } from "framer-motion";

export function TelemetryGraph({
  values,
  accent = "cyan"
}: {
  values: number[];
  accent?: "cyan" | "violet" | string;
}) {
  const color = accent === "violet" ? "#a78bfa" : "#39d8ff";
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 100 - value;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative h-20 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      <div className="absolute inset-0 bg-radial-grid bg-[length:18px_18px] opacity-25" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <motion.polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <motion.polyline
          points={`0,100 ${points} 100,100`}
          fill={accent === "violet" ? "rgba(167,139,250,.14)" : "rgba(57,216,255,.13)"}
          stroke="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        />
      </svg>
      <div className="absolute left-3 top-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: color }} />
        Live telemetry
      </div>
    </div>
  );
}
