import Image from "next/image";
import { NavigationMenu } from "@/components/NavigationMenu";
import heroBg from "@/assets/images/hero-bg.png";

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/claim", label: "Claim" },
  { href: "/create", label: "Create" },
];

export default function Layout({ children }) {
  return (
    <div className="w-full h-[100vh] relative">
      <div className="absolute -z-30 w-full h-full">
        <Image
          alt="Hero background"
          src={heroBg}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <header>
        <NavigationMenu navigationLinks={navigationLinks} />
      </header>
      <main
        className={`flex min-h-screen flex-col items-center justify-center font-inter`}
      >
        {children}
      </main>
    </div>
  );
}
