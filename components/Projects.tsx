import { Text } from "@/lib/i18n/language-context";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section aria-labelledby="projects-title" className="section-spacing reveal" style={{ animationDelay: "180ms" }}>
      <h2
        id="projects-title"
        className="mb-[18px] text-headline-md text-ink"
      >
        <Text id="projects" />
      </h2>
      <ul className="m-0 flex list-none flex-col gap-[16px] p-0">
        {projects.map((project) => (
          <li key={project.href}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
