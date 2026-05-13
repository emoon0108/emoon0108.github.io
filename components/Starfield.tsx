"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  speed: number;
};

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const resize = () => {
      width = canvas.width = window.innerWidth * window.devicePixelRatio;
      height = canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      particles = Array.from({ length: Math.min(150, Math.floor(window.innerWidth / 9)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.45 + 0.12
      }));
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(57, 216, 255, 0.8)";
      context.strokeStyle = "rgba(155, 92, 255, 0.12)";

      particles.forEach((particle, index) => {
        particle.y += particle.speed * window.devicePixelRatio;
        particle.x += Math.sin((Date.now() * 0.0002 + index) * particle.z) * 0.12;

        if (particle.y > height) {
          particle.y = -10;
          particle.x = Math.random() * width;
        }

        const radius = particle.z * 1.4;
        context.globalAlpha = particle.z * 0.55;
        context.beginPath();
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        context.fill();

        if (index % 9 === 0) {
          context.globalAlpha = 0.16;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(particle.x + 42 * particle.z, particle.y + 12 * particle.z);
          context.stroke();
        }
      });

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 z-0 opacity-70" />;
}
