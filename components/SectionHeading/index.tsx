import { Fragment } from "react";
import RichText from "@/components/RichText";
import type { SectionHeading as SectionHeadingData } from "@/lib/cv";

/** Mono label + serif h2 shared by every section. The h2 id labels the section. */
const SectionHeading = ({ heading }: { heading: SectionHeadingData }) => (
  <>
    <p className="section-label" aria-hidden="true">
      {heading.label}
    </p>
    <h2 id={`${heading.id}-title`} className="section-title">
      {heading.title.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <RichText text={line} />
        </Fragment>
      ))}
    </h2>
  </>
);

export default SectionHeading;
