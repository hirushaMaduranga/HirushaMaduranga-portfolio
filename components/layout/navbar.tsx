"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A] border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="#home"
          className="text-base sm:text-lg font-medium text-[#F5F5F2] hover:text-[#9A9A9A] transition-colors"
        >
          Hirusha Maduranga
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#9A9A9A] hover:text-[#F5F5F2] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-sm font-medium text-[#9A9A9A] hover:text-[#F5F5F2] px-3 py-1.5 border border-[#262626] rounded transition-colors focus:outline-none focus:ring-1 focus:ring-[#9A9A9A]"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <nav
          id="mobile-navigation"
          className="md:hidden border-t border-[#262626] bg-[#0A0A0A] px-6 py-4 space-y-3"
          aria-label="Mobile Navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-[#9A9A9A] hover:text-[#F5F5F2] py-2 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
