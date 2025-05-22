import type { Metadata } from "next"
import SanctuariesMap from "@/components/eco-library/sanctuaries-map"
import SanctuariesList from "@/components/eco-library/sanctuaries-list"

export const metadata: Metadata = {
  title: "Wildlife Sanctuaries | EcoGrow",
  description: "Explore wildlife sanctuaries and conservation areas around the world.",
}

export default function SanctuariesPage() {
  return (
    <>
      <SanctuariesMap />
      <SanctuariesList />
    </>
  )
}
