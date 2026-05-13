"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { damping: 26, stiffness: 420 });
  const smoothY = useSpring(cursorY, { damping: 26, stiffness: 420 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX - 9);
      cursorY.set(event.clientY - 9);
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setActive(Boolean(target.closest("a, button, [data-cursor='interactive']")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-[18px] w-[18px] rounded-full border border-cyan/70 bg-cyan/10 mix-blend-screen md:block"
      animate={{
        scale: active ? 2.45 : 1,
        opacity: active ? 0.42 : 0.9
      }}
      style={{
        x: smoothX,
        y: smoothY,
        boxShadow: "0 0 32px rgba(57,216,255,.55)"
      }}
    />
  );
}
