import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      mobile: string;
      active: boolean;
      resetToken: string;
    } & DefaultSession["user"];
  }
}
