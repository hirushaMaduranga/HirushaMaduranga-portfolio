"use client";

import { useEffect, useRef } from "react";

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  idlePhaseX: number;
  idlePhaseY: number;
  idleSpeedX: number;
  idleSpeedY: number;
  idleAmpX: number;
  idleAmpY: number;
}

export function InteractiveParticleField() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number | null = null;
    let particles: Particle[] = [];

    // Pointer state stored locally outside React state
    const pointer = {
      x: -9999,
      y: -9999,
      isActive: false,
    };

    // Detect touch / coarse pointer
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    // Check prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let prefersReducedMotion = reducedMotionQuery.matches;

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        if (animId) cancelAnimationFrame(animId);
        drawStatic();
      } else {
        startAnimation();
      }
    };
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    // Monochrome color variants in light theme
    const colorTiers = [
      { rgb: "17, 17, 17", minAlpha: 0.18, maxAlpha: 0.35, weight: 0.4 }, // Low-opacity grey
      { rgb: "60, 60, 60", minAlpha: 0.3, maxAlpha: 0.55, weight: 0.35 }, // Dark grey
      { rgb: "17, 17, 17", minAlpha: 0.6, maxAlpha: 0.85, weight: 0.25 }, // Near black
    ];

    const pickColor = () => {
      const rand = Math.random();
      let cumulative = 0;
      for (const tier of colorTiers) {
        cumulative += tier.weight;
        if (rand <= cumulative) {
          const alpha =
            tier.minAlpha + Math.random() * (tier.maxAlpha - tier.minAlpha);
          return { color: tier.rgb, alpha };
        }
      }
      return { color: "17, 17, 17", alpha: 0.25 };
    };

    const setupParticles = (width: number, height: number) => {
      particles = [];

      // Determine count based on screen size
      let count = 280;
      if (width < 640) {
        count = 75; // Light density for mobile
      } else if (width < 1024) {
        count = 160; // Medium density for tablets
      }

      for (let i = 0; i < count; i++) {
        // Biased distribution: concentrate around lower-right area of the Hero
        // Uses power distribution to cluster toward the right (x > 0.35) and bottom (y > 0.3)
        const rx = Math.pow(Math.random(), 0.65); // Bias toward 1 (right)
        const ry = Math.pow(Math.random(), 0.7); // Bias toward 1 (bottom)

        // Spread mainly within 30% to 100% of width, and 25% to 100% of height
        const baseX = width * (0.28 + 0.72 * rx) + (Math.random() - 0.5) * 40;
        const baseY = height * (0.25 + 0.75 * ry) + (Math.random() - 0.5) * 40;

        const { color, alpha } = pickColor();
        const radius = 0.9 + Math.random() * 1.3; // Tiny dots: 0.9px to 2.2px

        particles.push({
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          vx: 0,
          vy: 0,
          radius,
          color,
          alpha,
          idlePhaseX: Math.random() * Math.PI * 2,
          idlePhaseY: Math.random() * Math.PI * 2,
          idleSpeedX: 0.0008 + Math.random() * 0.0012,
          idleSpeedY: 0.0008 + Math.random() * 0.0012,
          idleAmpX: 3 + Math.random() * 7,
          idleAmpY: 2.5 + Math.random() * 6,
        });
      }
    };

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      setupParticles(width, height);
    };

    const drawStatic = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.baseX, p.baseY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      }
    };

    let time = 0;

    const render = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      ctx.clearRect(0, 0, width, height);

      time += 1;

      const repelRadius = 125;
      const repelRadiusSq = repelRadius * repelRadius;
      const spring = 0.045; // Gentle return easing
      const damping = 0.85; // Natural smooth deceleration

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Subtle organic idle movement (breathing field)
        const idleX =
          p.baseX + Math.sin(time * p.idleSpeedX + p.idlePhaseX) * p.idleAmpX;
        const idleY =
          p.baseY + Math.cos(time * p.idleSpeedY + p.idlePhaseY) * p.idleAmpY;

        // Pointer proximity repulsion (disabled for touch to prevent interference)
        if (pointer.isActive && !isTouchDevice) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < repelRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            // Non-linear falloff: closer particles move away with higher response
            const factor = Math.pow(1 - dist / repelRadius, 1.6);
            const force = factor * 4.8;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Spring force pulling particle back to its gentle idle position
        const targetDx = idleX - p.x;
        const targetDy = idleY - p.y;
        p.vx += targetDx * spring;
        p.vy += targetDy * spring;

        // Damping velocity
        p.vx *= damping;
        p.vy *= damping;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Calculate dynamic alpha slightly brightening upon proximity
        const displacement = Math.sqrt(
          (p.x - idleX) * (p.x - idleX) + (p.y - idleY) * (p.y - idleY)
        );
        const dynamicAlpha = Math.min(
          p.alpha + (displacement / 25) * 0.25,
          0.9
        );

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${dynamicAlpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (animId) cancelAnimationFrame(animId);
      if (prefersReducedMotion) {
        drawStatic();
      } else {
        animId = requestAnimationFrame(render);
      }
    };

    // Pointer events with local container coordinates
    const handlePointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion || isTouchDevice) return;
      const rect = container.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.isActive = true;
    };

    const handlePointerLeave = () => {
      pointer.isActive = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    // Initialize layout and resize observer
    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      if (prefersReducedMotion) {
        drawStatic();
      }
    });
    resizeObserver.observe(container);

    if (!isTouchDevice) {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      document.addEventListener("pointerleave", handlePointerLeave, {
        passive: true,
      });
    }

    startAnimation();

    // Comprehensive cleanup on unmount
    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      if (!isTouchDevice) {
        window.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerleave", handlePointerLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
