"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import AppProvider from "./AppProvider";

const AuthSessionProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <AppProvider>{children}</AppProvider>
    </SessionProvider>
  );
};

export default AuthSessionProvider;
