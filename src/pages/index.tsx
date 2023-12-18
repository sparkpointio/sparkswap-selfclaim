import Link from "next/link";
import {Inter} from "next/font/google";
import Head from "next/head";
import {useRouter} from "next/router";
import {NavigationMenu} from "@/resources/components/NavigationMenu";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        backgroundImage: `url('/hero-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <NavigationMenu/>

      <main
        className={`flex min-h-screen flex-col items-center justify-center p-6 ${inter.className}`}
      >
        <Head>
          <title>Self-Claim Airdrop | SparkSwap</title>
          <link rel="icon" href="/SparkSwapLogo.png"/>
        </Head>

        <div className="text-center bg-background1 rounded-lg p-8 shadow-md">
          <h1 className="mb-4 text-4xl font-semibold leading-tight text-accent1">
            Welcome to SparkSwap Self-Claim Airdrop
          </h1>
          <p className="max-w-lg mx-auto mb-6 text-text2">
            A platform to create self-service airdrops and claim your rewards.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Link href="/claim">
              <div
                className={`p-6 bg-background2 rounded-lg shadow-lg hover:bg-background3 cursor-pointer transition duration-300`}
              >
                <h2 className={`mb-3 text-xl font-semibold text-accent1`}>
                  Claim Your Tokens →
                </h2>
                <p className={`text-sm text-text2`}>
                  Effortlessly claim your airdropped tokens.
                </p>
              </div>
            </Link>

            <Link href="/create">
              <div
                className={`p-6 bg-background2 rounded-lg shadow-lg hover:bg-background3 cursor-pointer transition duration-300`}
              >
                <h2 className={`mb-3 text-xl font-semibold text-accent1`}>
                  Create a Self-Claim Airdrop →
                </h2>
                <p className={`text-sm text-text2`}>
                  Create an airdrop and access all platform features.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
