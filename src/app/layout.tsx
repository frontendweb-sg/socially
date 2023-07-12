import AuthSessionProvider from "@/components/providers/AuthSessionProvider";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";
import { inter, lato, roboto } from "../utils/font";
import "@/styles/index.scss";

export const metadata: Metadata = {
  title: "Socially",
  description: "A social plateform web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lato.variable} ${roboto.variable}`}>
        <AuthSessionProvider>
          <Header />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
