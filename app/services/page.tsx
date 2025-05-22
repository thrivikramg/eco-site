import type { Metadata } from "next"
import ServicesHero from "@/components/services/hero"
import ServiceCategories from "@/components/services/service-categories"
import FeaturedServices from "@/components/services/featured-services"
import HowItWorks from "@/components/services/how-it-works"
import Testimonials from "@/components/services/testimonials"
import ServiceFAQ from "@/components/services/faq"
import CallToAction from "@/components/services/call-to-action"

export const metadata: Metadata = {
  title: "Eco-Friendly Services | EcoGrow",
  description: "Book professional eco-friendly services for your home and garden.",
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceCategories />
      <FeaturedServices />
      <HowItWorks />
      <Testimonials />
      <ServiceFAQ />
      <CallToAction />
    </>
  )
}
