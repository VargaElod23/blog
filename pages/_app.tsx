import { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import "../styles/index.css";
import { useRouter } from "next/router";
import React from "react";
import Loader from "../components/loader";
import useLoader from "../hooks/useLoader";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "../styles/prism-overrides.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoader();

  React.useEffect(() => {
    const handleStart = () => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      // Clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      // router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  return (
    <>
      {isLoading && <Loader />}
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
