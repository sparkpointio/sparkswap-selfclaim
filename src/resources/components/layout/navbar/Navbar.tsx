import Image from "next/image";
import { useRouter } from "next/router";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Navbar as FlowbiteNavbar } from "flowbite-react";
import { ConnectWallet } from "@thirdweb-dev/react";

const customTheme: CustomFlowbiteTheme["navbar"] = {
  root: {
    base: "bg-background1 bg-opacity-90 sm:px-4 py-2 lg:px-0 lg:py-0 xl:py-4 w-full fixed z-20 top-0 left-0",
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
    base: "flex items-start ml-0 xl:ml-4 grow",
  },
  collapse: {
    base: "w-full lg:block lg:w-auto lg:mr-4",
    list: "mt-4 flex flex-col lg:mt-0 lg:flex-row lg:space-x-2 lg:font-medium",
    hidden: {
      on: "hidden",
      off: "",
    },
  },
  link: {
    base: "block py-4 xl:py-2 pr-4 pl-3 xl:p-2 text-base lg:text-md xl:text-lg font-monda",
    active: {
      on: "text-accent1 bg-background3 rounded-sm lg:bg-transparent",
      off: "border-b border-gray-700 text-text2 lg:text-text2 hover:bg-gray-50 lg:border-0 lg:hover:bg-transparent hover:text-black dark:hover:text-black dark:lg:hover:text-white lg:hover:text-text2 lg:hover:underline lg:decoration-4 lg:decoration-accent1 lg:hover:underline-offset-8",
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: "",
    },
  },
  toggle: {
    base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-400 hover:bg-transparent dark:hover:bg-gray-700 focus:outline-none lg:hidden",
    icon: "h-6 w-6 shrink-0",
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
    <FlowbiteNavbar theme={customTheme} fluid>
      <FlowbiteNavbar.Brand href="/#">
        <div className="w-28 h-10 md:w-52 md:h-16 relative ml-2 md:ml-0">
          <Image
            src="/SparkSwapLogoWithWord.png"
            alt="SparkSwap Logo"
            fill
            style={{ objectFit: "contain" }}
            priority={true}
          />
        </div>
      </FlowbiteNavbar.Brand>

      <div className="flex lg:order-2">
        <ConnectWallet className="!bg-gray-300 !text-base !text-black !font-inter !font-semibold hover:!bg-gray-100 hover:!text-black !rounded-sm !px-2" />
        <FlowbiteNavbar.Toggle />
      </div>
      <FlowbiteNavbar.Collapse>{renderNavLinks()}</FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
}
