interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5 / CSS3",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express",
      "RESTful APIs",
      "Authentication",
      "API Integration",
    ],
  },
  {
    title: "Database",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Prisma ORM",
      "Database Design",
    ],
  },
  {
    title: "Tools",
    skills: [
      "Git & GitHub",
      "VS Code",
      "Postman",
      "Docker (Basics)",
      "pnpm / npm",
      "Vercel",
    ],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="w-full py-20 sm:py-28 border-t border-[#262626]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="space-y-10">
          <div>
            <h2
              id="skills-heading"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F2]"
            >
              Skills &amp; Technologies
            </h2>
            <p className="text-base text-[#9A9A9A] mt-2">
              Technologies and tools used for building scalable applications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="border border-[#262626] rounded-lg p-6 bg-[#0A0A0A] space-y-4"
              >
                <h3 className="text-lg font-medium text-[#F5F5F2] border-b border-[#262626] pb-3">
                  {category.title}
                </h3>
                <ul className="space-y-2.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-[#9A9A9A] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#262626]" aria-hidden="true" />
                      {skill}
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
