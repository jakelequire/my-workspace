import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { NextAuthOptions } from "next-auth";

export const authOptions = {
  // Configure one or more authentication providers
  // providers: [
  //   GithubProvider({
  //     clientId: process.env.GITHUB_ID,
  //     clientSecret: process.env.GITHUB_SECRET,
  //   }),
  // ],
  callbacks: {
    async jwt(token: any, user: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session(session: any, token: any) {
      session.userId = token.id;
      return session;
    },
  },
  session: {
    jwt: true,
  },
  database: process.env.NEXT_PRIVATE_DATABASE_URL,
};

// @ts-ignore
export default NextAuth(authOptions) as NextAuthOptions