import Hero from "@/components/home/hero"
import Features from "@/components/home/features"
import FeaturedProducts from "@/components/home/featured-products"
import Services from "@/components/home/services"
import KnowledgeHub from "@/components/home/knowledge-hub"
import Community from "@/components/home/community"
import Newsletter from "@/components/home/newsletter"
import DailyTips from "@/components/home/daily-tips"

export default function Home() {
  return (
    <>
      <Hero />
      <DailyTips />
      <Features />
      <FeaturedProducts />
      <Services />
      <KnowledgeHub />
      <Community />
      <Newsletter />
    </>
  )
}
