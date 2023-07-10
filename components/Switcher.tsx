import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useModeSwitcher from "../hooks/useModeSwitch";

export default function Switcher() {
  const { colorTheme, setTheme } = useModeSwitcher();
  const [darkSide, setDarkSide] = useState(false);

  useEffect(() => {
    setDarkSide(colorTheme === "dark");
  }, []);

  useEffect(() => {
    setDarkSide(colorTheme === "dark");
  }, [colorTheme]);

  const toggleDarkMode = () => {
    setDarkSide(!darkSide);
    if (darkSide) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button
      type="button"
      className="mr-auto flex ml-8 md:ml-16 bg-blue-300 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <DarkModeSwitch
        className="mt-4 mb-4"
        checked={darkSide}
        onChange={toggleDarkMode}
        size={30}
      />
    </button>
  );
}
