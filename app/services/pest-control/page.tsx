import type { Metadata } from "next"
import PestControlHero from "@/components/services/pest-control/hero"
import PestControlServices from "@/components/services/pest-control/services"
import WhyChooseUs from "@/components/services/pest-control/why-choose-us"
import Process from "@/components/services/pest-control/process"
import FAQ from "@/components/services/pest-control/faq"
import CallToAction from "@/components/services/call-to-action"

export const metadata: Metadata = {
  title: "Organic Pest Control Services | EcoSaro",
  description: "Eco-friendly pest management solutions using natural ingredients and biological controls.",
}

export default function PestControlPage() {
  return (
    <>
      <PestControlHero />
      <PestControlServices />
      <WhyChooseUs />
      <Process />
      <FAQ />
      <CallToAction />
    </>
  )
}
