interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    role: "Full Stack Developer (Placeholder)",
    organization: "Company / Organization Name",
    period: "YYYY — Present",
    description:
      "Placeholder description of engineering responsibilities, architectural decisions, and key features delivered across modern web technologies.",
  },
  {
    role: "Frontend Developer (Placeholder)",
    organization: "Company / Organization Name",
    period: "YYYY — YYYY",
    description:
      "Placeholder description of UI engineering, component development, user experience improvements, and performance optimizations.",
  },
  {
    role: "Software Engineering Intern (Placeholder)",
    organization: "Company / Organization Name",
    period: "YYYY — YYYY",
    description:
      "Placeholder description of foundational engineering tasks, testing, bug fixes, and collaboration with cross-functional development teams.",
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full py-20 sm:py-28 border-t border-[#262626]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="space-y-10">
          <div>
            <h2
              id="experience-heading"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F2]"
            >
              Experience
            </h2>
            <p className="text-base text-[#9A9A9A] mt-2">
              Professional history and engineering background. Placeholder items to be updated.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="border border-[#262626] rounded-lg p-6 sm:p-8 bg-[#0A0A0A] space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-[#F5F5F2]">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-[#9A9A9A]">{exp.organization}</p>
                  </div>
                  <span className="text-xs font-mono text-[#9A9A9A] uppercase tracking-wider">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-[#9A9A9A] leading-relaxed pt-1">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
