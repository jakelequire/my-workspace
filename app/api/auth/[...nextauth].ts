import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session(session, token) {
      session.userId = token.id;
      return session;
    },
  },
  session: {
    jwt: true,
  },
  database: process.env.NEXT_PRIVATE_DATABASE_URL,
};


export default NextAuth(authOptions)