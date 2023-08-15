import React from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import the useRouter hook

interface NavigationLink {
  href: string;
  label: string;
}

interface NavigationMenuProps {
  navigationLinks: NavigationLink[];
  router: any; // Define the router prop
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  navigationLinks,
  router,
}) => (
  <nav className="fixed top-0 left-0 right-0 bg-background2 shadow-md z-10">
    <div className="flex justify-between items-center px-12 py-2">
      <Link href="/" passHref>
        <img
          src="/SparkSwapLogoWithWord.png"
          alt="SparkSwap Logo"
          className="h-8 w-auto cursor-pointer"
        />
      </Link>
      <ul className="flex space-x-6">
        {navigationLinks.map((link, index) => (
          <li key={link.href}>
            <Link href={link.href} passHref>
              <div
                className={`${
                  router.pathname === link.href ? "text-accent1" : "text-text2"
                } hover:underline cursor-pointer`}
              >
                {link.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);
