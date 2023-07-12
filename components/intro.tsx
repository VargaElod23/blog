import Link from "next/link";
import Image from "next/image";
import { SubscribeSection } from "./subscribeSection";

const Intro = () => {
  return (
    <>
      <section className="flex-col md:flex-row flex items-center md:justify-between mt-56 md:mt-16 mb-16 md:mb-12">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg blur-xl opacity-70 dark:opacity-35 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 bg-white dark:bg-black text-black dark:text-white rounded-lg pb-2">
            0xElod.
          </h1>
          <h4 className="text-center md:text-left text-lg pt-2 md:pl-8">
            Writing code is easy{" "}
            <span className="underline cursor-pointer hover:text-blue-600 duration-200 transition-colors">
              Living the Dev life
            </span>{" "}
            is hard.
          </h4>
        </div>
        <div className="px-8 py-32">
          <Image
            src="/me.png"
            alt="Elod Varga"
            className="shadow-sm w-full object-contain"
            width={256}
            height={256}
          />
        </div>
      </section>
      <section>
        <div className="px-8 py-32">
          <div className="grid gap-8 items-start justify-center xs:h-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-800 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <button className="relative px-7 py-4 xs:py-2 bg-black dark:bg-gray-200 rounded-lg leading-none flex items-center divide-x divide-white">
                <span className="flex items-center space-x-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600 -rotate-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  <span className="pr-6 text-gray-100 dark:text-blue-600">
                    GitHub activity Summarizer
                  </span>
                </span>
                <Link
                  className="pl-6 text-green-600 group-hover:text-green-300 dark:group-hover:text-purple-600 transition duration-200"
                  href="/summaries/github"
                >
                  See what's I was up to &rarr;
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
      <SubscribeSection />
    </>
  );
};

export default Intro;
