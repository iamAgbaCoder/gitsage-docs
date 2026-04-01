"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MeshBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <div className="mesh-bg fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
      {/* Dynamic Glow - Hidden on Mobile for Performance */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
        }}
        className="fixed hidden md:block w-[600px] h-[600px] rounded-full pointer-events-none z-0 bg-sage/5 blur-[80px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
    </>
  );
}
