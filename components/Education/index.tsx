import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { Content } from "@/lib/cv";

const Education = ({ content }: { content: Content }) => {
  const { education } = content;

  return (
    <section
      id={education.heading.id}
      className="section"
      aria-labelledby={`${education.heading.id}-title`}
    >
      <SectionHeading heading={education.heading} />
      <div className="edu-grid">
        {education.items.map((item) => (
          <Reveal key={item.course} className="edu-slot">
            <article className="edu-card">
              <p className="edu-period">{item.period}</p>
              <h3 className="card-title">{item.course}</h3>
              <p className="edu-institution">{item.institution}</p>
            </article>
          </Reveal>
        ))}
        <Reveal className="edu-slot edu-slot-wide">
          <div className="skill-group lang-card">
            <h3 className="skill-group-title">{education.languagesTitle}</h3>
            <dl className="lang-list">
              {education.languages.map((language) => (
                <div key={language.name} className="lang-item">
                  <dt>{language.name}</dt>
                  <dd>{language.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Education;
