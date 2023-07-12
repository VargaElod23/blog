import React from "react";
import { Subscribe } from "./subscribe";

export const SubscribeSection = () => {
  return (
    <div className="block text-center">
      <div className="inline-block mb-12 ">
        <h2 className="max-w-xl text-2xl md:text-2xl font-bold tracking-tighter leading-tight md:pr-8 bg-white dark:bg-black text-black dark:text-white rounded-lg pb-2">
          In case you like my content, please subscribe:
        </h2>
        <Subscribe />
      </div>
    </div>
  );
};
