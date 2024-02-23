import {
  CrumpledPaperIcon,
  EnvelopeOpenIcon,
  HomeIcon,
  InfoCircledIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { NavItem } from "../utils/types";
import Alert from "./alert";
import { FloatingNav } from "./floating-navbar";
import Footer from "./footer";
import Meta from "./meta";
import Switcher from "./Switcher";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    name: "About",
    link: "/about",
    icon: <InfoCircledIcon />,
  },
  {
    name: "What I'm Up to",
    link: "/summaries/github",
    icon: <CrumpledPaperIcon />,
  },
  {
    name: "Blog",
    link: "/blog",
    icon: <ReaderIcon />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <EnvelopeOpenIcon />,
  },
];

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <Alert preview={preview} />
        <div className="absolute top-10 right-0 p-4">
          <Switcher />
        </div>
        <FloatingNav navItems={navItems} className="nav" />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
