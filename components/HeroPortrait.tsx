"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroPortrait() {
  return (
    <div className="hero-portrait relative mx-auto min-h-[430px] w-full max-w-[540px] sm:min-h-[560px] lg:min-h-[640px]">
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[47%] h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-plasma/55 via-violet/35 to-cyan/10 blur-sm"
        animate={{ scale: [1, 1.035, 1], opacity: [0.72, 0.95, 0.72] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[15%] top-[11%] h-20 w-20 rounded-full border border-cyan/20 bg-cyan/10 blur-[1px]"
        animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-[9%] top-[20%] h-14 w-14 rounded-2xl border border-violet/20 bg-violet/10 backdrop-blur"
        animate={{ rotate: [0, 12, 0], y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 bottom-0 top-4 overflow-hidden">
        <Image
          src="/ethan-moon.jpg"
          alt="Ethan Moon"
          fill
          priority
          sizes="(max-width: 768px) 90vw, 540px"
          className="hero-photo object-cover object-[50%_32%] saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,5,11,.24)_42%,#03050b_86%)]" />
      </div>
      <div className="absolute bottom-8 left-3 right-3 hidden rounded-3xl border border-white/10 bg-black/35 p-4 backdrop-blur-xl sm:block">
        <div className="grid grid-cols-3 gap-3">
          {[
            ["AI", "Perception"],
            ["CFD", "Simulation"],
            ["Twin", "Systems"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-center">
              <p className="text-lg font-semibold text-white">{value}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/42">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
