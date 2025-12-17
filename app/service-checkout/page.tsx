import type { Metadata } from "next"
import ServiceCheckoutPageClient from "../../components/service-checkout/service-checkout-page"

export const metadata: Metadata = {
  title: "Service Checkout | EcoSaro",
  description: "Complete your service booking securely.",
}

export default function ServiceCheckoutPage() {
  return <ServiceCheckoutPageClient />
}
