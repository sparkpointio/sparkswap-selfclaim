import React from "react";
import Image from "next/image";
import Head from "next/head";
import Navbar from "./navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Self-Claim Airdrop | SparkSwap</title>
        <link rel="icon" href="/SparkSwapLogo.png" />
      </Head>
      <div className="w-full h-[100vh] relative">
        <div className="absolute -z-30 w-full h-full">
          <Image
            alt="Hero background"
            src="/hero-bg.png"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <header>
          <Navbar />
        </header>
        <main
          className={`flex min-h-screen flex-col items-center justify-center font-quatro`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
