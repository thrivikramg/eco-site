import Image from "next/image"
import { Leaf, Droplets, Cloud, ShieldCheck, Heart, Clock } from "lucide-react"

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-green-50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Gardening Services</h2>
          <p className="text-gray-600">
            Our sustainable approach to gardening creates beautiful, healthy gardens while protecting the environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Sustainable Practices</h3>
            <p className="text-gray-600">
              We use organic methods that work with nature, not against it, promoting healthy soil and biodiversity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Droplets className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Water Conservation</h3>
            <p className="text-gray-600">
              Our gardens are designed to minimize water usage through smart irrigation and drought-resistant plantings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">No Harmful Chemicals</h3>
            <p className="text-gray-600">
              We avoid synthetic pesticides and fertilizers, keeping your garden safe for children, pets, and wildlife.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Cloud className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Carbon Reduction</h3>
            <p className="text-gray-600">
              Our gardens sequester carbon and reduce your carbon footprint through strategic plant selection and care.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Local Ecosystem Support</h3>
            <p className="text-gray-600">
              We prioritize native plants that support local pollinators, birds, and beneficial insects.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Long-Term Sustainability</h3>
            <p className="text-gray-600">
              Our gardens are designed to thrive for years with minimal maintenance, saving you time and resources.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
