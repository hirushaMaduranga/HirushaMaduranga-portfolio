"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0B0C]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-baseline gap-6 sm:gap-8">
          <Link
            href="#home"
            className="font-mono text-lg sm:text-xl font-bold tracking-widest text-[#F5F5F5] hover:text-[#A1A1A6] transition-colors"
          >
            HIRUSHA
          </Link>

          {/* Desktop Editorial Metadata */}
          <div className="hidden lg:flex items-center gap-6 pl-6 border-l border-white/10">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#6F7075]">
              PORTFOLIO &apos;26
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#A1A1A6]">
              <span
                className="w-2 h-2 rounded-full bg-[#75E89A] shrink-0"
                aria-hidden="true"
              />
              OPEN TO OPPORTUNITIES
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-8"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-mono text-xs uppercase tracking-wider text-[#A1A1A6] hover:text-[#F5F5F5] transition-colors relative py-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#A1A1A6]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#75E89A] shrink-0"
              aria-hidden="true"
            />
            AVAILABLE
          </span>
          <button
            type="button"
            className="font-mono text-xs uppercase tracking-wider text-[#F5F5F5] px-3 py-1.5 border border-white/15 hover:border-white/30 transition-colors focus:outline-none"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <nav
          id="mobile-navigation"
          className="md:hidden border-t border-white/10 bg-[#0B0B0C] px-6 py-6 space-y-4"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#6F7075]">
              PORTFOLIO &apos;26
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#A1A1A6]">
              <span
                className="w-2 h-2 rounded-full bg-[#75E89A]"
                aria-hidden="true"
              />
              OPEN TO OPPORTUNITIES
            </span>
          </div>
          <div className="space-y-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block font-mono text-sm uppercase tracking-wider text-[#A1A1A6] hover:text-[#F5F5F5] py-1.5 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
