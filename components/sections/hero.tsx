import Link from "next/link";
import { PointerDotField } from "@/components/effects/pointer-dot-field";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative w-full py-24 sm:py-36 lg:py-44 overflow-hidden border-b border-[#111111]/20"
    >
      {/* Interactive Dot Field Canvas */}
      <PointerDotField />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 w-full">
        {/* Editorial Subheader / Identifier */}
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <span className="w-6 h-px bg-[#F0442C]" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-widest text-[#646464]">
            Hirusha Maduranga &mdash; Full Stack Developer
          </p>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#111111] leading-[1.08] max-w-5xl">
          <span className="text-[#F0442C]">Full Stack development</span> for
          modern digital experiences.
        </h1>

        {/* Editorial Content & Actions Split Layout */}
        <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-[#111111]/20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="text-base sm:text-lg lg:text-xl text-[#646464] leading-relaxed max-w-xl">
            I design and build modern, responsive, and scalable web applications
            across frontend and backend systems.
          </p>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 shrink-0">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#111111] px-5 py-3 border border-[#111111]/20 hover:border-[#111111] hover:text-[#F0442C] transition-colors"
            >
              View Projects &darr;
            </Link>

            <Link
              href="#contact"
              className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#111111] hover:text-[#F0442C] transition-colors py-3"
            >
              <span>GET IN TOUCH</span>
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#F0442C]"
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
