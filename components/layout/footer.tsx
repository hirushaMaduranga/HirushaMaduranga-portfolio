import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#262626] bg-[#0A0A0A] mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-base font-medium text-[#F5F5F2]">Hirusha Maduranga</p>
          <p className="text-sm text-[#9A9A9A] mt-0.5">Full Stack Developer</p>
          <p className="text-xs text-[#9A9A9A] mt-4">
            &copy; {currentYear} Hirusha Maduranga. All rights reserved.
          </p>
        </div>

        <div>
          <Link
            href="#home"
            className="text-sm text-[#9A9A9A] hover:text-[#F5F5F2] transition-colors inline-flex items-center gap-1.5"
          >
            Back to Top &uarr;
          </Link>
        </div>
      </div>
    </footer>
  );
}
