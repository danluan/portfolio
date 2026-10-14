import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { Content } from "@/lib/cv";

const Projects = ({ content }: { content: Content }) => {
  const { projects, ui } = content;

  return (
    <section
      id={projects.heading.id}
      className="section"
      aria-labelledby={`${projects.heading.id}-title`}
    >
      <SectionHeading heading={projects.heading} />
      <div className="projects-grid">
        {projects.items.map((item) => (
          <Reveal key={item.title} className="project-slot">
            <article className="project-card has-media">
              <div className="project-media">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                  />
                ) : (
                  <span className="project-media-placeholder" aria-hidden="true">
                    {ui.imagePlaceholder}
                  </span>
                )}
              </div>
              <div className="project-card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="project-desc">{item.summary}</p>
                <ul className="project-tech" aria-label={ui.techLabel}>
                  {item.tech.map((tech) => (
                    <li key={tech} className="tech-tag">
                      {tech}
                    </li>
                  ))}
                </ul>
                {(item.repoUrl || item.liveUrl) && (
                  <p className="project-links">
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {ui.liveLabel}
                      </a>
                    )}
                    {item.repoUrl && (
                      <a
                        href={item.repoUrl}
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {ui.repoLabel}
                      </a>
                    )}
                  </p>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
