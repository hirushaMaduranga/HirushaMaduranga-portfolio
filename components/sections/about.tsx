export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full py-20 sm:py-28 border-t border-[#262626]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-3xl space-y-6">
          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F2]"
          >
            About Me
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#9A9A9A] leading-relaxed">
            <p>
              I am a Full Stack Developer dedicated to crafting modern, scalable,
              and user-centered web applications. With experience across both
              frontend and backend systems, I enjoy solving real-world problems
              through clean code and intuitive design.
            </p>
            <p>
              Currently exploring modern web architectures, performance
              optimization, and scalable software design. This section serves as
              an editable overview and will be updated with more background,
              interests, and milestones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
