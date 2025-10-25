import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

/**
 * Gets the current session from the server-side.
 * Can be used in API routes and server components.
 */
export function getSession() {
  return getServerSession(authOptions)
}