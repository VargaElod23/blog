import { useState, useEffect } from "react";

export default function useModeSwitcher() {
  const [theme, setTheme] = useState<string>("");
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? "dark" : "light";
        console.log(colorScheme); // "dark" or "light"
        setTheme(colorScheme);
      });
  }, []);

  useEffect(() => {
    if (theme) {
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, colorTheme]);

  return { colorTheme, setTheme };
}
