"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Layers3 } from "lucide-react";
import type { CSSProperties, MouseEvent } from "react";
import { projects } from "@/lib/data";

type Project = (typeof projects)[number];

export function ProjectGallery() {
  return (
    <section id="work" className="work-section">
      <div className="section-kicker work-kicker">
        <span>01 / Selected Work</span>
        <span>Six systems, one recurring question: what can the loop learn?</span>
      </div>
      <div className="work-title-row">
        <h2>PROJECT<br /><em>WORLDS</em></h2>
        <p>
          Not a grid of thumbnails. Each project gets its own visual logic,
          interface language, and reason to exist.
        </p>
      </div>

      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectChapter project={project} index={index} key={project.name} />
        ))}
      </div>
    </section>
  );
}

function ProjectChapter({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-220, 220], [5, -5]), { stiffness: 160, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-320, 320], [-6, 6]), { stiffness: 160, damping: 22 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.article
      className={`project-chapter project-${project.visual}`}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-topline">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{project.tag}</span>
        <span>{project.status}</span>
      </div>
      <div className="project-layout">
        <motion.div
          className="project-art-wrap"
          onMouseMove={onMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY }}
        >
          <ProjectArtwork project={project} index={index} />
        </motion.div>
        <div className="project-info">
          <div>
            <p className="project-scope">{project.scope} / {project.metric}</p>
            <h3>{project.name}</h3>
            <p className="project-summary">{project.summary}</p>
          </div>
          <div>
            <div className="project-stack">
              {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
            </div>
            <div className="project-links">
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  {project.liveUrl.endsWith(".pdf") ? "Research" : "View live"}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ) : (
                <span><Layers3 aria-hidden="true" /> Private build</span>
              )}
              {project.codeUrl ? (
                <a href={project.codeUrl} target="_blank" rel="noreferrer">
                  <Github aria-hidden="true" /> Source
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectArtwork({ project, index }: { project: Project; index: number }) {
  return (
    <div className="project-art" aria-label={`${project.name} abstract system visualization`}>
      <div className="art-grid" aria-hidden="true" />
      <span className="art-code" aria-hidden="true">E.M / SYS-{String(index + 1).padStart(2, "0")}</span>
      {project.visual === "field" && <FieldArt />}
      {project.visual === "fluid" && <FluidArt />}
      {project.visual === "waveform" && <WaveArt />}
      {project.visual === "twin" && <DataArt />}
      {project.visual === "health" && <HealthArt />}
      {project.visual === "network" && <NetworkArt />}
      <div className="art-caption" aria-hidden="true">
        <span>{project.signal}</span>
        <strong>{project.pulse}</strong>
      </div>
    </div>
  );
}

function FieldArt() {
  return (
    <div className="field-art" aria-hidden="true">
      <div className="film-orbit orbit-one" /><div className="film-orbit orbit-two" />
      <div className="film-disc"><span>NO</span><span>SPOILERS</span></div>
      <div className="film-frame frame-a" /><div className="film-frame frame-b" /><div className="film-frame frame-c" />
    </div>
  );
}

function FluidArt() {
  return (
    <svg className="fluid-art" viewBox="0 0 800 620" aria-hidden="true">
      <defs>
        <linearGradient id="flowGradient" x1="0" x2="1">
          <stop offset="0" stopColor="#ff6534" /><stop offset=".55" stopColor="#ffb86b" /><stop offset="1" stopColor="#f7f1e6" />
        </linearGradient>
      </defs>
      <path className="nozzle" d="M345 0h110l-18 150-34 65h-18l-32-65z" />
      {[0, 1, 2, 3, 4, 5].map((line) => (
        <path key={line} className={`flow-line flow-${line}`} d={`M400 190 C${180 + line * 12} ${260 + line * 28}, ${650 - line * 25} ${300 + line * 36}, ${190 + line * 60} ${465 + line * 17} S ${620 - line * 20} 590, 710 610`} />
      ))}
      <circle className="anomaly-ring" cx="532" cy="406" r="62" />
      <circle className="anomaly-dot" cx="532" cy="406" r="7" />
    </svg>
  );
}

function WaveArt() {
  return (
    <div className="wave-art" aria-hidden="true">
      <div className="wave-rings"><i /><i /><i /><i /></div>
      <svg viewBox="0 0 800 360"><path d="M0 190 C55 50 115 330 174 180 S287 48 344 180 S460 320 516 180 S635 58 690 180 S760 300 800 150" /></svg>
      <div className="pitch-readout"><span>A4</span><strong>440.0</strong><small>Hz / locked</small></div>
    </div>
  );
}

function DataArt() {
  const bars = [38, 61, 48, 79, 55, 88, 72, 96];
  return (
    <div className="data-art" aria-hidden="true">
      <div className="data-bars">{bars.map((height, i) => <i key={i} style={{ "--bar": `${height}%` } as CSSProperties} />)}</div>
      <div className="data-window"><span>REFERRAL / ENGINE</span><strong>+31.4%</strong><small>modeled conversion</small></div>
      <div className="data-scan" />
    </div>
  );
}

function HealthArt() {
  const labels = ["LOOK", "TOUCH", "TASTE", "TRY", "GROW"];
  return (
    <div className="health-art" aria-hidden="true">
      <div className="sensory-center"><span>10</span><small>mini-games</small></div>
      {labels.map((label, index) => <div className={`sensory-token token-${index + 1}`} key={label}>{label}</div>)}
      <div className="sensory-orbit" />
    </div>
  );
}

function NetworkArt() {
  const nodes = [[15, 66], [32, 27], [47, 73], [63, 18], [76, 58], [91, 31]];
  return (
    <svg className="network-art" viewBox="0 0 800 600" aria-hidden="true">
      <path d="M120 396 L256 162 L376 438 L504 108 L608 348 L728 186 M256 162 L608 348 M376 438 L728 186" />
      {nodes.map(([x, y], index) => <g key={index}><circle cx={x * 8} cy={y * 6} r="39" /><circle cx={x * 8} cy={y * 6} r="6" /></g>)}
      <text x="530" y="520">SCENARIO 04 / BEST PATH 91%</text>
    </svg>
  );
}
