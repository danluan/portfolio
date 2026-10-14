import type { Content } from "@/lib/cv";

const Footer = ({ content }: { content: Content }) => {
  const { profile, footer } = content;
  const links = [profile.linkedin, profile.github];

  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {footer.text}
      </p>
      <p>
        {links.map((link, i) => (
          <span key={link.url}>
            {i > 0 && " · "}
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </span>
        ))}
      </p>
    </footer>
  );
};

export default Footer;
