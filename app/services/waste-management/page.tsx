import type { Metadata } from "next"
import WasteManagementHero from "../../../components/services/waste-management/hero"
import WasteManagementServices from "../../../components/services/waste-management/services"
import WhyChooseUs from "../../../components/services/waste-management/why-choose-us"
import Process from "../../../components/services/waste-management/process"
import FAQ from "../../../components/services/waste-management/faq"
import CallToAction from "../../../components/services/call-to-action"

export const metadata: Metadata = {
  title: "Waste Management Services | EcoSaro",
  description: "Sustainable waste management solutions for homes and businesses to reduce, reuse, recycle, and compost waste effectively.",
}

export default function WasteManagementPage() {
  return (
    <>
      <WasteManagementHero />
      <WasteManagementServices />
      <WhyChooseUs />
      <Process />
      <FAQ />
      <CallToAction />
    </>
  )
}
