import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./authconfig"
import { connectToDB } from "./lib/utils"
import bcrypt from "bcrypt"
import { User } from "./lib/models"

const login = async (credentials) => {
  console.log(credentials)
  try {
    connectToDB();
    const user = await User.findOne({ username: credentials.username });

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.isAdmin = user.isAdmin
        token.nameAndSurname = user.nameAndSurname

      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.isAdmin = token.isAdmin
        session.user.nameAndSurname = token.nameAndSurname
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
});