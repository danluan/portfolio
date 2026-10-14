export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "dl-theme";

/** Must match --bg in app/globals.css for each theme. */
export const THEME_COLORS: Record<Theme, string> = {
  dark: "#080810",
  light: "#f0f0ee",
};

/**
 * Runs inline in <head> before first paint: restores the saved theme (default
 * light) so there is no flash, and flags that JS is available so the scroll
 * reveal may hide content until it is observed.
 */
export const themeInitScript = `(function(){var d=document.documentElement;d.setAttribute("data-js","");var t="light";try{if(localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})==="dark")t="dark"}catch(e){}d.setAttribute("data-theme",t)})();`;
