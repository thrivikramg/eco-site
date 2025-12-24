import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import dbConnect from "@/lib/dbconnect"
import { User } from "@/models/user"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        await dbConnect()

        const user = await User.findOne({ email: credentials.email }).select("+password")
        if (!user) return null

        const isMatch = await bcrypt.compare(credentials.password, user.password)
        if (!isMatch) return null

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        } as any // 👈 REQUIRED for CredentialsProvider
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },

    async session({ session, token }) {
      if (!session.user || !token.sub) return session

      session.user.id = token.sub
      session.user.role = token.role as string

      return session
    },
  },
}
