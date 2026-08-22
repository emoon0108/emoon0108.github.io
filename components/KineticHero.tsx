"use client";

import Image from "next/image";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { useState } from "react";

export function KineticHero() {
  const [warped, setWarped] = useState(false);

  return (
    <section className={`hero ${warped ? "is-warped" : ""}`} aria-labelledby="hero-title">
      <div className="hero-meta">
        <span>Applied AI + Physical Systems</span>
        <span className="available"><i /> Seeking 2026 research + software roles</span>
      </div>

      <div className="hero-type" id="hero-title" aria-label="Ethan Moon">
        <span className="hero-ethan">ETHAN</span>
        <span className="hero-moon">MOON</span>
      </div>

      <div className="hero-stage">
        <div className="portrait-frame">
          <Image
            src="/ethan-moon.jpg"
            alt="Portrait of Ethan Moon"
            fill
            priority
            sizes="(max-width: 768px) 76vw, 32vw"
            className="portrait-image"
          />
          <span className="portrait-label">Engineer / Researcher</span>
        </div>

        <button
          type="button"
          className="illusion-button"
          aria-pressed={warped}
          onClick={() => setWarped((value) => !value)}
        >
          <span>{warped ? "Release reality" : "Bend reality"}</span>
          <Sparkles aria-hidden="true" />
        </button>

        <div className="kinetic-object" aria-hidden="true">
          <div className="kinetic-halo halo-a" />
          <div className="kinetic-halo halo-b" />
          <div className="kinetic-halo halo-c" />
          <div className="kinetic-core">
            <span>MODEL</span>
            <span>MAKE</span>
            <span>MEASURE</span>
          </div>
          <div className="crosshair crosshair-x" />
          <div className="crosshair crosshair-y" />
        </div>
      </div>

      <div className="hero-bottom">
        <p>
          I build software around measurable signals: audio, flow, behavior,
          and live operational data.
        </p>
        <a href="#work" className="scroll-link">
          Selected work <ArrowDownRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
