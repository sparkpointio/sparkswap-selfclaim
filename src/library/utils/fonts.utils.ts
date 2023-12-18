import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const monda = localFont({
  src: [
    {
      path: "../../../assets/fonts/monda/Monda-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../assets/fonts/monda/Monda-Bold.woff2",
      weight: "900",
      style: "bold",
    },
  ],
  variable: "--font-monda",
});

export const quatro = localFont({
  src: [
    {
      path: "../../../assets/fonts/quatro/Quatro-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-RegularItalic.woff2",
      weight: "normal",
      style: "italic",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-ExtraLightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-BoldItalic.woff2",
      weight: "bold",
      style: "italic",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-UltraBlack.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../assets/fonts/quatro/Quatro-UltraBlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-quatro",
});
