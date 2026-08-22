import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { KineticHero } from "@/components/KineticHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { SiteEffects } from "@/components/SiteEffects";
import { skillGroups, timeline } from "@/lib/data";

const selectedTimeline = timeline.slice(0, 5);

export default function Home() {
  return (
    <main id="top" className="site-shell">
      <SiteEffects />
      <div className="page-grain" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Ethan Moon, back to top">
          <span>EM</span>
          <span className="wordmark-dot" />
          <span>26</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#profile">Profile</a>
          <a href="#journey">Journey</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="/Ethan_Moon_Resume.pdf">
          Résumé <ArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <KineticHero />

      <div className="statement-ribbon" aria-hidden="true">
        <div className="statement-track">
          <span>AI SYSTEMS</span><i>✦</i><span>DIGITAL TWINS</span><i>✦</i>
          <span>SIMULATION</span><i>✦</i><span>PRODUCT ENGINEERING</span><i>✦</i>
          <span>AI SYSTEMS</span><i>✦</i><span>DIGITAL TWINS</span><i>✦</i>
          <span>SIMULATION</span><i>✦</i><span>PRODUCT ENGINEERING</span><i>✦</i>
        </div>
      </div>

      <ProjectGallery />

      <section id="profile" className="profile-section">
        <div className="section-kicker dark-kicker">
          <span>02 / Profile</span>
          <span>Grand Rapids → Ann Arbor</span>
        </div>
        <div className="profile-grid">
          <div className="profile-intro">
            <p className="eyebrow">Builder / researcher / Michigan engineer</p>
            <h2>
              I make complex systems
              <em>feel observable.</em>
            </h2>
          </div>
          <div className="profile-copy">
            <p className="profile-lead">
              I&apos;m Ethan Moon, a University of Michigan computer science engineering student.
              My work sits where software meets the physical world: acoustic signals,
              fluid dynamics, human behavior, live data, and AI-assisted decisions.
            </p>
            <p>
              I like ambitious projects with a measurable loop—sense something,
              model it, make it understandable, then help a person act on it.
              That idea connects my bioprinting research, adaptive music tools,
              product experiments, and simulation work.
            </p>
            <div className="profile-actions">
              <a className="round-link light-round" href="/Ethan_Moon_CV.pdf">
                Read my CV <FileText aria-hidden="true" />
              </a>
              <a className="text-link dark-text-link" href="#journey">
                Follow the timeline <ArrowDownRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="capability-grid">
          {skillGroups.map((group, index) => (
            <article className="capability" key={group.label}>
              <span className="capability-number">0{index + 1}</span>
              <h3>{group.label}</h3>
              <p>{group.skills.join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="journey" className="journey-section">
        <div className="section-kicker">
          <span>03 / Journey</span>
          <span>Selected signals, 2022—2026</span>
        </div>
        <div className="journey-heading">
          <p className="eyebrow">A short history of making things real</p>
          <h2>Research is a contact sport.</h2>
        </div>
        <div className="timeline-list">
          {selectedTimeline.map((item, index) => (
            <article className="timeline-row" key={`${item.year}-${item.title}`}>
              <span className="timeline-index">{String(index + 1).padStart(2, "0")}</span>
              <time>{item.year}</time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
              <span className="timeline-mark" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-orbit" aria-hidden="true">
          <span>LET&apos;S BUILD SOMETHING REAL · LET&apos;S BUILD SOMETHING REAL · </span>
        </div>
        <p className="contact-overline">Open to research, engineering, and ambitious collaborations.</p>
        <h2>Have a hard problem?</h2>
        <a className="contact-email" href="mailto:ethmoon@umich.edu">
          <span>Let&apos;s talk.</span>
          <ArrowRight aria-hidden="true" />
        </a>
        <div className="contact-meta">
          <a href="mailto:ethmoon@umich.edu"><Mail aria-hidden="true" /> Email</a>
          <a href="https://github.com/emoon0108" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub</a>
          <a href="https://linkedin.com/in/ethan-moon-b9a2a7314" target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn</a>
          <span>Grand Rapids, Michigan</span>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Ethan Moon</span>
        <span>Engineered with intent, motion, and a little misdirection.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
