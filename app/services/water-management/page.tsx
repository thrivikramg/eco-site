import type { Metadata } from "next"
import WaterManagementHero from "../../../components/services/water-management/hero"
import WaterManagementServices from "../../../components/services/water-management/services"
import WhyChooseUs from "../../../components/services/water-management/why-choose-us"
import Process from "../../../components/services/water-management/process"
import FAQ from "../../../components/services/water-management/faq"
import CallToAction from "../../../components/services/call-to-action"

export const metadata: Metadata = {
  title: "Water Management Services | EcoGrow",
  description: "Efficient and sustainable water management solutions for homes and businesses to conserve water and reduce costs.",
}

export default function WaterManagementPage() {
  return (
    <>
      <WaterManagementHero />
      <WaterManagementServices />
      <WhyChooseUs />
      <Process />
      <FAQ />
      <CallToAction />
    </>
  )
}
