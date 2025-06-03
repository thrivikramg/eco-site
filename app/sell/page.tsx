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
  title: "Sell on EcoGrow | Join Our Eco-Friendly Marketplace",
  description: "Become a seller on EcoGrow and grow your sustainable business. Join our community of eco-conscious sellers and reach customers who value sustainability.",
}

export default function SellPage() {
  return (
    <>
      {/* Temporary dashboard button - to be removed */}
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="bg-yellow-100 p-4 rounded-md flex items-center justify-between">
          <p className="text-yellow-800 font-medium text-sm">
            <span className="font-bold">TEMPORARY:</span> This button is for development purposes only and will be removed.
          </p>
          <Link href="/dashboard">
            <Button className="bg-green-600 hover:bg-green-700">
              Go to Vendor Dashboard
            </Button>
          </Link>
        </div>
      </div>
      
      <SellHero />
      <SellerBenefits />
      <HowToBecomeSeller />
      <SellerTestimonials />
      <SellerFAQ />
      <CallToAction />
    </>
  )
}
