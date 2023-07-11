import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { AuthError } from "../../errors/auth-error";
import { login } from "@/lib/auth";

const handler = NextAuth({
  jwt: {
    maxAge: 1 * 60 * 60,
  },
  providers: [
    CredentialProvider({
      name: "Signin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const data = await login({
          email: credentials?.email!,
          password: credentials?.password!,
        });

        if (data?.errors) {
          throw new AuthError(data.errors.message);
        }

        if (data) {
          return data;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
