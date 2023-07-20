import AuthSessionProvider from "@/components/providers/AuthSessionProvider";
import type { Metadata } from "next";
import { inter, lato, roboto } from "../utils/font";
import "@/styles/index.scss";
import ConfirmModal from "@/components/controls/ConfirmModal";
import Toastify from "@/components/controls/Toastify";

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
          <ConfirmModal />
          <Toastify />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
