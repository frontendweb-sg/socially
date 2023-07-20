import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { AuthError } from "../../errors/auth-error";
import { login } from "@/lib/auth";
import GithubProvider from "next-auth/providers/github";
import { connectDb } from "@/lib/db";
import { IUserDoc, User } from "@/models/user";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 1 * 60 * 60,
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
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
    async signIn({ user, account, profile, credentials }) {
      await connectDb();

      const email = user.email;

      // get the user if the exist
      const userExists = (await User.findOne({ email })) as IUserDoc;

      if (!userExists) {
        const newUser = new User({
          name: user.name,
          email: email,
          image: user.image,
          provider_id: user.id,
        });

        await newUser.save();
      }
      // if they don't exist , create user
      return true;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
