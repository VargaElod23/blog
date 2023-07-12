import Container from "./container";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer className="dark:text-white bg-neutral-50 dark:bg-black border-t border-neutral-200 dark:border-grey-800">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Created with Next.js, powered by Tailwind.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://www.apeconsulting.solutions"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Check out Ape Consulting
            </a>
            <a
              href={`https://github.com/VargaElod23/blog`}
              className="mx-3 font-bold hover:underline"
            >
              View on GitHub
            </a>
          </div>
          <SocialIcon
            url="https://www.linkedin.com/in/vargaelod/"
            className="min-h-[3.5rem] min-w-[3.5rem] mx-3"
            target="_blank"
          />
          <SocialIcon
            url="https://github.com/VargaElod23"
            className="min-h-[3.5rem] min-w-[3.5rem] mx-3 dark:color-white"
            target="_blank"
          />
          <SocialIcon
            url="https://github.com/Elod23"
            color="#000000"
            className="min-h-[3.5rem] min-w-[3.5rem] mx-3"
            target="_blank"
          />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
