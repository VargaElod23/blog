import React from "react";

const ErrorContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-rose-400">
      <h1 className="text-4xl font-bold">
        Oops! Something went wrong. Probably the OpenAI API is getting
        limit-tested again.
      </h1>
      <p className="mt-4 text-lg">We apologize for the inconvenience.</p>
      <div className="mt-8">
        <img
          src="https://prismatic.io/docs/img/components/icons/openai.png"
          alt="Error"
          className="w-32 h-32 dark:bg-black"
        />
      </div>
    </div>
  );
};

export default ErrorContainer;
