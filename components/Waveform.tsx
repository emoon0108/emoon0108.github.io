"use client";

import { motion } from "framer-motion";

export function Waveform({ bars = 42 }: { bars?: number }) {
  return (
    <div className="flex h-16 items-center gap-1 overflow-hidden">
      {Array.from({ length: bars }).map((_, index) => (
        <motion.span
          key={index}
          className="w-1 rounded-full bg-gradient-to-t from-cyan/25 via-cyan to-violet"
          animate={{
            height: [`${18 + ((index * 11) % 36)}%`, `${42 + ((index * 17) % 48)}%`, `${18 + ((index * 11) % 36)}%`],
            opacity: [0.35, 0.9, 0.35]
          }}
          transition={{
            duration: 1.4 + (index % 8) * 0.12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
