"use client";

import { useEffect, useRef } from "react";

interface Dot {
  origX: number;
  origY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
  isAccent: boolean;
}

export function PointerDotField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number | null = null;
    let dots: Dot[] = [];

    // Pointer state stored in local variables to avoid React re-renders
    const pointer = {
      x: -9999,
      y: -9999,
      isActive: false,
    };

    // Check prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
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

    // Color definitions in light editorial palette
    const defaultDotColor = "17, 17, 17"; // #111111
    const greenAccentColor = "34, 180, 85"; // #22B455
    const redAccentColor = "240, 68, 44"; // #F0442C

    const setupDots = (width: number, height: number) => {
      dots = [];
      const spacing = 28;
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);

      const startX = (width - cols * spacing) / 2;
      const startY = (height - rows * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const origX = startX + c * spacing;
          const origY = startY + r * spacing;

          // Subtle falloff: higher density and visibility on the right half & top half
          const xFactor = origX / width; // 0 (left) to 1 (right)
          const yFactor = 1 - origY / height; // 1 (top) to 0 (bottom)
          const densityScore = xFactor * 0.7 + yFactor * 0.3;

          // Skip some dots on the lower-left to keep headline area extra clean
          if (densityScore < 0.25 && Math.random() > 0.4) {
            continue;
          }

          const rand = Math.random();
          let color = defaultDotColor;
          let isAccent = false;
          let radius = 1.25;
          let baseAlpha = 0.12;

          if (rand < 0.04) {
            // Subtle green status accent
            color = greenAccentColor;
            isAccent = true;
            radius = 1.6;
            baseAlpha = 0.55;
          } else if (rand < 0.07) {
            // Subtle warm red accent
            color = redAccentColor;
            isAccent = true;
            radius = 1.5;
            baseAlpha = 0.45;
          } else {
            // Standard subtle ink dot
            baseAlpha = 0.08 + densityScore * 0.14;
            radius = 1 + (densityScore > 0.6 ? 0.3 : 0);
          }

          dots.push({
            origX,
            origY,
            x: origX,
            y: origY,
            vx: 0,
            vy: 0,
            radius,
            baseAlpha,
            color,
            isAccent,
          });
        }
      }
    };

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect.width;
      const height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      setupDots(width, height);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.beginPath();
        ctx.arc(dot.origX, dot.origY, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot.color}, ${dot.baseAlpha})`;
        ctx.fill();
      }
    };

    const render = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      ctx.clearRect(0, 0, width, height);

      const influenceRadius = 110;
      const influenceRadiusSq = influenceRadius * influenceRadius;
      const spring = 0.07;
      const damping = 0.82;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Pointer influence
        if (pointer.isActive) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < influenceRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / influenceRadius) * 4.5;
            dot.vx += (dx / dist) * force;
            dot.vy += (dy / dist) * force;
          }
        }

        // Spring back to original position
        const homeDx = dot.origX - dot.x;
        const homeDy = dot.origY - dot.y;
        dot.vx += homeDx * spring;
        dot.vy += homeDy * spring;

        // Apply velocity with damping
        dot.vx *= damping;
        dot.vy *= damping;
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Calculate visual feedback based on displacement
        const displacement = Math.sqrt(
          (dot.x - dot.origX) * (dot.x - dot.origX) +
            (dot.y - dot.origY) * (dot.y - dot.origY)
        );

        const currentAlpha = Math.min(
          dot.baseAlpha + (displacement / 20) * 0.35,
          0.85
        );
        const currentRadius = dot.radius + Math.min(displacement * 0.08, 0.8);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot.color}, ${currentAlpha})`;
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

    // Event handlers with local coordinates
    const handlePointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion) return;
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

    // Initialize sizing and observer
    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      if (prefersReducedMotion) {
        drawStatic();
      }
    });
    resizeObserver.observe(container);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    startAnimation();

    // Cleanup on unmount
    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
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
