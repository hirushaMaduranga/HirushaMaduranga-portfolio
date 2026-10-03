interface TechGroup {
  category: string;
  items: string[];
}

const techStack: TechGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5 / CSS3"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "FastAPI", "RESTful APIs", "Authentication"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Prisma ORM", "Schema Design"],
  },
  {
    category: "Tools",
    items: ["Git & GitHub", "Docker", "VS Code", "Postman", "pnpm / npm"],
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full py-24 sm:py-36 border-b border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full space-y-16 sm:space-y-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-[#A1A1A6]">
              03 &mdash; ABOUT
            </p>
            <h2
              id="about-heading"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F5]"
            >
              Background &amp; Stack
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-[#6F7075] max-w-sm">
            Core philosophies, software engineering background, and technical toolkit.
          </p>
        </div>

        {/* Editorial Split Layout (Left: About Text & Image Slot, Right: Tech Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: About Me */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                About Me
              </h3>
              <p className="text-base sm:text-lg text-[#A1A1A6] leading-relaxed">
                I am a Full Stack Developer interested in building modern,
                responsive, and scalable web applications across frontend and backend
                systems.
              </p>
              <p className="text-base sm:text-lg text-[#A1A1A6] leading-relaxed">
                I enjoy structuring maintainable architectures, optimizing data flows,
                and creating user-focused interfaces that feel effortless to navigate.
              </p>
            </div>

            {/* Profile Photo Placeholder Slot */}
            <div className="w-full aspect-[4/3] border border-white/10 bg-[#111214] flex flex-col items-center justify-center p-6 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-[#6F7075]">
                [ Portrait / Image Placeholder ]
              </span>
              <span className="font-mono text-[10px] text-[#6F7075]/70 mt-2">
                Personal portrait will be placed here
              </span>
            </div>
          </div>

          {/* Right Column: Tech Stack */}
          <div className="lg:col-span-7 space-y-8 lg:border-l lg:border-white/10 lg:pl-16">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                Tech Stack
              </h3>
              <p className="font-mono text-xs uppercase tracking-wider text-[#6F7075]">
                Categorized technical competencies &mdash; text-based spec
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {techStack.map((group, idx) => (
                <div
                  key={group.category}
                  className="border-t border-white/10 pt-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#F5F5F5] font-semibold">
                      {group.category}
                    </h4>
                    <span className="font-mono text-[10px] text-[#6F7075]">
                      0{idx + 1}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm sm:text-base text-[#A1A1A6] flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
