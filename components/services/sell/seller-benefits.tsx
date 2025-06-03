"use client"

import { ShieldCheck, TrendingUp, Users, Leaf, Gift, RefreshCw } from "lucide-react"

export default function SellerBenefits() {
  const benefits = [
    {
      name: "Access to Eco-Conscious Buyers",
      description: "Connect with millions of customers who prioritize sustainability and eco-friendly products.",
      icon: Users,
    },
    {
      name: "Trusted Brand Association",
      description: "Leverage EcoGrow's trusted reputation in the sustainable marketplace.",
      icon: ShieldCheck,
    },
    {
      name: "Growth Opportunities",
      description: "Expand your business with our marketing tools and seller support programs.",
      icon: TrendingUp,
    },
    {
      name: "Sustainability Certification",
      description: "Get your products eco-certified to increase customer trust and visibility.",
      icon: Leaf,
    },
    {
      name: "Exclusive Seller Incentives",
      description: "Access special promotions and reduced fees for new sellers.",
      icon: Gift,
    },
    {
      name: "Simplified Returns & Support",
      description: "We handle customer service and returns for your products sold on EcoGrow.",
      icon: RefreshCw,
    },
  ]

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-green-600">Seller Benefits</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Why Sell on EcoGrow?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Join thousands of successful sellers who have grown their sustainable businesses on our platform.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.name} className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div>
                  <div className="absolute -top-4 rounded-md bg-green-600 p-3">
                    <benefit.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900">{benefit.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
