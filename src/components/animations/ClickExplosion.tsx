"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register the React plugin with GSAP
gsap.registerPlugin(useGSAP);

// Lucide React Snowflake SVG
const SNOWFLAKE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-snowflake"><path d="m10 20-1.25-2.5L6 18"/><path d="M12 22v-6.5"/><path d="m14 20 1.25-2.5L18 18"/><path d="m18 6-2.5 1.25L14 4"/><path d="m18 18-2.5-1.25L14 20"/><path d="m20 10-2.5 1.25L18 14"/><path d="M22 12h-6.5"/><path d="m20 14-2.5-1.25L18 10"/><path d="m4 10 2.5 1.25L6 14"/><path d="M2 12h6.5"/><path d="m4 14 2.5-1.25L6 10"/><path d="m6 6 2.5 1.25L10 4"/><path d="M12 2v6.5"/><path d="m6 18 2.5-1.25L10 20"/></svg>`;

export function ClickExplosion() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Tweakables for the explosion
    const emitterSize = 60;
    const dotQuantity = 50; // 20 snowflakes per click
    const dotSizeMax = 30;
    const dotSizeMin = 10;
    const speed = 2;

    const handleClick = (e: MouseEvent) => {
      // Create a temporary wrapper for this specific explosion
      const explosion = document.createElement("div");
      explosion.style.cssText = `position:absolute; left:${e.clientX}px; top:${e.clientY}px; overflow:visible; z-index:10000; pointer-events:none;`;
      container.appendChild(explosion);

      // Create a GSAP timeline that cleans up the DOM node after it finishes
      const tl = gsap.timeline({
        onComplete: () => {
          if (container.contains(explosion)) {
            container.removeChild(explosion);
          }
        }
      });

      for (let i = 0; i < dotQuantity; i++) {
        const dot = document.createElement("div");
        // Apply neon green color using Tailwind text-primary
        dot.className = "text-primary absolute flex items-center justify-center";
        dot.innerHTML = SNOWFLAKE_SVG;
        
        const size = gsap.utils.random(dotSizeMin, dotSizeMax, 1);
        explosion.appendChild(dot);

        const angle = Math.random() * Math.PI * 2; // random direction in radians
        const length = Math.random() * (emitterSize / 2 - size / 2);

        // Initial state
        gsap.set(dot, {
          x: Math.cos(angle) * length,
          y: Math.sin(angle) * length,
          width: size,
          height: size,
          xPercent: -50,
          yPercent: -50,
          force3D: true,
          rotation: Math.random() * 360,
          opacity: 1
        });

        const duration = 0.6 + Math.random() * 0.4; // 0.6 to 1.0 seconds
        
        // Random spin direction and amount
        const spin = (Math.random() < 0.5 ? -1 : 1) * (90 + Math.random() * 270);

        // Animate outward and spin (Fallback for Physics2DPlugin)
        tl.to(
          dot,
          {
            x: Math.cos(angle) * length * (3 + Math.random() * speed * 3),
            y: Math.sin(angle) * length * (3 + Math.random() * speed * 3),
            rotation: `+=${spin}`,
            duration: duration,
            ease: "power2.out"
          },
          0
        ).to(
          dot,
          {
            opacity: 0,
            duration: duration * 0.5,
            ease: "power2.inOut"
          },
          duration * 0.5 // Start fading halfway through
        );
      }
    };

    // Attach listener globally to window
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      // fixed inset-0 means 0,0 is the top-left of the viewport, which perfectly matches e.clientX/Y
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" 
      aria-hidden="true" 
    />
  );
}
