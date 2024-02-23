"use client";
import React from "react";
import Image from "next/image";
import { TracingBeam } from "../components/tracing-bream";
import { useMediaQuery } from "react-responsive";

export default function PersonalDescription() {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1023px)" });

  return (
    <TracingBeam
      className={isMobile || isTablet ? "pb-12 mobile-tablet" : "pb-12"}
    >
      <div className="mt-14 max-w-2xl mx-auto antialiased pt-4 relative pb-16">
        {content.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            {item.title}

            <div className="text-sm  prose prose-sm dark:prose-invert">
              {item?.image && (
                <Image
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                  priority
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const content = [
  {
    title: (
      <h1 className="text-4xl font-bold text-center dark:text-blue-600 pt-8">
        Hi, I'm Előd
      </h1>
    ),
    description: (
      <div className="text-lg dark:text-gray-300 space-y-4">
        <p>
          I'm an entrepreneur, software engineer, and open-source enthusiast.
          I've been working in the tech industry for over 7 years, with stops in
          the enterprise, startup, and agency worlds, currently hardcore
          building at{" "}
          <a
            href="https://taraxa.io"
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            Taraxa
          </a>
          , a novel L1 using the BlockDAG architecture.
        </p>
        <p>
          I hold a BSc in Economical Informatics and an MSc in Enterprise
          Software Development & design from the Babes-Bolyai University of
          Cluj-Napoca.
        </p>
        <p>
          Since 2021, I've started{" "}
          <a
            href="https://www.apeconsulting.xyz"
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            APE Consulting
          </a>
          , a software consulting company that helps startups and enterprises
          build and scale, mainly focusing on the blockchain and web3 space.
        </p>
        <div className="px-8 py-16">
          <div className="grid gap-8 items-start justify-center xs:h-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-800 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <button
                className="relative px-7 py-4 xs:py-2 bg-black dark:bg-gray-200 rounded-lg leading-none flex items-center divide-x divide-white"
                onClick={() => (window.location.href = "/summaries/github")}
              >
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
                <span className="pl-6 text-green-600 group-hover:text-green-300 dark:group-hover:text-purple-600 transition duration-200">
                  See what I'm up to &rarr;
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    badge: "Intro",
    image:
      "https://pbs.twimg.com/profile_images/1684630239438069760/HpXANOhe_400x400.jpg",
  },
  {
    title: (
      <h1 className="text-4xl font-bold text-center dark:text-blue-600">
        EWOR & Entrepreneurship
      </h1>
    ),
    description: (
      <div className="text-lg dark:text-gray-300 space-y-4">
        <p>
          I've been involved in the entrepreneurship world since 2021, when I
          founded{" "}
          <a
            href="https://www.apeconsulting.xyz"
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            APE Consulting
          </a>
          . Shortly after, I've been blessed with{" "}
          <a
            href="https://www.linkedin.com/in/alexandru-gazdac/"
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            Alex
          </a>{" "}
          joining us as a co-founder, and we've been working together to build
          the company and the brand ever since.
        </p>
        <p>
          Given the plethora of small startups and enterprises that we've been
          working with, I've been able to get a deep understanding of the
          blockchain space, and I've been able to help them build and scale
          their products. I've been able to help them with the technical
          architecture, the product design, and the development of the products,
          and I've been able to help them with the business development and the
          marketing of the products, which, in turn, left us little to no time
          to spend on giving some love to APE Consulting itself, a decision
          we're trying to right since last summer.
        </p>
        <p>
          Since April 2023, when I found out that I've been admitted to EWOR's
          entrepreneurship program, I've been working on spreading awareness of
          when to and when not to use blockchain.
        </p>
        <p>
          At the end of last year, together with{" "}
          <a
            href="https://www.linkedin.com/in/fucek/"
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            Antonio
          </a>
          , we co-founded SkillCompass, running its first test batch in the
          winter of 2023, under the name{" "}
          <a
            href="https://www.productworkforce.com/members"
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            Product Workforce
          </a>
          . In 2024, we've embarked on the journey of building our own custom
          product with the program we tested and validated. Keep an eye on us,
          we're going to change the way people learn and work in the tech
          industry.
        </p>
      </div>
    ),
    badge: "EWOR & Entrepreneurship",
    image: "https://ewor.io/wp-content/uploads/2023/02/General.png",
  },
  {
    title: (
      <h1 className="text-4xl font-bold text-center dark:text-blue-600">
        Experience
      </h1>
    ),
    description: (
      <div className="text-lg dark:text-gray-300 space-y-4">
        <p>
          In the last 2 years I've been focusing my energy towards building out
          the ecosystem of{" "}
          <a
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            Taraxa
          </a>
          , being one of the driving forces behind the project. Nonetheless of
          my official role in the Ecosystem team, I've been working on various
          projects, from the core protocol to the implementation of the various
          tools and libraries that are used by the masses.
        </p>
        <p>
          Around the COVID era, I've been freelancing and collaborating with
          clients to help them build and launch their products. Probably the
          most notable project I've worked on is{" "}
          <a
            href="https://nevermined.io/"
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            Nevermied
          </a>
          , a decentralized data sharing protocol.
        </p>
      </div>
    ),
    badge: "Taraxa",
    image: "https://pbs.twimg.com/media/GGzyJHqa8AAGxm8.jpg",
  },
  {
    title: (
      <h1 className="text-4xl font-bold text-center dark:text-blue-600">
        Lara - Liquid Staking & DAO
      </h1>
    ),
    description: (
      <div className="text-lg dark:text-gray-300 space-y-4">
        <p>
          As the founder & CEO of the first liquid staking & restaking protocol
          on Taraxa, I've been incubating this project since November 2023.{" "}
          <a
            href="https://linktr.ee/LaraDAO"
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            Lara is a staking and delegation protocol written in Solidity
          </a>
          . It allows users to stake tokens, delegate them to validators, and
          claim rewards, all automatically. Besides making staking a one-click,
          KYC-less process, it helps you earn more via its auto-compounding
          features while it gives the power to opt-in and out of it to the user
          anytime, all of this while helping your TARA tokens remain liquid and
          can be used across a range of DeFi applications.
        </p>
        <p>
          Besides providing a crucial piece of infrastructure for the Taraxa
          ecosystem, Lara is also a DAO, meaning that the protocol is governed
          by its users. The Lara DAO is responsible for making decisions about
          the future of the protocol, including how to allocate the community
          treasury, which features to implement, and how to improve the user
          experience. In the last 6 months, I've been working to deliver the
          first DAO on Taraxa, and I'm proud to say that we're close to launch
          our presale of $LARA tokens, airing March 2023.
        </p>
      </div>
    ),
    badge: "Lara - Liquid Staking, Restaking & DAO",
    image:
      "https://ugc.production.linktr.ee/2ae4965f-4035-4033-ae05-2ad4b8234a3f_LARA-v4-1.jpeg?io=true&size=avatar-v3_0",
  },
];
