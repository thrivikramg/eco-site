import type { Metadata } from "next"
import HomeSustainabilityHero from "../../../components/services/home-sustainability/hero"
import HomeSustainabilityServices from "../../../components/services/home-sustainability/services"
import WhyChooseUs from "../../../components/services/home-sustainability/why-choose-us"
import Process from "../../../components/services/home-sustainability/process"
import FAQ from "../../../components/services/home-sustainability/faq"
import CallToAction from "../../../components/services/call-to-action"

export const metadata: Metadata = {
  title: "Home Sustainability Services | EcoSaro",
  description: "Transform your home with eco-friendly solutions that reduce your environmental footprint and save on energy costs.",
}

export default function HomeSustainabilityPage() {
  return (
    <>
      <HomeSustainabilityHero />
      <HomeSustainabilityServices />
      <WhyChooseUs />
      <Process />
      <FAQ />
      <CallToAction />
    </>
  )
}
