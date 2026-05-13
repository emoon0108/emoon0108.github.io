"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Cpu,
  Crosshair,
  DatabaseZap,
  FlaskConical,
  Guitar,
  Layers3,
  SignalHigh,
  Sparkles,
  Waves
} from "lucide-react";
import type { MouseEvent } from "react";
import { ProjectVisual } from "./ProjectVisual";
import { TelemetryGraph } from "./TelemetryGraph";

type Project = {
  name: string;
  tag: string;
  status: string;
  summary: string;
  signal: string;
  metric: string;
  pulse: string;
  tech: string[];
  icon: string;
  visual: string;
  accent: string;
  telemetry: number[];
};

const iconMap: Record<string, (props: { className?: string }) => JSX.Element> = {
  Crosshair,
  DatabaseZap,
  FlaskConical,
  Guitar,
  Sparkles,
  Waves
};

export function ProjectExhibit({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-120, 120], [7, -7]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-120, 120], [-7, 7]), { stiffness: 180, damping: 18 });
  const Icon = iconMap[project.icon] ?? Cpu;
  const isViolet = project.accent === "violet";

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      data-cursor="interactive"
      className="project-card group relative min-h-[560px] overflow-hidden rounded-[2rem] p-px"
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-2xl backdrop-blur-2xl transition duration-500 group-hover:border-white/25 sm:p-5">
        <div
          className={`absolute -right-24 -top-28 h-96 w-96 rounded-full blur-3xl transition duration-700 group-hover:scale-125 ${
            isViolet ? "bg-violet/24" : "bg-cyan/22"
          }`}
        />
        <div className="absolute -bottom-32 left-16 h-72 w-72 rounded-full bg-white/5 blur-3xl transition duration-700 group-hover:bg-cyan/10" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,.07),transparent)] opacity-0 transition duration-500 group-hover:translate-x-12 group-hover:opacity-100" />
        <div className="absolute inset-x-0 top-0 h-24 animate-scan bg-gradient-to-b from-transparent via-cyan/10 to-transparent opacity-0 group-hover:opacity-100" />

        <ProjectVisual type={project.visual} accent={project.accent} />

        <div className="relative mt-5 flex items-start justify-between gap-5 px-1">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
              <span className={`h-1.5 w-1.5 rounded-full ${isViolet ? "bg-violet" : "bg-cyan"}`} />
              {project.tag}
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{project.name}</h3>
          </div>
          <div className={`rounded-2xl border border-white/10 p-3 ${isViolet ? "bg-violet/10 text-violet" : "bg-cyan/10 text-cyan"}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>

        <p className="relative mt-4 line-clamp-3 px-1 text-sm leading-6 text-slate-300">{project.summary}</p>

        <div className="relative mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{project.signal}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{project.metric}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">System Pulse</p>
            <p className="mt-2 text-sm font-medium text-slate-200">{project.pulse}</p>
          </div>
        </div>

        <div className="relative mt-3 opacity-70 transition group-hover:opacity-100">
          <TelemetryGraph values={project.telemetry} accent={project.accent} />
        </div>

        <motion.div
          className="relative mt-4 flex flex-wrap gap-2"
          initial={false}
          animate={{ y: 0 }}
        >
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-slate-300 transition group-hover:border-cyan/30 group-hover:text-white"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-300/85">
            <SignalHigh className="h-4 w-4" />
            {project.status}
          </div>
          <div className="flex items-center gap-2 text-xs text-white/45 transition group-hover:text-white">
            <Layers3 className="h-4 w-4" />
            Inspect
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-5 right-5 opacity-20 transition group-hover:opacity-50">
          <Cpu className="h-20 w-20" />
        </div>
      </div>
    </motion.article>
  );
}
