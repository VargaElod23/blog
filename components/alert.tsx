import useModeSwitcher from "../hooks/useModeSwitch";
import Container from "./container";
import cn from "classnames";

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  const { colorTheme } = useModeSwitcher();

  return (
    <div className="border-b dark:bg-gray-800 dark:border-neutral-800 dark:text-white light:bg-neutral-50 light:border-neutral-200">
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This page is a preview.{" "}
              <a
                href="/api/exit-preview"
                className={cn("underline duration-200 transition-colors", {
                  "hover:text-teal-300": colorTheme === "dark",
                  "hover:text-blue-600": colorTheme === "light",
                })}
              >
                Click here
              </a>{" "}
              to exit preview mode.
            </>
          ) : (
            <div className="dark:text-white dark:bg-neutral-80 light:text-black">
              The source code for this blog is{" "}
              <a
                href={`https://github.com/VargaElod23/blog`}
                className={cn("underline duration-200 transition-colors", {
                  "hover:text-teal-300": colorTheme === "dark",
                  "hover:text-blue-600": colorTheme === "light",
                })}
              >
                available on GitHub
              </a>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Alert;
