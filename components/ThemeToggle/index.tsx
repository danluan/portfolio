"use client";

import { useEffect } from "react";
import { MoonIcon, SunIcon } from "@/components/Icons";
import { THEME_COLORS, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

const currentTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";

const syncThemeColor = (theme: Theme) => {
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute("content", THEME_COLORS[theme]));
};

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  syncThemeColor(theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode etc.): the theme still applies for this visit.
  }
};

/**
 * The active theme lives on <html data-theme>, set before paint by the inline
 * script in app/layout.tsx. Which icon shows is decided in CSS from that
 * attribute, so this component holds no state and cannot mismatch on hydration.
 */
const ThemeToggle = ({ label, title }: { label: string; title: string }) => {
  useEffect(() => {
    syncThemeColor(currentTheme());
  }, []);

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={title}
      onClick={() => applyTheme(currentTheme() === "dark" ? "light" : "dark")}
    >
      <MoonIcon className="icon-moon" />
      <SunIcon className="icon-sun" />
    </button>
  );
};

export default ThemeToggle;
