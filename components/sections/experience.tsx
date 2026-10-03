interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    period: "Year — Present",
    role: "Full Stack Developer (Placeholder)",
    company: "Company Name (Placeholder)",
    description:
      "Placeholder description of engineering responsibilities, architectural decisions, and key features delivered across modern web technologies.",
  },
  {
    period: "Year — Year",
    role: "Frontend Developer (Placeholder)",
    company: "Company Name (Placeholder)",
    description:
      "Placeholder description of UI engineering, component development, user experience improvements, and performance optimizations.",
  },
  {
    period: "Year — Year",
    role: "Software Engineering Intern (Placeholder)",
    company: "Company Name (Placeholder)",
    description:
      "Placeholder description of foundational engineering tasks, testing, bug fixes, and collaboration with cross-functional development teams.",
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full py-24 sm:py-36 border-b border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-[#A1A1A6]">
              02 &mdash; EXPERIENCE
            </p>
            <h2
              id="experience-heading"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F5]"
            >
              Work History
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-[#6F7075] max-w-sm">
            Professional background and software development history. Structured placeholder data to be finalized.
          </p>
        </div>

        {/* Editorial Timeline / List with Thin Horizontal Dividers */}
        <div className="divide-y divide-white/10 border-b border-white/10">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
            >
              {/* Period in Monospace */}
              <div className="md:col-span-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#6F7075]">
                  {exp.period}
                </span>
              </div>

              {/* Role, Company, and Description */}
              <div className="md:col-span-9 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#A1A1A6]">
                    {exp.company}
                  </span>
                </div>
                <p className="text-base text-[#A1A1A6] leading-relaxed max-w-3xl pt-1">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
