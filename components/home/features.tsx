import { Leaf, Truck, Shield, RefreshCw } from "lucide-react"

const features = [
  {
    name: "Eco-Friendly Products",
    description: "All our products are sustainably sourced and environmentally friendly.",
    icon: Leaf,
  },
  {
    name: "Carbon-Neutral Shipping",
    description: "We offset 100% of carbon emissions from all our deliveries.",
    icon: Truck,
  },
  {
    name: "Verified Suppliers",
    description: "We work only with suppliers who meet our rigorous sustainability standards.",
    icon: Shield,
  },
  {
    name: "Circular Economy",
    description: "Many of our products are designed for reuse, recycling, or composting.",
    icon: RefreshCw,
  },
]

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Choose EcoGrow?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to sustainable practices at every step of the journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="absolute -top-4 -right-4 h-20 w-20 bg-green-50 rounded-full -z-10" />
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{feature.name}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
