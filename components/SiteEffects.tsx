"use client";

import { useEffect } from "react";

export function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
      root.style.setProperty("--pointer-rx", `${(event.clientY / window.innerHeight - 0.5) * -10}deg`);
      root.style.setProperty("--pointer-ry", `${(event.clientX / window.innerWidth - 0.5) * 10}deg`);
    };
    const onScroll = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", `${distance > 0 ? window.scrollY / distance : 0}`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
