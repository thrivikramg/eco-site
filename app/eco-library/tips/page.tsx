import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Leaf, Droplets, Recycle, Home, Sun, Car, ShoppingBag, Utensils, Sprout, ArrowUpRight } from "lucide-react"
import { Separator } from "../../../components/ui/separator"
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"

export const metadata: Metadata = {
  title: "Eco Tips & Tutorials | EcoGrow",
  description: "Comprehensive guide to sustainable living, eco-friendly practices, and environmental conservation.",
}

export default function TipsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-800 to-green-700 text-white py-16">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl">
            Sustainable Living Tips & Eco-Friendly Practices
          </h1>
          <p className="text-lg md:text-xl max-w-2xl opacity-90">
            Your comprehensive guide to living in harmony with nature and reducing your environmental footprint.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-800">Why Sustainable Living Matters</h2>
          <p className="text-gray-700 mb-6">
            Sustainable living is about making choices that reduce our negative impact on the environment. By adopting
            eco-friendly practices, we can help preserve natural resources, protect ecosystems, and ensure a healthier
            planet for future generations. The tips and guides on this page are designed to help you incorporate
            sustainability into every aspect of your daily life.
          </p>
          <Separator className="my-8 bg-emerald-200" />
        </div>
      </section>

      {/* Modular Grid Layout */}
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Module 1: Sustainable Living Basics */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-emerald-100 hover:shadow-lg transition-shadow">
            <div className="bg-emerald-700 p-4 flex items-center gap-3">
              <Leaf className="h-6 w-6 text-white" />
              <h3 className="text-xl font-semibold text-white">Sustainable Living Basics</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-emerald-800 mb-1">Reduce, Reuse, Recycle</h4>
                  <p className="text-gray-700 text-sm">
                    The cornerstone of sustainable living. Reduce what you consume, reuse items when possible, and
                    recycle materials properly. Aim to reduce single-use items and packaging by choosing products with
                    minimal or recyclable packaging.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-emerald-800 mb-1">Mindful Consumption</h4>
                  <p className="text-gray-700 text-sm">
                    Before purchasing, ask yourself if you truly need the item. Consider the item's lifecycle, from
                    production to disposal. Choose quality over quantity to reduce waste and save resources in the long
                    run.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-emerald-800 mb-1">Eco-Friendly Alternatives</h4>
                  <p className="text-gray-700 text-sm">
                    Replace conventional products with eco-friendly alternatives. Look for products made from
                    sustainable materials, produced using ethical practices, and designed for longevity and
                    recyclability.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Module 2: Energy Conservation */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-emerald-100 hover:shadow-lg transition-shadow">
            <div className="bg-amber-600 p-4 flex items-center gap-3">
              <Sun className="h-6 w-6 text-white" />
              <h3 className="text-xl font-semibold text-white">Energy Conservation</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-amber-800 mb-1">Efficient Appliances</h4>
                  <p className="text-gray-700 text-sm">
                    Choose energy-efficient appliances with high ENERGY STAR ratings. These appliances use less
                    electricity while providing the same functionality, reducing both your carbon footprint and utility
                    bills.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-amber-800 mb-1">Smart Energy Habits</h4>
                  <p className="text-gray-700 text-sm">
                    Turn off lights and unplug electronics when not in use. Use smart power strips to eliminate phantom
                    energy use. Adjust your thermostat to use less heating and cooling when you're away or sleeping.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-amber-800 mb-1">Renewable Energy</h4>
                  <p className="text-gray-700 text-sm">
                    Consider installing solar panels or subscribing to a renewable energy program through your utility
                    provider. Even small steps toward renewable energy can significantly reduce your carbon footprint.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Module 3: Water Conservation */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-emerald-100 hover:shadow-lg transition-shadow">
            <div className="bg-blue-600 p-4 flex items-center gap-3">
              <Droplets className="h-6 w-6 text-white" />
              <h3 className="text-xl font-semibold text-white">Water Conservation</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-blue-800 mb-1">Daily Water-Saving Habits</h4>
                  <p className="text-gray-700 text-sm">
                    Turn off the tap while brushing teeth or soaping hands. Take shorter showers and fix leaky faucets
                    promptly. These simple habits can save thousands of gallons of water annually.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-blue-800 mb-1">Water-Efficient Fixtures</h4>
                  <p className="text-gray-700 text-sm">
                    Install low-flow showerheads, faucet aerators, and dual-flush toilets. These fixtures can reduce
                    water usage by 30-50% without sacrificing performance.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-blue-800 mb-1">Rainwater Harvesting</h4>
                  <p className="text-gray-700 text-sm">
                    Collect rainwater in barrels or tanks for garden irrigation. This reduces demand on municipal water
                    supplies and helps manage stormwater runoff, which can cause erosion and water pollution.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Module 4: Waste Reduction */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-emerald-100 hover:shadow-lg transition-shadow">
            <div className="bg-purple-600 p-4 flex items-center gap-3">
              <Recycle className="h-6 w-6 text-white" />
              <h3 className="text-xl font-semibold text-white">Waste Reduction</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-purple-800 mb-1">Zero-Waste Shopping</h4>
                  <p className="text-gray-700 text-sm">
                    Bring reusable bags, containers, and produce bags when shopping. Buy in bulk to reduce packaging
                    waste. Support stores that offer package-free options or allow you to use your own containers.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-purple-800 mb-1">Composting</h4>
                  <p className="text-gray-700 text-sm">
                    Compost food scraps and yard waste to create nutrient-rich soil for your garden. This diverts waste
                    from landfills where it would generate methane, a potent greenhouse gas, and instead creates a
                    valuable resource.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-purple-800 mb-1">Proper Recycling</h4>
                  <p className="text-gray-700 text-sm">
                    Learn your local recycling guidelines and follow them carefully. Contamination can cause entire
                    batches of recyclables to be sent to landfills. Clean containers before recycling and keep materials
                    separated as required.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Module 5: Sustainable Gardening */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-emerald-100 hover:shadow-lg transition-shadow">
            <div className="bg-green-600 p-4 flex items-center gap-3">
              <Sprout className="h-6 w-6 text-white" />
              <h3 className="text-xl font-semibold text-white">Sustainable Gardening</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-green-800 mb-1">Native Plants</h4>
                  <p className="text-gray-700 text-sm">
                    Choose native plants that are adapted to your local climate and require less water and maintenance.
                    Native plants also provide essential habitat and food for local wildlife and pollinators.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-green-800 mb-1">Organic Gardening</h4>
                  <p className="text-gray-700 text-sm">
                    Avoid synthetic pesticides and fertilizers. Instead, use compost, mulch, and natural pest control
                    methods. This protects beneficial insects, soil health, and water quality while producing healthier
                    plants.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-green-800 mb-1">Water-Wise Landscaping</h4>
                  <p className="text-gray-700 text-sm">
                    Group plants with similar water needs together. Use drip irrigation or soaker hoses to deliver water
                    directly to plant roots. Mulch garden beds to retain moisture and suppress weeds naturally.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Module 6: Eco-Friendly Home */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-emerald-100 hover:shadow-lg transition-shadow">
            <div className="bg-teal-600 p-4 flex items-center gap-3">
              <Home className="h-6 w-6 text-white" />
              <h3 className="text-xl font-semibold text-white">Eco-Friendly Home</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-teal-800 mb-1">Natural Cleaning Products</h4>
                  <p className="text-gray-700 text-sm">
                    Make your own cleaning products using ingredients like vinegar, baking soda, and essential oils.
                    These natural alternatives are effective, affordable, and free from harmful chemicals that can
                    affect indoor air quality.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-teal-800 mb-1">Energy-Efficient Home</h4>
                  <p className="text-gray-700 text-sm">
                    Improve insulation, seal drafts, and install energy-efficient windows to reduce heating and cooling
                    needs. Use LED lighting throughout your home to reduce electricity consumption by up to 80% compared
                    to traditional bulbs.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-teal-800 mb-1">Sustainable Furniture</h4>
                  <p className="text-gray-700 text-sm">
                    Choose furniture made from sustainable materials like FSC-certified wood, bamboo, or reclaimed
                    materials. Consider secondhand or vintage pieces to reduce demand for new resources and keep usable
                    items out of landfills.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Module 7: Sustainable Transportation */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-emerald-100 hover:shadow-lg transition-shadow">
            <div className="bg-indigo-600 p-4 flex items-center gap-3">
              <Car className="h-6 w-6 text-white" />
              <h3 className="text-xl font-semibold text-white">Sustainable Transportation</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-indigo-800 mb-1">Active Transportation</h4>
                  <p className="text-gray-700 text-sm">
                    Walk or bike for short trips when possible. This reduces emissions, saves money, and improves your
                    health. Consider an electric bike for longer commutes or hilly terrain.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-indigo-800 mb-1">Public Transit</h4>
                  <p className="text-gray-700 text-sm">
                    Use buses, trains, and other public transportation options to reduce your carbon footprint. A single
                    bus can replace dozens of cars on the road, significantly reducing emissions per passenger.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-indigo-800 mb-1">Eco-Friendly Vehicles</h4>
                  <p className="text-gray-700 text-sm">
                    If you need a car, consider electric or hybrid vehicles. Keep your vehicle well-maintained for
                    optimal fuel efficiency. Practice eco-driving techniques like smooth acceleration and maintaining a
                    steady speed.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Module 8: Sustainable Food Choices */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-emerald-100 hover:shadow-lg transition-shadow">
            <div className="bg-orange-600 p-4 flex items-center gap-3">
              <Utensils className="h-6 w-6 text-white" />
              <h3 className="text-xl font-semibold text-white">Sustainable Food Choices</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-orange-800 mb-1">Plant-Rich Diet</h4>
                  <p className="text-gray-700 text-sm">
                    Incorporate more plant-based meals into your diet. Plant foods generally have a lower environmental
                    footprint than animal products in terms of land use, water consumption, and greenhouse gas
                    emissions.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-orange-800 mb-1">Local and Seasonal</h4>
                  <p className="text-gray-700 text-sm">
                    Choose locally grown, seasonal produce to reduce the carbon footprint associated with
                    transportation. Visit farmers' markets or join a CSA (Community Supported Agriculture) program to
                    support local farmers.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-orange-800 mb-1">Reduce Food Waste</h4>
                  <p className="text-gray-700 text-sm">
                    Plan meals, store food properly, and use leftovers creatively to minimize waste. Approximately
                    one-third of all food produced globally is wasted, contributing to unnecessary resource use and
                    greenhouse gas emissions.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Module 9: Sustainable Shopping */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-emerald-100 hover:shadow-lg transition-shadow">
            <div className="bg-pink-600 p-4 flex items-center gap-3">
              <ShoppingBag className="h-6 w-6 text-white" />
              <h3 className="text-xl font-semibold text-white">Sustainable Shopping</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-pink-800 mb-1">Ethical Brands</h4>
                  <p className="text-gray-700 text-sm">
                    Support companies with strong environmental and social commitments. Research brands' sustainability
                    practices and choose those that align with your values regarding fair labor, resource conservation,
                    and pollution reduction.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-pink-800 mb-1">Quality Over Quantity</h4>
                  <p className="text-gray-700 text-sm">
                    Invest in high-quality, durable items rather than cheap, disposable alternatives. This approach
                    saves money in the long run and reduces the environmental impact of manufacturing and disposal.
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold text-pink-800 mb-1">Second-Hand Shopping</h4>
                  <p className="text-gray-700 text-sm">
                    Explore thrift stores, online marketplaces, and swap events for clothing, furniture, and other
                    goods. Giving pre-owned items a second life extends their usefulness and prevents them from entering
                    landfills.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Seasonal Tips Section */}
      <section className="py-16 container px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-emerald-800">
          Seasonal Sustainability Tips
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Spring */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold mb-4 text-green-800">Spring</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                <span>Start a vegetable garden using organic, non-GMO seeds</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                <span>Install a rain barrel to collect water for summer gardening</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                <span>Use natural cleaning products for spring cleaning</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                <span>Open windows instead of using air conditioning on mild days</span>
              </li>
            </ul>
          </div>

          {/* Summer */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-xl font-semibold mb-4 text-yellow-800">Summer</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
                <span>Water gardens early morning or evening to reduce evaporation</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
                <span>Use ceiling fans to reduce air conditioning needs</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
                <span>Hang laundry outside to dry instead of using a dryer</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
                <span>Choose mineral-based, reef-safe sunscreens</span>
              </li>
            </ul>
          </div>

          {/* Fall */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
            <h3 className="text-xl font-semibold mb-4 text-orange-800">Fall</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                <span>Compost fallen leaves instead of bagging for landfill</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                <span>Seal drafts around windows and doors before cold weather</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                <span>Plant trees and shrubs for future energy savings</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                <span>Preserve summer harvest through canning and freezing</span>
              </li>
            </ul>
          </div>

          {/* Winter */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">Winter</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                <span>Lower thermostat at night and when away from home</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                <span>Use LED holiday lights and decorations</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                <span>Choose sustainable gift options and minimal packaging</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                <span>Plan spring garden using heirloom seed catalogs</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quick Reference Guide */}
      <section className="py-12 bg-emerald-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-emerald-800">Quick Reference Guide</h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-emerald-100">
                    <th className="py-3 px-4 text-left text-emerald-800 font-semibold">Area</th>
                    <th className="py-3 px-4 text-left text-emerald-800 font-semibold">Easy Actions</th>
                    <th className="py-3 px-4 text-left text-emerald-800 font-semibold">Medium Effort</th>
                    <th className="py-3 px-4 text-left text-emerald-800 font-semibold">High Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  <tr>
                    <td className="py-3 px-4 font-medium">Energy</td>
                    <td className="py-3 px-4">Turn off lights, unplug devices</td>
                    <td className="py-3 px-4">Switch to LED bulbs, use smart power strips</td>
                    <td className="py-3 px-4">Install solar panels, upgrade to energy-efficient appliances</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Water</td>
                    <td className="py-3 px-4">Take shorter showers, turn off tap while brushing</td>
                    <td className="py-3 px-4">Install low-flow fixtures, fix leaks</td>
                    <td className="py-3 px-4">Rainwater harvesting system, greywater recycling</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Waste</td>
                    <td className="py-3 px-4">Bring reusable bags, refuse straws</td>
                    <td className="py-3 px-4">Compost food scraps, buy in bulk</td>
                    <td className="py-3 px-4">Adopt zero-waste lifestyle, create a circular home economy</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Transportation</td>
                    <td className="py-3 px-4">Combine errands, maintain proper tire pressure</td>
                    <td className="py-3 px-4">Use public transit, carpool</td>
                    <td className="py-3 px-4">Switch to electric vehicle, bike to work</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Food</td>
                    <td className="py-3 px-4">Reduce food waste, eat seasonal produce</td>
                    <td className="py-3 px-4">Start a garden, shop at farmers markets</td>
                    <td className="py-3 px-4">Adopt plant-based diet, grow substantial portion of food</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 container px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-emerald-800">Start Your Sustainable Journey Today</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-8">
          Every small action adds up to create meaningful change. Begin with one sustainable practice and gradually
          incorporate more as they become habits.
        </p>
        <div className="inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-r from-emerald-600 to-green-600">
          <button className="px-8 py-3 rounded-full bg-white text-emerald-700 font-medium hover:bg-transparent hover:text-white transition-colors">
            Take The Eco Pledge
          </button>
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="py-16 container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-emerald-800">Related Articles</h2>
            <p className="text-gray-600 max-w-2xl">
              Dive deeper into sustainable living with our curated collection of articles and resources.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              href="/eco-library/tips/all" 
              className="inline-flex items-center text-emerald-700 font-medium hover:text-emerald-800"
            >
              View all articles
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image 
                src="/placeholder.svg?height=300&width=500&text=Water+Conservation"
                alt="Water Conservation" 
                fill 
                className="object-cover" 
              />
              <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700 text-white">Conservation</Badge>
            </div>
            <CardContent className="p-5">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>May 18, 2025</span>
                <span className="mx-2">•</span>
                <span>5 min read</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Water Conservation During Drought Season</h3>
              <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                Learn effective techniques to conserve water during the ongoing drought conditions affecting many regions.
              </p>
              <a 
                href="https://www.epa.gov/watersense/start-saving" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Read more <ArrowUpRight className="ml-1 h-3 w-3" />
              </a>
            </CardContent>
          </Card>

          <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image 
                src="/placeholder.svg?height=300&width=500&text=Plastic+Alternatives"
                alt="Plastic Alternatives" 
                fill 
                className="object-cover" 
              />
              <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-700 text-white">Sustainability</Badge>
            </div>
            <CardContent className="p-5">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>May 15, 2025</span>
                <span className="mx-2">•</span>
                <span>7 min read</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sustainable Alternatives to Single-Use Plastics</h3>
              <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                Discover eco-friendly alternatives to common single-use plastic items in your daily life.
              </p>
              <a 
                href="https://www.nationalgeographic.com/environment/article/how-to-reduce-plastic-use" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Read more <ArrowUpRight className="ml-1 h-3 w-3" />
              </a>
            </CardContent>
          </Card>

          <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image 
                src="/placeholder.svg?height=300&width=500&text=Urban+Gardening"
                alt="Urban Gardening" 
                fill 
                className="object-cover" 
              />
              <Badge className="absolute top-3 left-3 bg-amber-600 hover:bg-amber-700 text-white">Gardening</Badge>
            </div>
            <CardContent className="p-5">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>May 10, 2025</span>
                <span className="mx-2">•</span>
                <span>6 min read</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Urban Gardening in Small Spaces</h3>
              <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                Transform your balcony or windowsill into a thriving garden with these space-saving techniques.
              </p>
              <a 
                href="https://www.gardeningknowhow.com/special/urban/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-600 hover:text-amber-700 text-sm font-medium"
              >
                Read more <ArrowUpRight className="ml-1 h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-10 text-center">
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2" 
            asChild
          >
            <Link href="/eco-library">Explore Our Full Eco-Library</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
