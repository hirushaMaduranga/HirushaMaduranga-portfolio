import Link from "next/link";

interface ProjectItem {
  index: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link: string;
}

const projects: ProjectItem[] = [
  {
    index: "01",
    title: "Project One",
    category: "Full Stack Platform",
    description:
      "A modern web application featuring scalable frontend architecture, performant server-side rendering, and robust backend API integration.",
    highlights: [
      "Engineered responsive UI systems with strict component reusability",
      "Integrated typed API communication layers with structured error handling",
      "Optimized client-server data flow and loading states",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
    link: "#",
  },
  {
    index: "02",
    title: "Project Two",
    category: "Web Application & Database",
    description:
      "A data-driven application designed for reliable transaction handling, schema management, and intuitive user workflows.",
    highlights: [
      "Constructed normalized database models with transactional integrity",
      "Implemented secure authentication and route authorization workflows",
      "Designed an accessible management interface with real-time feedback",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Prisma"],
    link: "#",
  },
  {
    index: "03",
    title: "Project Three",
    category: "Developer Tool & Systems",
    description:
      "A developer-oriented utility focused on workflow optimization, data transformation pipelines, and clean modular utilities.",
    highlights: [
      "Built low-latency processing routines with strict type definitions",
      "Created configurable developer settings and export utilities",
      "Maintained thorough unit testing and clean deployment pipelines",
    ],
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Docker"],
    link: "#",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="w-full py-24 sm:py-36 border-b border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full space-y-16 sm:space-y-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-[#A1A1A6]">
              01 &mdash; SELECTED PROJECTS
            </p>
            <h2
              id="projects-heading"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F5]"
            >
              Featured Works
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-[#6F7075] max-w-sm">
            Architectural and full-stack implementations. Project screenshots and detailed case studies will be integrated later.
          </p>
        </div>

        {/* Project Items with Thin Dividers and Editorial Split */}
        <div className="divide-y divide-white/10">
          {projects.map((project) => (
            <article
              key={project.index}
              className="py-12 sm:py-16 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start group"
            >
              {/* Project Meta & Details (7 cols on lg) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#6F7075]">
                    P. {project.index}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#A1A1A6]">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] group-hover:text-white transition-colors">
                  {project.title}
                </h3>

                <p className="text-base sm:text-lg text-[#A1A1A6] leading-relaxed">
                  {project.description}
                </p>

                {/* Technical Highlights */}
                <div className="space-y-2 pt-2">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#F5F5F5] font-semibold">
                    Key Highlights
                  </p>
                  <ul className="space-y-1.5">
                    {project.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-[#A1A1A6] flex items-start gap-2.5"
                      >
                        <span className="text-white/40 select-none">&bull;</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies & Action Link */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                  <div
                    className="flex flex-wrap gap-2"
                    aria-label="Technologies used"
                  >
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] uppercase tracking-wider text-[#A1A1A6] bg-[#111214] border border-white/10 px-2.5 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={project.link}
                    className="group/link inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#F5F5F5] hover:text-white transition-colors py-1"
                  >
                    <span>View Project</span>
                    <span
                      className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 text-[#F5F5F5]"
                      aria-hidden="true"
                    >
                      &nearr;
                    </span>
                  </Link>
                </div>
              </div>

              {/* Placeholder Media Area (5 cols on lg) */}
              <div className="lg:col-span-5 w-full">
                <div className="w-full aspect-[16/10] border border-white/10 bg-[#111214] flex flex-col items-center justify-center p-6 text-center group-hover:border-white/20 transition-colors">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#6F7075]">
                    [ Screenshot Placeholder &mdash; {project.title} ]
                  </span>
                  <span className="font-mono text-[10px] text-[#6F7075]/70 mt-2">
                    Media asset will be linked here
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
