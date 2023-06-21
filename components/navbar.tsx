import Image from "next/image";
import Switcher from "./Switcher";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const isActive = (href) => {
    return router.pathname === href ? "text-blue-700" : "text-black";
  };

  const isActiveRoute = (href) => {
    return router.pathname === href;
  };

  const isActiveDark = (href) => {
    return router.pathname === href ? "text-blue-700" : "text-white";
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <a
              href="/"
              className={`block py-2 pl-3 pr-4 ${isActive(
                "/"
              )} dark:${isActiveDark("/")} ${
                isActiveRoute("/") ? "max-[765px]:bg-blue-300" : ""
              } rounded md:bg-transparent md:p-0`}
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <Link
              href="/about"
              className={`block py-2 pl-3 pr-4 ${isActive("/about")} ${
                isActiveRoute("/about") ? "max-[765px]:bg-blue-300" : ""
              } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:${isActiveDark(
                "/about"
              )} dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
            >
              About
            </Link>
          </li>
          <li>
            <a
              href="/works"
              className={`block py-2 pl-3 pr-4 ${isActive("/works")} ${
                isActiveRoute("/works") ? "max-[765px]:bg-blue-300" : ""
              } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:${isActiveDark(
                "/works"
              )} dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
            >
              Works
            </a>
          </li>
          <li>
            <a
              href="/blog"
              className={`block py-2 pl-3 pr-4 ${isActive("/blog")} ${
                isActiveRoute("/blog") ? "max-[765px]:bg-blue-300" : ""
              } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:${isActiveDark(
                "/blog"
              )} dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
            >
              Blog
            </a>
          </li>
        </ul>
        <div>
          <Switcher />
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <div>
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="mr-auto inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
