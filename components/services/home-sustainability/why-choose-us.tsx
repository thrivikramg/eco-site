import Image from "next/image"
import { LightbulbOff, Leaf, ThermometerSnowflake, Coins, HeartPulse, Zap } from "lucide-react"

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-green-50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Home Sustainability Services</h2>
          <p className="text-gray-600">
            Our integrated approach to home sustainability creates living spaces that are better for the environment, your wallet, and your wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Reduced Environmental Impact</h3>
            <p className="text-gray-600">
              Our solutions help minimize your carbon footprint, conserve resources, and reduce waste generation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Coins className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Lower Utility Bills</h3>
            <p className="text-gray-600">
              Our energy and water-efficient solutions can significantly reduce your monthly utility expenses over time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <HeartPulse className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Healthier Living Environment</h3>
            <p className="text-gray-600">
              Our focus on non-toxic materials, improved air quality, and natural solutions creates a healthier home for your family.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <ThermometerSnowflake className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Improved Comfort</h3>
            <p className="text-gray-600">
              Better insulation, efficient temperature control, and thoughtful design create a more comfortable living space year-round.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <LightbulbOff className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Energy Independence</h3>
            <p className="text-gray-600">
              Our renewable energy solutions reduce your dependence on the grid and protect you from rising energy costs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Increased Home Value</h3>
            <p className="text-gray-600">
              Sustainable home features are increasingly valued by buyers, potentially increasing your property's market value.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
