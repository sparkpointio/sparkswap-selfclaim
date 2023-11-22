import Image from "next/image";
import Navbar from "./navbar/Navbar";
import heroBg from "@/assets/images/hero-bg.png";

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
        <Navbar />
      </header>
      <main
        className={`flex min-h-screen flex-col items-center justify-center font-inter`}
      >
        {children}
      </main>
    </div>
  );
}
