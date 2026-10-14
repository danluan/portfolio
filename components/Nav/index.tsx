import LanguageSwitch from "@/components/LanguageSwitch";
import ThemeToggle from "@/components/ThemeToggle";
import type { Content } from "@/lib/cv";

const Nav = ({ content }: { content: Content }) => (
  <header className="nav">
    <a href="#top" className="nav-logo">
      {content.profile.logo}
    </a>
    <nav className="nav-menu" aria-label={content.ui.navLabel}>
      <ul className="nav-links">
        {content.nav.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
    <div className="nav-actions">
      <LanguageSwitch {...content.languageSwitch} />
      <ThemeToggle
        label={content.ui.themeToggleLabel}
        title={content.ui.themeToggleTitle}
      />
    </div>
  </header>
);

export default Nav;
