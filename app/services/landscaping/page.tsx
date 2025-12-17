import type { Metadata } from "next"
import LandscapingHero from "../../../components/services/landscaping/hero"
import LandscapingServices from "../../../components/services/landscaping/services"
import WhyChooseUs from "../../../components/services/landscaping/why-choose-us"
import Process from "../../../components/services/landscaping/process"
import FAQ from "../../../components/services/landscaping/faq"
import CallToAction from "../../../components/services/call-to-action"

export const metadata: Metadata = {
  title: "Sustainable Landscaping Services | EcoSaro",
  description: "Transform your outdoor space with eco-friendly landscaping solutions that blend beauty with environmental sustainability.",
}

export default function LandscapingPage() {
  return (
    <>
      <LandscapingHero />
      <LandscapingServices />
      <WhyChooseUs />
      <Process />
      <FAQ />
      <CallToAction />
    </>
  )
}
