import Link from "next/link";

interface ContactChannel {
  name: string;
  category: string;
  href: string;
  meta: string;
}

const contactChannels: ContactChannel[] = [
  {
    name: "Email",
    category: "Direct Communication",
    href: "#",
    meta: "Send a message (Placeholder)",
  },
  {
    name: "GitHub",
    category: "Code & Repositories",
    href: "#",
    meta: "View developer profile (Placeholder)",
  },
  {
    name: "LinkedIn",
    category: "Professional Network",
    href: "#",
    meta: "Connect professionally (Placeholder)",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full py-24 sm:py-36 border-b border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full space-y-16 sm:space-y-20">
        {/* Section Header with Status Accent */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <p className="font-mono text-xs uppercase tracking-widest text-[#A1A1A6]">
            04 &mdash; CONTACT
          </p>

          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#F5F5F5]">
            <span
              className="w-2 h-2 rounded-full bg-[#75E89A]"
              aria-hidden="true"
            />
            Open to opportunities
          </span>
        </div>

        {/* Large Editorial Headline & Subtitle */}
        <div className="space-y-6 max-w-4xl">
          <h2
            id="contact-heading"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F5F5] leading-[1.1]"
          >
            Let&apos;s Work Together
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-[#A1A1A6] leading-relaxed max-w-2xl">
            Have a project, opportunity, or idea in mind? Let&apos;s connect.
          </p>
        </div>

        {/* Contact Channels with Thin Dividers & Directional Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {contactChannels.map((channel) => (
            <Link
              key={channel.name}
              href={channel.href}
              className="group border border-white/10 p-6 sm:p-8 bg-[#111214] hover:border-white/25 transition-colors block space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#A1A1A6]">
                  {channel.category}
                </span>
                <span
                  className="font-mono text-sm text-[#F5F5F5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  &nearr;
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                  {channel.name}
                </h3>
                <p className="font-mono text-xs text-[#6F7075] mt-2">
                  {channel.meta}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
