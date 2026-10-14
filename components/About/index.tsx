import Reveal from "@/components/Reveal";
import RichText from "@/components/RichText";
import SectionHeading from "@/components/SectionHeading";
import type { Content } from "@/lib/cv";

const About = ({ content }: { content: Content }) => {
  const { about } = content;

  return (
    <section
      id={about.heading.id}
      className="section"
      aria-labelledby={`${about.heading.id}-title`}
    >
      <SectionHeading heading={about.heading} />
      <div className="about-grid">
        <Reveal className="about-text">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>
              <RichText text={paragraph} />
            </p>
          ))}
        </Reveal>
        <Reveal>
          <dl className="about-stats">
            {about.stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <dt className="stat-label">{stat.label}</dt>
                <dd className="stat-num">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
