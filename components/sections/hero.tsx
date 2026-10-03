import Link from "next/link";
import { InteractiveParticleField } from "@/components/effects/interactive-particle-field";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative w-full py-24 sm:py-36 lg:py-44 overflow-hidden border-b border-white/10"
    >
      {/* Subtle Interactive Particle Field Background */}
      <InteractiveParticleField />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 w-full">
        {/* Editorial Subheader / Identifier */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <span className="w-6 h-px bg-white/30" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-widest text-[#A1A1A6]">
            Hirusha Maduranga &mdash; Full Stack Developer
          </p>
        </div>

        {/* Large Bold Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F5F5F5] leading-[1.08] max-w-5xl">
          Full Stack development.
          <br className="hidden sm:inline" />
          Built for the web.
        </h1>

        {/* Editorial Content & Actions Split Layout */}
        <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-white/10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="text-base sm:text-lg lg:text-xl text-[#A1A1A6] leading-relaxed max-w-xl">
            I design and build modern, responsive, and scalable web applications
            across frontend and backend systems.
          </p>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 shrink-0">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#F5F5F5] px-5 py-3 border border-white/20 hover:border-white hover:bg-white/5 transition-colors"
            >
              View Projects &darr;
            </Link>

            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#F5F5F5] py-3 hover:text-white transition-colors"
            >
              <span>GET IN TOUCH</span>
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#F5F5F5]"
                aria-hidden="true"
              >
                &nearr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
