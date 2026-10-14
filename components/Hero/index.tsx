import { Fragment } from "react";
import RichText from "@/components/RichText";
import type { Content } from "@/lib/cv";

const Hero = ({ content }: { content: Content }) => {
  const { hero, ui } = content;

  return (
    <section id="top" className="hero" aria-labelledby="top-title">
      <div className="hero-inner">
        <p className="hero-tag">{hero.tag}</p>
        <h1 id="top-title" className="hero-title">
          {hero.title.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              <RichText text={line} />
            </Fragment>
          ))}
        </h1>
        <p className="hero-sub">
          <RichText text={hero.sub} />
        </p>
        <div className="hero-cta">
          {hero.actions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              className={action.variant === "primary" ? "btn-primary" : "btn-ghost"}
              {...(action.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {action.label}
            </a>
          ))}
        </div>
        <ul className="hero-stack" aria-label={ui.stackLabel}>
          {hero.stack.map((item) => (
            <li key={item} className="stack-pill">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hero;
