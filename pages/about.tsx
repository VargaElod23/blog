import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import Container from "../components/container";
import useLoader from "../hooks/useLoader";
import { Project } from "../utils/types";
import { HeroParallax } from "../components/hero-parallax";

const AboutPage: React.FC = () => {
  const { setIsLoading } = useLoader();

  useEffect(() => {
    // Simulate a delay to showcase the loader animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const jobs: Project[] = [
    {
      thumbnail:
        "https://static.wixstatic.com/media/cc5648_6851e114e4d24f29a20e3867f62327c5~mv2.jpg/v1/fill/w_640,h_670,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/cc5648_6851e114e4d24f29a20e3867f62327c5~mv2.jpg",
      title: "ProductWorkforce",
      link: "https://productworkforce.com",
    },
    {
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHu76nbSHyFZlBywZ9REQRokcwX-oUR8Iv1g&usqp=CAU",
      title: "Taraxa",
      link: "https://taraxa.io",
    },
    {
      thumbnail:
        "https://ugc.production.linktr.ee/2ae4965f-4035-4033-ae05-2ad4b8234a3f_LARA-v4-1.jpeg?io=true&size=avatar-v3_0",
      title: "Lara - Liquid Staking & Restaking",
      link: "https://linktr.ee/LaraDAO",
    },
    {
      thumbnail:
        "https://assets-global.website-files.com/653abf4577b282f5d9bb3d72/653ac78a934a9268edbb25de_Logo.svg",
      title: "Lumara",
      link: "https://lumara.com",
    },
    {
      title: "Nevermined",
      link: "https://nevermined.io",
      thumbnail: "https://nevermined.io/app/uploads/2024/02/1st-img.svg",
    },
    {
      thumbnail: "https://pbs.twimg.com/media/FbgJnITXgAAV19k.jpg",
      title: "Autonomies",
      link: "https://medium.com/keyko/autonomies-io-a-web3-platform-for-the-electronic-music-community-2a37629ac3fe",
    },
    {
      thumbnail:
        "https://assets.bosch.com/media/global/stories/automated_valet_parking/youtube-preview-0q-klx5isza_res_768x432.webp",
      title: "Bosch - Automated Valet Parking",
      link: "https://www.bosch-mobility.com/en/solutions/parking/automated-valet-parking/",
    },
    {
      thumbnail:
        "https://media.licdn.com/dms/image/C4E0BAQHAc9j2_SVbow/company-logo_200_200/0/1675753317670?e=2147483647&v=beta&t=N67TI13_CYCWDwVrMf2Oi6iDvHhtwMtjDYi2ixmCFec",
      title: "Fortech",
      link: "https://fortech.ro",
    },
    {
      thumbnail:
        "https://www.acjsfb.ro/wp-content/uploads/2019/10/2.-logo-WKR.jpg",
      title: "Wolters Kluwer Romania",
      link: "https://www.wolterskluwer.com/en-ro",
    },
  ];

  const user = process.env.NEXT_PUBLIC_GH_USER;
  return (
    <Layout>
      <Container>
        <div className="container mx-auto pb-8 pt-32">
          <>
            <div className="container mx-auto py-8">
              <div className="flex flex-col items-center mb-8">
                <div className="w-48 h-48 bg-blue-600 rounded-full overflow-hidden">
                  <Image
                    src="/me.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={192}
                    height={192}
                  />
                </div>
              </div>
              <HeroParallax products={jobs} />
            </div>
          </>
        </div>
      </Container>
    </Layout>
  );
};

export default AboutPage;
