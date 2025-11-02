import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      avatar?: string | null  // 👈 optional custom avatar
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: string
    avatar?: string | null    // 👈 match backend schema
  }
}
