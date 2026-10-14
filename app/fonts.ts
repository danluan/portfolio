import localFont from "next/font/local";

// Self-hosted (OFL, see assets/fonts) so dev and build never depend on fetching Google Fonts.
const display = localFont({
  src: [
    { path: "../assets/fonts/DMSerifDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/DMSerifDisplay-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-dm-serif",
  display: "swap",
});

const body = localFont({
  src: "../assets/fonts/Outfit-VariableFont_wght.ttf",
  weight: "100 900",
  variable: "--font-outfit",
  display: "swap",
});

const mono = localFont({
  src: [
    {
      path: "../public/CascadiaMono-VariableFont_wght.ttf",
      weight: "200 700",
      style: "normal",
    },
    {
      path: "../public/CascadiaMono-Italic-VariableFont_wght.ttf",
      weight: "200 700",
      style: "italic",
    },
  ],
  variable: "--font-cascadia",
  display: "swap",
});

/** Class names exposing --font-dm-serif, --font-outfit and --font-cascadia. */
export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
