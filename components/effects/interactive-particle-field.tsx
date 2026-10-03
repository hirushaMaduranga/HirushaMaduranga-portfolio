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
  baseAlpha: number;
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

    const setupParticles = (width: number, height: number) => {
      particles = [];

      // Determine count based on screen size
      let count = 280;
      if (width < 640) {
        count = 70; // Light density for mobile
      } else if (width < 1024) {
        count = 150; // Medium density for tablets
      }

      for (let i = 0; i < count; i++) {
        // Biased distribution: concentrate around lower half and right side areas of the Hero
        const rx = Math.pow(Math.random(), 0.65); // Bias toward 1 (right)
        const ry = Math.pow(Math.random(), 0.7); // Bias toward 1 (bottom)

        const baseX = width * (0.3 + 0.7 * rx) + (Math.random() - 0.5) * 40;
        const baseY = height * (0.3 + 0.7 * ry) + (Math.random() - 0.5) * 40;

        // Particle opacities for dark theme:
        // Distant: 0.05 to 0.08, Normal: 0.15 to 0.20
        const isDistant = Math.random() < 0.45;
        const baseAlpha = isDistant
          ? 0.05 + Math.random() * 0.03 // 0.05 - 0.08
          : 0.15 + Math.random() * 0.05; // 0.15 - 0.20

        const radius = isDistant
          ? 0.8 + Math.random() * 0.6 // Tiny distant dots
          : 1.1 + Math.random() * 0.9; // Normal dots

        particles.push({
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          vx: 0,
          vy: 0,
          radius,
          baseAlpha,
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
        ctx.fillStyle = `rgba(255, 255, 255, ${p.baseAlpha})`;
        ctx.fill();
      }
    };

    let time = 0;

    const render = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      ctx.clearRect(0, 0, width, height);

      time += 1;

      const repelRadius = 120;
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
            const force = factor * 4.6;
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

        // Calculate dynamic alpha brightening near pointer up to ~0.60
        const displacement = Math.sqrt(
          (p.x - idleX) * (p.x - idleX) + (p.y - idleY) * (p.y - idleY)
        );
        const dynamicAlpha = Math.min(
          p.baseAlpha + (displacement / 24) * 0.42,
          0.6
        );

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
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
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange
      );
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
