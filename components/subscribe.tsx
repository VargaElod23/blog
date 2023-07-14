import React from "react";
import { Modal } from "./modal";

export const Subscribe = () => {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [sendError, setSendError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isPopupOpen, setPopupOpen] = React.useState(false);
  const [terms, setTerms] = React.useState(false);

  const resetEmailErrorAfterTimeout = () => {
    setTimeout(() => {
      setEmailError(false);
    }, 3000);
  };

  const validateEmail = (email: string) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const res = mailformat.test(email);
    console.log({ res });
    if (res) {
      return true;
    } else {
      setEmailError(true);
      throw new Error("Email is not valid!");
    }
  };

  const insertSubscriber = async (email: string) => {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        created_at: Math.floor(Date.now() / 1000),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong!");
    } else {
      setLoading(false);
    }
    return data;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      validateEmail(email);
      await insertSubscriber(email);
      setPopupOpen(true);
      setEmail("");
      setTerms(false);
      setEmailError(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setSendError(error.message);
      setPopupOpen(true);
      setLoading(false);
      setTerms(false);
      resetEmailErrorAfterTimeout();
    }
  };

  return (
    <div className="max-w-xl">
      <Modal
        isOpen={isPopupOpen}
        setOpen={() => {
          setPopupOpen(!isPopupOpen);
          setSendError("");
        }}
        error={sendError}
      />
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email-address-icon"
            className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="text"
              id="email-address-icon"
              className={`${
                emailError
                  ? "bg-red-50 border border-red-500 text-red-900"
                  : "bg-gray-50 border border-gray-300 text-gray-900"
              } text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="name@google.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {emailError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oops!</span> This email looks off!
            </p>
          )}
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              onClick={() => setTerms(!terms)}
              onChange={() => setTerms(!terms)}
              checked={terms}
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          disabled={loading || !terms || email === ""}
          className="text-white disabled:bg-slate-500 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};
