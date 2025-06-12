'use client';

import React, { useState } from "react"
import { X, Leaf, Droplets, Recycle, Home, Sun, Car, ShoppingBag, Utensils, Sprout, ArrowUpRight, Heart, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface ContentItem {
  title: string;
  description: string;
}

interface ModuleType {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  bgColor: string;
  textColor: string;
  content: ContentItem[];
}

type PledgeItem = {
  id: number;
  text: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  completed: boolean;
};

const modules = [
  {
    id: 1,
    title: "Sustainable Living Basics",
    icon: Leaf,
    color: "emerald",
    bgColor: "bg-emerald-700",
    textColor: "text-emerald-800",
    content: [
      {
        title: "Reduce, Reuse, Recycle",
        description: "The cornerstone of sustainable living. Reduce what you consume, reuse items when possible, and recycle materials properly. Aim to reduce single-use items and packaging by choosing products with minimal or recyclable packaging."
      },
      {
        title: "Mindful Consumption",
        description: "Before purchasing, ask yourself if you truly need the item. Consider the item's lifecycle, from production to disposal. Choose quality over quantity to reduce waste and save resources in the long run."
      },
      {
        title: "Eco-Friendly Alternatives",
        description: "Replace conventional products with eco-friendly alternatives. Look for products made from sustainable materials, produced using ethical practices, and designed for longevity and recyclability."
      }
    ]
  },
  {
    id: 2,
    title: "Energy Conservation",
    icon: Sun,
    color: "amber",
    bgColor: "bg-amber-600",
    textColor: "text-amber-800",
    content: [
      {
        title: "Efficient Appliances",
        description: "Choose energy-efficient appliances with high ENERGY STAR ratings. These appliances use less electricity while providing the same functionality, reducing both your carbon footprint and utility bills."
      },
      {
        title: "Smart Energy Habits",
        description: "Turn off lights and unplug electronics when not in use. Use smart power strips to eliminate phantom energy use. Adjust your thermostat to use less heating and cooling when you're away or sleeping."
      },
      {
        title: "Renewable Energy",
        description: "Consider installing solar panels or subscribing to a renewable energy program through your utility provider. Even small steps toward renewable energy can significantly reduce your carbon footprint."
      }
    ]
  },
  {
    id: 3,
    title: "Water Conservation",
    icon: Droplets,
    color: "blue",
    bgColor: "bg-blue-600",
    textColor: "text-blue-800",
    content: [
      {
        title: "Daily Water-Saving Habits",
        description: "Turn off the tap while brushing teeth or soaping hands. Take shorter showers and fix leaky faucets promptly. These simple habits can save thousands of gallons of water annually."
      },
      {
        title: "Water-Efficient Fixtures",
        description: "Install low-flow showerheads, faucet aerators, and dual-flush toilets. These fixtures can reduce water usage by 30-50% without sacrificing performance."
      },
      {
        title: "Rainwater Harvesting",
        description: "Collect rainwater in barrels or tanks for garden irrigation. This reduces demand on municipal water supplies and helps manage stormwater runoff, which can cause erosion and water pollution."
      }
    ]
  },
  {
    id: 4,
    title: "Waste Reduction",
    icon: Recycle,
    color: "purple",
    bgColor: "bg-purple-600",
    textColor: "text-purple-800",
    content: [
      {
        title: "Zero-Waste Shopping",
        description: "Bring reusable bags, containers, and produce bags when shopping. Buy in bulk to reduce packaging waste. Support stores that offer package-free options or allow you to use your own containers."
      },
      {
        title: "Composting",
        description: "Compost food scraps and yard waste to create nutrient-rich soil for your garden. This diverts waste from landfills where it would generate methane, a potent greenhouse gas, and instead creates a valuable resource."
      },
      {
        title: "Proper Recycling",
        description: "Learn your local recycling guidelines and follow them carefully. Contamination can cause entire batches of recyclables to be sent to landfills. Clean containers before recycling and keep materials separated as required."
      }
    ]
  },
  {
    id: 5,
    title: "Sustainable Gardening",
    icon: Sprout,
    color: "green",
    bgColor: "bg-green-600",
    textColor: "text-green-800",
    content: [
      {
        title: "Native Plants",
        description: "Choose native plants that are adapted to your local climate and require less water and maintenance. Native plants also provide essential habitat and food for local wildlife and pollinators."
      },
      {
        title: "Organic Gardening",
        description: "Avoid synthetic pesticides and fertilizers. Instead, use compost, mulch, and natural pest control methods. This protects beneficial insects, soil health, and water quality while producing healthier plants."
      },
      {
        title: "Water-Wise Landscaping",
        description: "Group plants with similar water needs together. Use drip irrigation or soaker hoses to deliver water directly to plant roots. Mulch garden beds to retain moisture and suppress weeds naturally."
      }
    ]
  },
  {
    id: 6,
    title: "Eco-Friendly Home",
    icon: Home,
    color: "teal",
    bgColor: "bg-teal-600",
    textColor: "text-teal-800",
    content: [
      {
        title: "Natural Cleaning Products",
        description: "Make your own cleaning products using ingredients like vinegar, baking soda, and essential oils. These natural alternatives are effective, affordable, and free from harmful chemicals that can affect indoor air quality."
      },
      {
        title: "Energy-Efficient Home",
        description: "Improve insulation, seal drafts, and install energy-efficient windows to reduce heating and cooling needs. Use LED lighting throughout your home to reduce electricity consumption by up to 80% compared to traditional bulbs."
      },
      {
        title: "Sustainable Furniture",
        description: "Choose furniture made from sustainable materials like FSC-certified wood, bamboo, or reclaimed materials. Consider secondhand or vintage pieces to reduce demand for new resources and keep usable items out of landfills."
      }
    ]
  },
  {
    id: 7,
    title: "Sustainable Transportation",
    icon: Car,
    color: "indigo",
    bgColor: "bg-indigo-600",
    textColor: "text-indigo-800",
    content: [
      {
        title: "Active Transportation",
        description: "Walk or bike for short trips when possible. This reduces emissions, saves money, and improves your health. Consider an electric bike for longer commutes or hilly terrain."
      },
      {
        title: "Public Transit",
        description: "Use buses, trains, and other public transportation options to reduce your carbon footprint. A single bus can replace dozens of cars on the road, significantly reducing emissions per passenger."
      },
      {
        title: "Eco-Friendly Vehicles",
        description: "If you need a car, consider electric or hybrid vehicles. Keep your vehicle well-maintained for optimal fuel efficiency. Practice eco-driving techniques like smooth acceleration and maintaining a steady speed."
      }
    ]
  },
  {
    id: 8,
    title: "Sustainable Food Choices",
    icon: Utensils,
    color: "orange",
    bgColor: "bg-orange-600",
    textColor: "text-orange-800",
    content: [
      {
        title: "Plant-Rich Diet",
        description: "Incorporate more plant-based meals into your diet. Plant foods generally have a lower environmental footprint than animal products in terms of land use, water consumption, and greenhouse gas emissions."
      },
      {
        title: "Local and Seasonal",
        description: "Choose locally grown, seasonal produce to reduce the carbon footprint associated with transportation. Visit farmers' markets or join a CSA (Community Supported Agriculture) program to support local farmers."
      },
      {
        title: "Reduce Food Waste",
        description: "Plan meals, store food properly, and use leftovers creatively to minimize waste. Approximately one-third of all food produced globally is wasted, contributing to unnecessary resource use and greenhouse gas emissions."
      }
    ]
  },
  {
    id: 9,
    title: "Sustainable Shopping",
    icon: ShoppingBag,
    color: "pink",
    bgColor: "bg-pink-600",
    textColor: "text-pink-800",
    content: [
      {
        title: "Ethical Brands",
        description: "Support companies with strong environmental and social commitments. Research brands' sustainability practices and choose those that align with your values regarding fair labor, resource conservation, and pollution reduction."
      },
      {
        title: "Quality Over Quantity",
        description: "Invest in high-quality, durable items rather than cheap, disposable alternatives. This approach saves money in the long run and reduces the environmental impact of manufacturing and disposal."
      },
      {
        title: "Second-Hand Shopping",
        description: "Explore thrift stores, online marketplaces, and swap events for clothing, furniture, and other goods. Giving pre-owned items a second life extends their usefulness and prevents them from entering landfills."
      }
    ]
  }
]

const AnimatedEcoSystem = () => {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Central leaf icon */}
      <div className="absolute w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center z-10 shadow-lg">
        <Leaf className="w-8 h-8 text-white" />
      </div>
      
      {/* Rotating circle path */}
      <div className="absolute w-60 h-60 border-2 border-emerald-300/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
        {/* Sun icon */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-md">
          <Sun className="w-5 h-5 text-white" />
        </div>
        
        {/* Water droplet icon */}
        <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
          <Droplets className="w-5 h-5 text-white" />
        </div>
        
        {/* Recycle icon */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-md">
          <Recycle className="w-5 h-5 text-white" />
        </div>
        
        {/* Home icon */}
        <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center shadow-md">
          <Home className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Floating background elements */}
      <div className="absolute top-10 left-10 w-3 h-3 bg-emerald-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 left-16 w-2 h-2 bg-green-400 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-16 right-12 w-4 h-4 bg-emerald-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 right-20 w-3 h-3 bg-green-500 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
    </div>
  )
}

export default function EcoTipsPage() {
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null)
  const [showPledgeModal, setShowPledgeModal] = useState(false)
  const [pledgeItems, setPledgeItems] = useState<PledgeItem[]>([
    { id: 1, text: "I will reduce my single-use plastic consumption", icon: Recycle, completed: false },
    { id: 2, text: "I will turn off lights when leaving a room", icon: Sun, completed: false },
    { id: 3, text: "I will take shorter showers to conserve water", icon: Droplets, completed: false },
    { id: 4, text: "I will choose reusable bags when shopping", icon: ShoppingBag, completed: false },
    { id: 5, text: "I will eat more plant-based meals", icon: Leaf, completed: false },
    { id: 6, text: "I will walk or bike for short trips when possible", icon: Car, completed: false }
  ])
  const [pledgeCompleted, setPledgeCompleted] = useState(false)

  const handlePledgeToggle = (id: number) => {
    setPledgeItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const completedCount = pledgeItems.filter(item => item.completed).length
  const allCompleted = completedCount === pledgeItems.length

  const handleTakePledge = () => {
    if (allCompleted) {
      setPledgeCompleted(true)
      setTimeout(() => {
        setShowPledgeModal(false)
        setPledgeCompleted(false)
        // Reset pledges after closing
        setTimeout(() => {
          setPledgeItems(prev => prev.map(item => ({ ...item, completed: false })))
        }, 1000)
      }, 3000)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Compact Banner */}
      <section className="bg-gradient-to-r from-emerald-800 to-green-700 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Welcome to Your Sustainable Living Guide
              </h1>
              <p className="text-emerald-100 text-lg max-w-2xl">
                Discover eco-friendly advice and tips to incorporate into your daily routine for a greener tomorrow.
              </p>
            </div>
            <div className="hidden lg:block">
              <AnimatedEcoSystem />
            </div>
          </div>
        </div>
      </section>

      {/* Tips Modules Grid */}
      <section className="py-16 container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-4">
            Explore Sustainable Living Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Click on any category below to discover practical tips and actionable advice for sustainable living.
          </p>
        </div>

        {/* Hexagonal Grid Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {modules.slice(0, 3).map((module) => {
              const Icon = module.icon
              return (
                <div
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-shadow">
                    <div className={`${module.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-xl font-semibold ${module.textColor} text-center mb-3`}>
                      {module.title}
                    </h3>
                    <p className="text-gray-600 text-center text-sm">
                      Click to explore {module.content.length} sustainable practices
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {modules.slice(3, 6).map((module) => {
              const Icon = module.icon
              return (
                <div
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-shadow">
                    <div className={`${module.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-xl font-semibold ${module.textColor} text-center mb-3`}>
                      {module.title}
                    </h3>
                    <p className="text-gray-600 text-center text-sm">
                      Click to explore {module.content.length} sustainable practices
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modules.slice(6, 9).map((module) => {
              const Icon = module.icon
              return (
                <div
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-shadow">
                    <div className={`${module.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-xl font-semibold ${module.textColor} text-center mb-3`}>
                      {module.title}
                    </h3>
                    <p className="text-gray-600 text-center text-sm">
                      Click to explore {module.content.length} sustainable practices
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Module Details Modal */}
      {selectedModule && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedModule(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl transform animate-in slide-in-from-bottom-10 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${selectedModule.bgColor} p-6 rounded-t-2xl relative`}>
              <button
                onClick={() => setSelectedModule(null)}
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  {selectedModule?.icon && <selectedModule.icon className="w-8 h-8 text-white" />}
                </div>
                <h2 className="text-2xl font-bold text-white">{selectedModule?.title || 'Module Details'}</h2>
              </div>
            </div>
            
            <div className="p-8">
              <div className="space-y-6">
                {selectedModule?.content?.map((item: ContentItem, index: number) => (
                  <div key={`${item.title}-${index}`} className="border-l-4 border-emerald-200 pl-6">
                    <h3 className={`text-lg font-semibold ${selectedModule?.textColor || 'text-emerald-800'} mb-3`}>
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  onClick={() => setSelectedModule(null)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2"
                >
                  Got it, thanks!
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      

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
          <button 
            onClick={() => setShowPledgeModal(true)}
            className="px-8 py-3 rounded-full bg-white text-emerald-700 font-medium hover:bg-transparent hover:text-white transition-colors"
          >
            Take The Eco Pledge
          </button>
        </div>
      </section>
      
      {/* Eco Pledge Modal */}
      {showPledgeModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={() => setShowPledgeModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl transform animate-in slide-in-from-bottom-10 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {!pledgeCompleted ? (
              <>
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-6 rounded-t-2xl relative">
                  <button
                    onClick={() => setShowPledgeModal(false)}
                    className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-full">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Take the Eco Pledge</h2>
                      <p className="text-emerald-100 mt-1">
                        Choose your commitment to sustainable living
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-emerald-700">Progress</span>
                      <span className="text-sm text-emerald-600">{completedCount}/{pledgeItems.length}</span>
                    </div>
                    <div className="w-full bg-emerald-100 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(completedCount / pledgeItems.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {pledgeItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <div
                          key={item.id}
                          onClick={() => handlePledgeToggle(item.id)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                            item.completed 
                              ? 'border-emerald-500 bg-emerald-50' 
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                              item.completed 
                                ? 'bg-emerald-500' 
                                : 'bg-gray-100'
                            }`}>
                              {item.completed ? (
                                <CheckCircle className="w-6 h-6 text-white" />
                              ) : (
                                <Icon className="w-6 h-6 text-gray-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`font-medium ${
                                item.completed ? 'text-emerald-800' : 'text-gray-700'
                              }`}>
                                {item.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      onClick={handleTakePledge}
                      disabled={!allCompleted}
                      className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
                        allCompleted 
                          ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {allCompleted ? '🌱 Take the Pledge!' : `Complete ${pledgeItems.length - completedCount} more to continue`}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-emerald-800 mb-2">Congratulations! 🎉</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    You've taken the Eco Pledge! Every small action contributes to a healthier planet.
                  </p>
                  <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                    <p className="text-emerald-800 font-medium mb-2">Your commitment makes a difference!</p>
                    <p className="text-emerald-700 text-sm">
                      Share your pledge with friends and family to multiply the positive impact.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
              href="/eco-library/all-articles" 
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
