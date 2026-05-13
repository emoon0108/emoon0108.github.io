import {
  ArrowDownRight,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Orbit,
  Send,
  Sparkles,
  Terminal,
  Zap,
  Code2,
  Brain,
  Rocket,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  Layers3,
  Network,
  AudioWaveform,
  Phone
} from "lucide-react";
import { CustomCursor } from "@/components/CustomCursor";
import { HeroPortrait } from "@/components/HeroPortrait";
import { MotionSection } from "@/components/MotionSection";
import { ProjectExhibit } from "@/components/ProjectExhibit";
import { Starfield } from "@/components/Starfield";
import { experiences, navItems, projects, skillGroups, timeline } from "@/lib/data";

const socials = [
  { label: "GitHub", icon: Github, href: "https://github.com/emoon0108" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/ethan-moon-b9a2a7314" },
  { label: "Email", icon: Mail, href: "mailto:emoon0108@gmail.com" }
];

const techStrip = [
  { label: "AI Systems", icon: Brain },
  { label: "Next.js", icon: Code2 },
  { label: "TypeScript", icon: Cpu },
  { label: "Python", icon: Terminal },
  { label: "Simulation", icon: Layers3 },
  { label: "Digital Twins", icon: Network },
  { label: "Audio DSP", icon: AudioWaveform },
  { label: "Data Models", icon: Database },
  { label: "Git", icon: GitBranch }
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Starfield />
      <CustomCursor />
      <div className="noise" />
      <div className="scanlines" />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-void/55 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <a href="#top" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan/25 bg-cyan/10 text-cyan shadow-glow">
              <Orbit className="h-5 w-5 transition duration-300 group-hover:rotate-45" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">ethan.moon</span>
          </a>
          <div className="hidden items-center gap-7 rounded-full border border-white/10 bg-white/[0.035] px-5 py-2 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
                {item}
              </a>
            ))}
          </div>
          <a
            href="mailto:emoon0108@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white transition hover:border-cyan/40 hover:bg-cyan/10"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Contact</span>
          </a>
        </nav>
      </header>

      <section id="top" className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-10 pt-24 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:px-10">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan/20 bg-cyan/10 px-4 py-2 text-sm text-cyan shadow-glow">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
            </span>
            Hi, I&apos;m Ethan
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Ethan Moon
            <span className="mt-3 block text-4xl sm:text-6xl lg:text-7xl">
              I build <span className="gradient-text">intelligent systems</span>.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Engineer building intelligent systems across AI, simulation, robotics, and computational modeling.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-void transition hover:bg-cyan"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan/40 hover:bg-cyan/10"
            >
              Contact
              <Send className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#timeline"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-violet/50 hover:bg-violet/10"
            >
              Journey
              <ArrowDownRight className="h-4 w-4 transition group-hover:translate-y-1" />
            </a>
            <a
              href="/Ethan_Moon_Resume.pdf"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan/40 hover:bg-cyan/10"
            >
              Resume
              <FileText className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-5">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.035] text-slate-300 transition hover:-translate-y-1 hover:border-cyan/35 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
        <HeroPortrait />
      </section>

      <MotionSection id="about" className="compact-section py-10">
        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[.24fr_.76fr] lg:items-start">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-violet/30 bg-violet/10 text-violet">
                <Brain className="h-7 w-7" />
              </span>
              <h2 className="text-2xl font-semibold text-white">About Me</h2>
            </div>
            <div>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                I build product-grade experiments where AI, simulation, sensing, and interfaces meet:
                tactical vision engines, digital twins, live feedback loops, and research dashboards.
              </p>
              <div className="mt-7 grid gap-5 md:grid-cols-3">
                {[
                  ["System Builder", "I connect models, signals, and user workflows into working products."],
                  ["Research Mindset", "I use simulation and measurement to make complex systems legible."],
                  ["Product Taste", "I care about interfaces that feel precise, cinematic, and useful."]
                ].map(([title, body]) => (
                  <div key={title} className="about-mini border-t border-white/10 pt-5">
                    <Rocket className="mb-3 h-5 w-5 text-cyan" />
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      <section id="skills" className="relative z-10 mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Tech Stack</h2>
          <a href="#research" className="inline-flex items-center gap-2 text-sm text-violet transition hover:text-white">
            See all
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="tech-strip glass grid grid-cols-3 gap-3 rounded-3xl p-4 sm:grid-cols-5 lg:grid-cols-9">
          {techStrip.map((tech) => {
            const Icon = tech.icon;
            return (
              <div key={tech.label} className="group grid min-h-[92px] place-items-center rounded-2xl border border-white/0 p-3 text-center transition hover:border-cyan/25 hover:bg-white/[0.04]">
                <Icon className="mb-3 h-8 w-8 text-cyan transition group-hover:scale-110 group-hover:text-white" />
                <p className="text-xs text-slate-300">{tech.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <MotionSection
        id="projects"
        eyebrow="Featured Projects"
        title="Project exhibits from the lab floor."
        className="project-stage pt-10"
      >
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <p className="max-w-2xl leading-7 text-slate-400">
            Each project is presented as a system interface: live telemetry, spatial diagrams,
            sensor traces, and computational visuals up front.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-violet transition hover:text-white">
            See all projects
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectExhibit key={project.name} project={project} index={index} />
          ))}
        </div>
      </MotionSection>

      <MotionSection id="research" eyebrow="Research / Engineering Experience" title="Where physics, AI, and product systems meet.">
        <div className="grid gap-5 lg:grid-cols-3">
          {experiences.map((experience) => {
            const Icon = experience.icon;
            return (
              <div key={experience.title} className="glass relative overflow-hidden rounded-3xl p-7">
                <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-violet/20 blur-3xl" />
                <Icon className="mb-8 h-7 w-7 text-cyan" />
                <h3 className="text-xl font-semibold text-white">{experience.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{experience.body}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {skillGroups.slice(0, 2).map((group) => (
            <div key={group.label} className="glass rounded-3xl p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="timeline" eyebrow="Timeline / Journey" title="Research, engineering, leadership, and systems work.">
        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan via-violet to-transparent sm:block" />
          <div className="space-y-5">
            {timeline.map((item) => (
              <div key={item.year} className="glass relative rounded-3xl p-6 sm:ml-12">
                <div className="absolute -left-[3.75rem] top-7 hidden h-8 w-8 rounded-full border border-cyan/40 bg-void shadow-glow sm:block" />
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">{item.year}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 max-w-3xl leading-7 text-slate-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="contact" eyebrow="Contact" title="Reach out for research, engineering, or startup-minded collaboration.">
        <div className="glass relative overflow-hidden rounded-[2rem] p-7 sm:p-10">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan/15 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                I am open to AI engineering, computational research, aerospace and simulation work,
                digital twin systems, and ambitious technical collaborations.
              </p>
              <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                  <Mail className="h-4 w-4 text-cyan" />
                  emoon0108@gmail.com
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                  <Phone className="h-4 w-4 text-violet" />
                  616-295-5694
                </span>
                <a href="https://linkedin.com/in/ethan-moon-b9a2a7314" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 transition hover:border-cyan/35 hover:text-white">
                  <Linkedin className="h-4 w-4 text-cyan" />
                  linkedin.com/in/ethan-moon-b9a2a7314
                </a>
                <a href="https://github.com/emoon0108" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 transition hover:border-violet/40 hover:text-white">
                  <Github className="h-4 w-4 text-violet" />
                  github.com/emoon0108
                </a>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                  <MapPin className="h-4 w-4 text-cyan" />
                  Grand Rapids, Michigan
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                  <Terminal className="h-4 w-4 text-violet" />
                  Incoming Engineering, University of Michigan
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:emoon0108@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-cyan px-5 py-3 text-sm font-semibold text-void transition hover:bg-white">
                Email Me
                <Mail className="h-4 w-4" />
              </a>
              <a href="/Ethan_Moon_Resume.pdf" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan/40">
                Resume
                <FileText className="h-4 w-4" />
              </a>
              <a href="/Ethan_Moon_CV.pdf" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-violet/50">
                CV
                <ExternalLink className="h-4 w-4" />
              </a>
              <a href="https://github.com/emoon0108" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan/40">
                GitHub
                <Github className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/in/ethan-moon-b9a2a7314" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-violet/50">
                LinkedIn
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </MotionSection>

      <footer className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>Ethan Moon. Intelligent systems across AI, simulation, and computational modeling.</p>
        <a href="#top" className="inline-flex items-center gap-2 text-slate-300 transition hover:text-white">
          Return to orbit
          <ArrowRight className="h-4 w-4" />
        </a>
      </footer>
    </main>
  );
}
