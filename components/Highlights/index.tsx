import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { CodeLine, Content, Highlight } from "@/lib/cv";

const CodePanel = ({ lines }: { lines: CodeLine[] }) => (
  <div className="featured-visual" aria-hidden="true">
    {lines.map((line, i) => (
      <div key={i} className="code-line">
        <span className="code-ln">{String(i + 1).padStart(2, "0")}</span>
        <span className="code-src" style={{ paddingLeft: `${line.indent * 2}ch` }}>
          {line.tokens.map((token, j) => (
            <span
              key={j}
              className={token.kind === "plain" ? undefined : `code-${token.kind}`}
            >
              {token.text}
            </span>
          ))}
        </span>
      </div>
    ))}
  </div>
);

const CardBody = ({ item, techLabel }: { item: Highlight; techLabel: string }) => (
  <>
    <span className="project-badge">{item.badge}</span>
    <h3 className="card-title">{item.title}</h3>
    <p className="project-desc">{item.description}</p>
    <ul className="project-tech" aria-label={techLabel}>
      {item.tech.map((tech) => (
        <li key={tech} className="tech-tag">
          {tech}
        </li>
      ))}
    </ul>
    <p className="project-meta">
      {item.period ? `${item.company} · ${item.period}` : item.company}
    </p>
  </>
);

const Highlights = ({ content }: { content: Content }) => {
  const { highlights, ui } = content;

  return (
    <section
      id={highlights.heading.id}
      className="section"
      aria-labelledby={`${highlights.heading.id}-title`}
    >
      <SectionHeading heading={highlights.heading} />
      <div className="projects-grid">
        {highlights.items.map((item) =>
          item.featured ? (
            <Reveal key={item.title} className="project-slot featured">
              <article className="project-card featured">
                <div className="project-card-body">
                  <CardBody item={item} techLabel={ui.techLabel} />
                </div>
                {item.code && <CodePanel lines={item.code} />}
              </article>
            </Reveal>
          ) : (
            <Reveal key={item.title} className="project-slot">
              <article className="project-card">
                <CardBody item={item} techLabel={ui.techLabel} />
              </article>
            </Reveal>
          ),
        )}
      </div>
    </section>
  );
};

export default Highlights;
