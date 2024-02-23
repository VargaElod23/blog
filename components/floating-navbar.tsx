"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "../utils/cn";
import { useRouter } from "next/router";
import { NavItem } from "../utils/types";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const router = useRouter();

  const isActive = (href: string) => {
    return router.pathname === href;
  };

  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, [router.pathname]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-0 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-2 py-2 items-center justify-center space-x-2 text-xs sm:text-sm sm:pl-8 sm:pr-2 sm:space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => {
          return isActive(navItem.link) ? (
            <button
              key={`link=${idx}`}
              className="border text-xs sm:text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full"
            >
              <span className="flex flex-row items-center text-1.5rem">
                {navItem.icon}{" "}
                <span className="ml-1 sm:ml-2">{navItem.name}</span>{" "}
              </span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
            </button>
          ) : (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 pl-1 pr-1 sm:pl-2 sm:pr-2"
              )}
            >
              <span className="flex flex-row items-center text-1.5rem">
                {navItem.icon}
                <span className="ml-1 sm:ml-2">{navItem.name}</span>
              </span>
            </Link>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
