import { Roboto, Inter, Lato } from "next/font/google";

export const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-roboto",
});
export const inter = Inter({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});
export const lato = Lato({
  weight: ["400", "900"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-lato",
});
