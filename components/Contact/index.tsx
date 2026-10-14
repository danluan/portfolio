import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import SectionHeading from "@/components/SectionHeading";
import type { Content } from "@/lib/cv";

const icons = {
  email: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
};

const Contact = ({ content: { contact } }: { content: Content }) => {

  return (
    <section
      id={contact.heading.id}
      className="section contact"
      aria-labelledby={`${contact.heading.id}-title`}
    >
      <SectionHeading heading={contact.heading} />
      <p className="contact-sub">{contact.sub}</p>
      <ul className="contact-links">
        {contact.links.map((link) => {
          const Icon = icons[link.kind];
          const external = link.kind !== "email";

          return (
            <li key={link.kind}>
              <a
                href={link.href}
                className="contact-link"
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Icon />
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Contact;
