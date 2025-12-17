import type { Metadata } from "next"
import Hero from "@/components/community/hero"
import TrendingTopics from "@/components/community/trending-topics"
import Feed from "@/components/community/feed"
import ActiveMembers from "@/components/community/active-members"
import JoinCommunity from "@/components/community/join-community"

export const metadata: Metadata = {
  title: "Community | EcoSaro",
  description: "Connect with like-minded individuals passionate about sustainable living and eco-friendly practices.",
}

export default function CommunityPage() {
  return (
    <main className="flex-1">
      <Hero />
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-8">
            <TrendingTopics />
            <Feed />
          </div>
          <div className="space-y-8">
            <ActiveMembers />
            <JoinCommunity />
          </div>
        </div>
      </div>
    </main>
  )
}
