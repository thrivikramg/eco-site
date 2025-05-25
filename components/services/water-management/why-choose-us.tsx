import Image from "next/image"
import { Droplets, Coins, Lightbulb, Gauge, Sprout, Shield } from "lucide-react"

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Water Management Services</h2>
          <p className="text-gray-600">
            Our integrated approach to water management creates sustainable solutions that benefit both your property and the environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Droplets className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Water Conservation</h3>
            <p className="text-gray-600">
              Our systems can reduce water usage by up to 60%, helping to preserve this precious natural resource for future generations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Coins className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Cost Savings</h3>
            <p className="text-gray-600">
              Lower your water bills significantly while potentially qualifying for government rebates and incentives for water conservation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Innovative Solutions</h3>
            <p className="text-gray-600">
              We use the latest technologies and approaches to create custom water management systems tailored to your specific needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Gauge className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Performance Monitoring</h3>
            <p className="text-gray-600">
              Many of our systems include monitoring capabilities so you can track water usage and system performance over time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Sprout className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Healthier Landscapes</h3>
            <p className="text-gray-600">
              Our water management systems deliver appropriate amounts of water to plants, promoting healthier growth and reducing disease.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-2">Environmental Protection</h3>
            <p className="text-gray-600">
              Our systems reduce runoff, prevent erosion, minimize water pollution, and help replenish groundwater supplies.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
