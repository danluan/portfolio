import type { ReactNode } from "react";
import { fontVariables } from "@/app/fonts";
import { content, type Locale } from "@/lib/cv";
import { buildPersonJsonLd } from "@/lib/metadata";
import { themeInitScript } from "@/lib/theme";
import "@/app/globals.css";

/**
 * The <html>/<body> shell shared by the per-locale root layouts
 * (app/(en)/layout.tsx and app/(pt)/pt/layout.tsx), so each locale gets the
 * right <html lang> without duplicating fonts, theme script or JSON-LD.
 */
const RootShell = ({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) => (
  <html
    lang={content[locale].locale.htmlLang}
    data-theme="light"
    className={fontVariables}
    suppressHydrationWarning
  >
    {/* App Router root layout shell: a literal <head> is correct here. The
        rule targets the Pages Router and only skips files under app/. */}
    {/* eslint-disable-next-line @next/next/no-head-element */}
    <head>
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
    </head>
    <body>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildPersonJsonLd(locale)).replace(/</g, "\\u003c"),
        }}
      />
    </body>
  </html>
);

export default RootShell;
