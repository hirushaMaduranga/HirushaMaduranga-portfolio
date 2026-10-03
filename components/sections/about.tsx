interface TechGroup {
  category: string;
  items: string[];
}

const techStack: TechGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "FastAPI"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Docker"],
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full py-20 sm:py-28 border-t border-[#262626]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-16">
        {/* About Me Story / Bio */}
        <div className="space-y-6 max-w-3xl">
          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F2]"
          >
            About Me
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#9A9A9A] leading-relaxed">
            <p>
              I am a Full Stack Developer interested in building modern,
              responsive, and user-focused web applications. I enjoy creating
              clean interfaces and robust backend services that solve everyday
              problems.
            </p>
            <p>
              This section is designed to be easily editable. A personal photo or
              expanded biography can be added here as the portfolio evolves.
            </p>
          </div>
        </div>

        {/* Tech Stack inside About */}
        <div className="space-y-8 pt-6 border-t border-[#262626]">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F5F2]">
              Tech Stack
            </h3>
            <p className="text-sm text-[#9A9A9A] mt-1">
              Core technologies and tools I work with across the stack.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((group) => (
              <div
                key={group.category}
                className="border border-[#262626] rounded-lg p-6 bg-[#0A0A0A] space-y-4"
              >
                <h4 className="text-base font-medium text-[#F5F5F2] border-b border-[#262626] pb-3">
                  {group.category}
                </h4>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-[#9A9A9A] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#262626]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
