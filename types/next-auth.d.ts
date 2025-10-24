import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { UserRole } from "@/models/user";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: UserRole;
  }
}
