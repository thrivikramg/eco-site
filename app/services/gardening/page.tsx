import type { Metadata } from "next"
import GardeningHero from "../../../components/services/gardening/hero"
import GardeningServices from "../../../components/services/gardening/services"
import WhyChooseUs from "../../../components/services/gardening/why-choose-us"
import Process from "../../../components/services/gardening/process"
import FAQ from "../../../components/services/gardening/faq"
import CallToAction from "../../../components/services/call-to-action"

export const metadata: Metadata = {
  title: "Professional Gardening Services | EcoGrow",
  description: "Sustainable and organic gardening solutions for beautiful, thriving gardens using eco-friendly practices.",
}

export default function GardeningPage() {
  return (
    <>
      <GardeningHero />
      <GardeningServices />
      <WhyChooseUs />
      <Process />
      <FAQ />
      <CallToAction />
    </>
  )
}
