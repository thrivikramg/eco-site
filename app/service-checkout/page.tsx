import type { Metadata } from "next"
import ServiceCheckoutPageClient from "../../components/service-checkout/service-checkout-page"

export const metadata: Metadata = {
  title: "Service Booking Checkout | EcoGrow",
  description: "Book eco-friendly services for your home and garden with EcoGrow.",
}

export default function ServiceCheckoutPage() {
  return <ServiceCheckoutPageClient />
}
