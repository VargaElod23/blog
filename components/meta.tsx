import Head from "next/head";
import { HOME_OG_IMAGE_URL } from "../lib/constants";
import Script from "next/script";
import { useRouter } from "next/router";

const Meta = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/favicon.ico" color="#000000" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <meta name="description" content={`Welcome to my personal blog!`} />
        <meta property="og:description" content={"0xElod's personal blog"} />
        <meta property="og:title" content="0xElod's personal blog" />
        <meta property="twitter:image" content={HOME_OG_IMAGE_URL} />
        <meta property="twitter:card" content={HOME_OG_IMAGE_URL} />
        <meta property="twitter:title" content="0xElod's personal blog" />
        <meta property="twitter:description" content="0xElod's personal blog" />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
        <meta property="og:url" content={router.asPath} />
      </Head>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TAG}`}
      ></Script>
      <Script>
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.NEXT_PUBLIC_GA_TAG}');`}
      </Script>
    </>
  );
};

export default Meta;
