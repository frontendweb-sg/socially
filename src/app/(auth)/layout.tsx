"use client";
import { useRedirect } from "@/hooks/useRedirect";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  useRedirect();
  return <main>{children}</main>;
};

export default Layout;
