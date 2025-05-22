import type { Metadata } from "next"
import ProfilePage from "@/components/profile/profile-page"

export const metadata: Metadata = {
  title: "My Profile | EcoGrow",
  description: "Manage your account, orders, bookings, and referrals.",
}

export default async function ProfileRoute() {
  // In a real app, this would check the session server-side
  // For demo purposes, we'll redirect to login
  // const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect("/login?callbackUrl=/profile")
  // }

  return <ProfilePage />
}
