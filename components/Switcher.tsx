import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useModeSwitch from "../hooks/useModeSwitch";

export default function Switcher() {
  const { colorTheme, setTheme } = useModeSwitch();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <button
      type="button"
      className="mr-auto flex ml-8 md:ml-16 bg-blue-300 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 text-center items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
