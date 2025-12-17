import type { Metadata } from "next"
import EcoLibraryHero from "@/components/eco-library/hero"
import LibraryCategories from "@/components/eco-library/library-categories"
import FeaturedArticles from "@/components/eco-library/featured-articles"
import PlantDiseaseBanner from "@/components/eco-library/plant-disease-banner"
import SanctuariesPreview from "@/components/eco-library/sanctuaries-preview"
import Newsletter from "@/components/home/newsletter"
import TipsTutorials from "@/components/eco-library/tips-tutorials"

export const metadata: Metadata = {
  title: "Eco Library | EcoSaro",
  description: "Explore our knowledge hub for sustainable living, gardening tips, and environmental education.",
}

export default function EcoLibraryPage() {
  return (
    <>
      <EcoLibraryHero />
      <TipsTutorials />
      <LibraryCategories />
      <FeaturedArticles />
      <PlantDiseaseBanner />
      <SanctuariesPreview />
      <Newsletter />
    </>
  )
}
