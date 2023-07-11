import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { AuthError } from "../../errors/auth-error";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 1 * 60 * 60,
  },
  session: {
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
        const response = await fetch(process.env.NEXTAUTH_URL + "/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials!),
        });

        const user = await response.json();

        if (user?.errors) {
          throw new AuthError(user.errors.message);
        }

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
