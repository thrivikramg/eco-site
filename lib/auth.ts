import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/user";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("No user found with this email");

        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role || "buyer",
        } as any;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await connectToDatabase();

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image || "",
          role: "buyer",
          isEmailVerified: true,
          authType: account?.provider || "credentials",
        });
      }

      return true;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },

    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider !== "credentials") {
          const dbUser = await User.findOne({ email: user.email });
          if (dbUser) {
            token.sub = dbUser._id.toString();
            token.role = dbUser.role;
          }
        } else {
          token.sub = user.id;
          token.role = (user as any).role;
        }
      }

      const existingUser = await User.findById(token.sub);
      if (existingUser) {
        token.role = existingUser.role;
      }

      return token;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
