import { useState, useEffect } from "react";

export default function useModeSwitcher() {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = storedTheme || colorScheme;
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme) {
      const root = window.document.documentElement;
      root.classList.remove(theme === "dark" ? "light" : "dark");
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return { colorTheme: theme === "dark" ? "light" : "dark", setTheme };
}
