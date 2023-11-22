import Image from "next/image";
import { useRouter } from "next/router";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite, Navbar as FlowbiteNavbar } from "flowbite-react";
import sparkswapLogoImg from "@/assets/images/SparkSwapLogoWithWord.png";

const customTheme: CustomFlowbiteTheme = {
  navbar: {
    root: {
      base: "bg-background1 dark:bg-stone-800 sm:px-4 py-2 xl:py-4 w-full fixed z-20 top-0 left-0",
      rounded: {
        on: "rounded",
        off: "",
      },
      bordered: {
        on: "border",
        off: "",
      },
      inner: {
        base: "mx-auto flex flex-wrap items-center justify-around lg:max-w-screen-lg xl:max-w-screen-2xl",
        fluid: {
          on: "",
          off: "container",
        },
      },
    },
    brand: {
      base: "flex items-center ml-0 xl:ml-4 grow",
    },
    collapse: {
      base: "w-full xl:block xl:w-auto xl:mr-4",
      list: "mt-4 flex flex-col xl:mt-0 xl:flex-row xl:space-x-2 xl:font-medium",
      hidden: {
        on: "hidden",
        off: "",
      },
    },
    link: {
      base: "block py-4 xl:py-2 pr-4 pl-3 xl:p-2 text-base font-lato",
      active: {
        on: "text-accent1 bg-background3 rounded-sm xl:bg-transparent",
        off: "border-b border-gray-700 text-text2 dark:text-emerald-300 lg:text-text2 dark:lg:text-emerald-300 hover:bg-gray-50 xl:border-0 xl:hover:bg-transparent hover:text-black dark:hover:text-black dark:xl:hover:text-white xl:hover:text-text2 xl:hover:underline xl:hover:underline-offset-1",
      },
      disabled: {
        on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        off: "",
      },
    },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-400 hover:bg-transparent dark:hover:bg-gray-700 focus:outline-none xl:hidden",
      icon: "h-6 w-6 shrink-0",
    },
  },
};

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Claim",
    href: "/claim",
  },
  {
    title: "Create",
    href: "/create",
  },
];

export default function Navbar() {
  const router = useRouter();

  const renderNavLinks = () => {
    const nav = navLinks.map((item) => {
      const isActive = item.href === router.pathname;
      return (
        <FlowbiteNavbar.Link
          key={item.title}
          href={item.href}
          active={isActive}
        >
          {item.title}
        </FlowbiteNavbar.Link>
      );
    });

    return nav;
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <FlowbiteNavbar fluid>
        <FlowbiteNavbar.Brand href="/#">
          <div className="w-28 h-10 md:w-52 md:h-16 relative ml-2 md:ml-0">
            <Image
              src={sparkswapLogoImg}
              alt="SparkSwap Logo"
              fill
              style={{ objectFit: "contain" }}
              priority={true}
            />
          </div>
        </FlowbiteNavbar.Brand>
        <FlowbiteNavbar.Toggle />
        <FlowbiteNavbar.Collapse>{renderNavLinks()}</FlowbiteNavbar.Collapse>
      </FlowbiteNavbar>
    </Flowbite>
  );
}
