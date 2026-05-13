"use client";

import { motion } from "framer-motion";

export function MotionSection({
  id,
  eyebrow,
  title,
  children,
  className = ""
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      className={`relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10 ${className}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-140px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {(eyebrow || title) && (
        <div className="mb-10 max-w-3xl">
          {eyebrow && (
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-cyan/80">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </motion.section>
  );
}
