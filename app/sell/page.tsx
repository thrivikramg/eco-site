import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import SellHero from "../../components/services/sell/hero"
import SellerBenefits from "../../components/services/sell/seller-benefits"
import HowToBecomeSeller from "../../components/services/sell/how-to-become-seller"
import SellerFAQ from "../../components/services/sell/faq"
import SellerTestimonials from "../../components/services/sell/testimonials"
import CallToAction from "../../components/services/sell/call-to-action"

export const metadata: Metadata = {
  title: "Sell on EcoSaro | Join Our Eco-Friendly Marketplace",
  description: "Become a seller on EcoSaro and grow your sustainable business. Join our community of eco-conscious sellers and reach customers who value sustainability.",
}

export default function SellPage() {
  return (
    <>
      <SellHero />
      <SellerBenefits />
      <HowToBecomeSeller />
      <SellerTestimonials />
      <SellerFAQ />
      <CallToAction />
    </>
  )
}
