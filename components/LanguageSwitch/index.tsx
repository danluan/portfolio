"use client";

import type { Content } from "@/lib/cv";

/**
 * Link to the same page in the other locale. It is a plain link (the URL is
 * the only language state); the click handler just carries the current
 * #section over, since section ids are identical in both locales.
 */
const LanguageSwitch = ({
  label,
  ariaLabel,
  href,
  hrefLang,
}: Content["languageSwitch"]) => (
  <a
    href={href}
    hrefLang={hrefLang}
    lang={hrefLang}
    aria-label={ariaLabel}
    title={ariaLabel}
    className="lang-switch"
    onClick={(event) => {
      event.currentTarget.href = href + window.location.hash;
    }}
  >
    {label}
  </a>
);

export default LanguageSwitch;
