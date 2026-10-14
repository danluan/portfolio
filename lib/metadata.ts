import type { Metadata, Viewport } from "next";
import { content, locales, type Locale } from "@/lib/cv";
import { THEME_COLORS } from "@/lib/theme";

export const viewport: Viewport = {
  themeColor: THEME_COLORS.light,
};

export const buildMetadata = (locale: Locale): Metadata => {
  const { seo, profile, locale: meta } = content[locale];

  return {
    title: seo.title,
    description: seo.description,
    authors: [{ name: profile.shortName }],
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [content[l].locale.htmlLang, content[l].locale.path]),
      ),
    },
    openGraph: {
      type: "website",
      title: seo.title,
      description: seo.description,
      siteName: profile.shortName,
      locale: meta.ogLocale,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => content[l].locale.ogLocale),
    },
  };
};

export const buildPersonJsonLd = (locale: Locale) => {
  const { profile, seo, experience, education, skills } = content[locale];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.shortName,
    jobTitle: profile.role,
    description: seo.description,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressRegion: profile.location.stateCode,
      addressCountry: profile.location.countryCode,
    },
    worksFor: { "@type": "Organization", name: experience.items[0].company },
    alumniOf: Array.from(
      new Set(education.items.map((item) => item.institution)),
    ).map((name) => ({ "@type": "EducationalOrganization", name })),
    sameAs: [profile.linkedin.url, profile.github.url],
    knowsAbout: Array.from(new Set(skills.groups.flatMap((group) => group.items))),
    knowsLanguage: education.languages.map((language) => language.name),
  };
};
