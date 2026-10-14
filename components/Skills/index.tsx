import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { Content } from "@/lib/cv";

const Skills = ({ content }: { content: Content }) => {
  const { skills } = content;

  return (
    <section
      id={skills.heading.id}
      className="section"
      aria-labelledby={`${skills.heading.id}-title`}
    >
      <SectionHeading heading={skills.heading} />
      <div className="skills-grid">
        {skills.groups.map((group) => (
          <Reveal key={group.title} className="skill-slot">
            <div className="skill-group">
              <h3 className="skill-group-title">{group.title}</h3>
              <ul className="skill-items">
                {group.items.map((item) => (
                  <li key={item} className="skill-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;
