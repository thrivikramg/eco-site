import Image from "next/image"
import { Trees, Droplets, Recycle, ShieldCheck, Leaf, Mountain } from "lucide-react"

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-green-50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Landscaping Services</h2>
          <p className="text-gray-600">
            Our sustainable approach to landscaping creates beautiful outdoor spaces while protecting and enhancing the natural environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Eco-Friendly Materials</h3>
            <p className="text-gray-600">
              We prioritize sustainable, recycled, and locally-sourced materials that minimize environmental impact.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Droplets className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Water Conservation</h3>
            <p className="text-gray-600">
              Our designs incorporate smart irrigation, rainwater harvesting, and drought-resistant plants to minimize water usage.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Trees className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Native Plant Focus</h3>
            <p className="text-gray-600">
              We emphasize native and adapted plants that thrive in local conditions and support regional biodiversity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Recycle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Waste Reduction</h3>
            <p className="text-gray-600">
              We minimize waste through composting, mulching, and recycling landscape materials whenever possible.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Chemical-Free Approaches</h3>
            <p className="text-gray-600">
              Our maintenance practices avoid harmful chemicals, focusing instead on organic and natural solutions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mountain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Habitat Creation</h3>
            <p className="text-gray-600">
              We design landscapes that provide habitat for pollinators, birds, and beneficial wildlife to support ecosystem health.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
