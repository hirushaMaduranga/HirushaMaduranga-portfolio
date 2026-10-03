import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="w-full py-24 sm:py-32 lg:py-40 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm sm:text-base font-medium text-[#9A9A9A] tracking-wide">
            Hello, I&apos;m
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F5F2]">
            Hirusha Maduranga
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-[#9A9A9A]">
            Full Stack Developer
          </p>

          <p className="text-base sm:text-lg text-[#9A9A9A] leading-relaxed max-w-2xl pt-2">
            I build modern, responsive, and user-focused web applications using
            frontend and backend technologies.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md bg-[#F5F5F2] text-[#0A0A0A] hover:bg-transparent hover:text-[#F5F5F2] border border-[#F5F5F2] transition-colors"
            >
              View Projects
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md bg-transparent text-[#F5F5F2] hover:border-[#9A9A9A] border border-[#262626] transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
