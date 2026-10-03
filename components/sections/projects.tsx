import Link from "next/link";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A placeholder web application showcasing frontend architecture, responsive layouts, and backend API integration.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "#",
  },
  {
    title: "Project Two",
    description:
      "A placeholder full stack system featuring server-side rendering, database interactions, and secure authentication flow.",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Project Three",
    description:
      "A placeholder developer tool focused on real-time data processing, API endpoints, and clean user interface components.",
    tags: ["TypeScript", "REST API", "Database"],
    link: "#",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="w-full py-20 sm:py-28 border-t border-[#262626]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="space-y-10">
          <div>
            <h2
              id="projects-heading"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F2]"
            >
              Selected Projects
            </h2>
            <p className="text-base text-[#9A9A9A] mt-2">
              Featured work and technical experiments. More projects will be added soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project) => (
              <article
                key={project.title}
                className="border border-[#262626] rounded-lg p-6 sm:p-8 flex flex-col justify-between hover:border-[#9A9A9A]/40 transition-colors bg-[#0A0A0A]"
              >
                <div>
                  <h3 className="text-xl font-medium text-[#F5F5F2]">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#9A9A9A] mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-6" aria-label="Technologies used">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[#9A9A9A] border border-[#262626] px-2.5 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#262626]">
                  <Link
                    href={project.link}
                    className="text-sm font-medium text-[#F5F5F2] hover:text-[#9A9A9A] transition-colors inline-flex items-center gap-1.5"
                  >
                    View Project &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
