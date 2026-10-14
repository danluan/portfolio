import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import SectionHeading from "@/components/SectionHeading";
import type { Content } from "@/lib/cv";

const Experience = ({ content }: { content: Content }) => {
  const { experience, ui } = content;

  return (
    <section
      id={experience.heading.id}
      className="section"
      aria-labelledby={`${experience.heading.id}-title`}
    >
      <SectionHeading heading={experience.heading} />
      <ol className="exp-list">
        {experience.items.map((item) => (
          <li key={`${item.company}-${item.period}`} className="exp-item">
            <Reveal>
              <div className="exp-meta">
                <div>
                  <h3 className="exp-role">{item.role}</h3>
                  <p className="exp-company">{item.company}</p>
                </div>
                <span className="exp-period">{item.period}</span>
              </div>
              <ul className="exp-tech" aria-label={ui.techLabel}>
                {item.tech.map((tech) => (
                  <li key={tech} className="tech-tag">
                    {tech}
                  </li>
                ))}
              </ul>
              <ul className="exp-bullets">
                {item.bullets.map((bullet, i) => (
                  <li key={i}>
                    <RichText text={bullet} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
