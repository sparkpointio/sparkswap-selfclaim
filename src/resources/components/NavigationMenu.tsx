import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";

interface NavigationLink {
  href: string;
  label: string;
}

interface NavigationMenuProps {
  navigationLinks: NavigationLink[];
}

export const NavigationMenu: React.FC<NavigationMenuProps> = (
  {
    navigationLinks,
  }) => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background1 py-2 shadow-md z-10">
      <div className="flex items-center justify-between px-6">
        <Link href="/" passHref>
          <div className="flex items-center">
            <Image
              src="/SparkSwapLogoWithWord.png"
              alt="SparkSwap Logo"
              className="h-8 w-auto mr-2 cursor-pointer"
              width={100}
              height={100}
            />
          </div>
        </Link>
        <ul className="flex space-x-6">
          {navigationLinks.map((link, index) => (
            <li key={link.href}>
              <Link href={link.href} passHref>
                <div
                  className={`${
                    router.pathname === link.href
                      ? "text-accent1 font-semibold cursor-pointer"
                      : "text-text2 hover:underline cursor-pointer"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {router.pathname === "/" && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-background3"></div>
      )}
    </nav>
  );
};
