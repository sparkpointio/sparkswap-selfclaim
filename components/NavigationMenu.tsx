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

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ navigationLinks, router }) => (
  <nav className="fixed top-0 left-0 right-0 bg-background-1 shadow z-10">
    <ul className="flex space-x-6">
      {navigationLinks.map((link, index) => (
        <li key={link.href}>
          <Link href={link.href} passHref>
            {/* Use a custom button-like element */}
            <div
              className={`${
                router.pathname === link.href ? 'text-accent1' : 'text-text2'
              } hover:underline cursor-pointer`}
            >
              {link.label}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
