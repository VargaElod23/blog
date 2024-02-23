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
      </section>
      <SubscribeSection />
    </>
  );
};

export default Intro;
