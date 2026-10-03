import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0B0B0C] border-t border-white/10 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-base sm:text-lg font-bold text-[#F5F5F5]">
            Hirusha Maduranga
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-[#A1A1A6] mt-1">
            Full Stack Developer
          </p>
          <p className="font-mono text-[11px] text-[#6F7075] mt-4">
            &copy; {currentYear} Hirusha Maduranga. All rights reserved.
          </p>
        </div>

        <div>
          <Link
            href="#home"
            className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#F5F5F5] hover:text-white transition-colors py-2"
          >
            <span>Back to Top</span>
            <span
              className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 text-[#F5F5F5]"
              aria-hidden="true"
            >
              &uarr;
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
