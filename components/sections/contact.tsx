import Link from "next/link";

interface ContactItem {
  label: string;
  href: string;
  description: string;
}

const contactItems: ContactItem[] = [
  {
    label: "Email",
    href: "#",
    description: "Send an email (Placeholder)",
  },
  {
    label: "GitHub",
    href: "#",
    description: "View profile (Placeholder)",
  },
  {
    label: "LinkedIn",
    href: "#",
    description: "Connect on LinkedIn (Placeholder)",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full py-20 sm:py-28 border-t border-[#262626]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-3xl space-y-8">
          <div>
            <h2
              id="contact-heading"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F2]"
            >
              Let&apos;s Work Together
            </h2>
            <p className="text-base sm:text-lg text-[#9A9A9A] mt-3">
              Have a project, opportunity, or idea in mind? Let&apos;s connect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {contactItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="border border-[#262626] rounded-lg p-5 bg-[#0A0A0A] hover:border-[#9A9A9A]/50 transition-colors block"
              >
                <span className="text-sm font-medium text-[#F5F5F2] block">
                  {item.label}
                </span>
                <span className="text-xs text-[#9A9A9A] mt-1 block">
                  {item.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
