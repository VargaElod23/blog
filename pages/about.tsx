import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import Container from "../components/container";
import useLoader from "../hooks/useLoader";

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

  const jobs = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHu76nbSHyFZlBywZ9REQRokcwX-oUR8Iv1g&usqp=CAU",
      alt: "Taraxa.io",
      url: "https://taraxa.io",
    },
    {
      img: "https://pbs.twimg.com/media/FbgJnITXgAAV19k.jpg",
      alt: "Autonomies.io",
      url: "https://medium.com/keyko/autonomies-io-a-web3-platform-for-the-electronic-music-community-2a37629ac3fe",
    },
    {
      img: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/ittch9eiagfhrz5jcfml",
      alt: "Lumara.com",
      url: "https://lumara.com",
    },
    {
      img: "https://www.absl.ro/wp-content/uploads/2018/04/bosch-new-logo.jpg",
      alt: "Bosch.ro",
      url: "https://bosch.ro",
    },
    {
      img: "https://media.licdn.com/dms/image/C4E0BAQHAc9j2_SVbow/company-logo_200_200/0/1675753317670?e=2147483647&v=beta&t=N67TI13_CYCWDwVrMf2Oi6iDvHhtwMtjDYi2ixmCFec",
      alt: "Fortech.ro",
      url: "https://fortech.ro",
    },
    {
      img: "https://www.acjsfb.ro/wp-content/uploads/2019/10/2.-logo-WKR.jpg",
      alt: "Wolters Kluwer Romania",
      url: "https://www.wolterskluwer.com/en-ro",
    },
  ];

  const user = process.env.NEXT_PUBLIC_GH_USER;
  return (
    <Layout>
      <Container>
        <div className="container mx-auto pb-8 pt-32">
          <>
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <p className="text-black text-bold dark:text-white mb-4">
              {`Hello, I'm ${user}, the creator of this blog. Welcome!`}
            </p>
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
              <h1 className="text-4xl font-bold mb-4">
                Clients/Jobs I had before
              </h1>
              <div className="flex justify-center mb-8">
                <div className="flex space-x-4 flex-wrap gap-3 justify-center">
                  {jobs.map((job) => (
                    <div className="w-48 h-48 bg-gray-200" id={job.alt}>
                      <Link href={job.url} target="_blank">
                        <Image
                          src={job.img}
                          alt={job.alt}
                          className="w-full h-full object-cover"
                          width={192}
                          height={192}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Skills</h2>
                <p>As a Web3 developer, I messed with:</p>
                <ul>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Solidity_logo.svg/800px-Solidity_logo.svg.png"
                        alt="Solidity"
                        className="object-cover mr-2 dark:bg-white"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-purple-600 rounded"></div>
                          <div className="ml-2">Solidity</div>
                        </div>

                        <div className="bg-purple-600 h-2 rounded w-full"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png"
                        alt="TypeScript"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-purple-600 rounded"></div>
                          <div className="ml-2">TypeScript</div>
                        </div>
                        <div className="bg-purple-600 h-2 rounded w-full"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://w7.pngwing.com/pngs/452/24/png-transparent-js-logo-node-logos-and-brands-icon.png"
                        alt="Node"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-purple-600 rounded"></div>
                          <div className="ml-2">Node</div>
                        </div>

                        <div className="bg-purple-600 h-2 rounded w-full"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://seeklogo.com/images/H/hardhat-logo-888739EBB4-seeklogo.com.png"
                        alt="Hardhat"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-green-400 rounded"></div>
                          <div className="ml-2">Hardhat</div>
                        </div>
                        <div className="bg-green-400 h-2 rounded w-11/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4 flex-col">
                    <div className="flex">
                      <Image
                        src="https://avatars.githubusercontent.com/u/99892494?s=280&v=4"
                        alt="Foundry"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-green-400 rounded"></div>
                          <div className="ml-2">Foundry</div>
                        </div>
                        <div className="bg-green-400 h-2 rounded w-11/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://cdn.freebiesupply.com/logos/large/2x/react-logo-png-transparent.png"
                        alt="React"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-green-400 rounded"></div>
                          <div className="ml-2">React</div>
                        </div>
                        <div className="bg-green-400 h-2 rounded w-11/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/NestJS.svg/1200px-NestJS.svg.png"
                        alt="Nest"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-green-400 rounded"></div>
                          <div className="ml-2">Nest</div>
                        </div>
                        <div className="bg-green-400 h-2 rounded w-11/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png"
                        alt="Tailwind"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-green-400 rounded"></div>
                          <div className="ml-2">Tailwind</div>
                        </div>
                        <div className="bg-green-400 h-2 rounded w-11/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png"
                        alt="Docker"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-green-400 rounded"></div>
                          <div className="ml-2">Docker</div>
                        </div>
                        <div className="bg-green-400 h-2 rounded w-11/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://cncf-branding.netlify.app/img/projects/helm/icon/color/helm-icon-color.png"
                        alt="Helm"
                        className="object-cover mr-2 dark:bg-white"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-green-400 rounded"></div>
                          <div className="ml-2">Helm</div>
                        </div>
                        <div className="bg-green-400 h-2 rounded w-11/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/2109px-Kubernetes_logo_without_workmark.svg.png"
                        alt="K8S"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-green-400 rounded"></div>
                          <div className="ml-2">K8S</div>
                        </div>
                        <div className="bg-green-400 h-2 rounded w-11/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://pendulum-it.com/wp-content/uploads/2020/05/Google-Cloud-Platform-GCP-logo.png"
                        alt="GCP"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-green-400 rounded"></div>
                          <div className="ml-2">Google Cloud</div>
                        </div>
                        <div className="bg-green-400 h-2 rounded w-11/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/2560px-Amazon_Web_Services_Logo.svg.png"
                        alt="AWS"
                        className="object-cover mr-2 dark:bg-white"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-green-400 rounded"></div>
                          <div className="ml-2">AWS</div>
                        </div>
                        <div className="bg-green-400 h-2 rounded w-11/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1280px-Sass_Logo_Color.svg.png"
                        alt="Sass"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-green-400 rounded"></div>
                          <div className="ml-2">Sass</div>
                        </div>
                        <div className="bg-green-400 h-2 rounded w-11/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.jpg"
                        alt="Java"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-orange-400 rounded"></div>
                          <div className="ml-2">Java</div>
                        </div>
                        <div className="bg-orange-400 h-2 rounded w-10/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/1280px-Go_Logo_Blue.svg.png"
                        alt="Go"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-orange-400 rounded"></div>
                          <div className="ml-2">Go</div>
                        </div>
                        <div className="bg-orange-400 h-2 rounded w-10/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png"
                        alt="Python"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-orange-400 rounded"></div>
                          <div className="ml-2">Python</div>
                        </div>
                        <div className="bg-orange-400 h-2 rounded w-10/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/2048px-Rust_programming_language_black_logo.svg.png"
                        alt="Rust"
                        className="object-cover mr-2 dark:bg-white"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-orange-400 rounded"></div>
                          <div className="ml-2">Rust</div>
                        </div>
                        <div className="bg-orange-400 h-2 rounded w-10/12"></div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4">
                    <div className="flex">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png"
                        alt="Angular"
                        className="object-cover mr-2"
                        width={36}
                        height={36}
                      />
                      <div className="flex-row w-full">
                        <div className="flex items-center mb-2">
                          <div className="w-16 h-4 bg-rose-800 rounded"></div>
                          <div className="ml-2">Angular</div>
                        </div>
                        <div className="bg-rose-800 h-2 rounded w-3/12"></div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </>
        </div>
      </Container>
    </Layout>
  );
};

export default AboutPage;
