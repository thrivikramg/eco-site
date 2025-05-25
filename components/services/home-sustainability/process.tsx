"use client"

import { ClipboardList, SearchCheck, FileText, Wrench, Gauge, Calendar } from "lucide-react"

export default function Process() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Home Sustainability Process</h2>
          <p className="text-gray-600">
            We follow a comprehensive approach to transform your home into an eco-friendly, efficient living space.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">Initial Home Assessment</h3>
                <p className="text-gray-600">
                  We evaluate your home's current sustainability profile, energy efficiency, water usage, indoor air quality, and waste management practices.
                </p>
              </div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <ClipboardList className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 order-3"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 order-2 md:order-1"></div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <SearchCheck className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 md:text-left order-3">
                <h3 className="font-medium text-lg mb-2">Detailed Analysis</h3>
                <p className="text-gray-600">
                  We analyze your specific needs, goals, and budget to identify the most impactful sustainability improvements for your home.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">Custom Sustainability Plan</h3>
                <p className="text-gray-600">
                  We develop a comprehensive plan with prioritized recommendations, expected benefits, and cost estimates for your approval.
                </p>
              </div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <FileText className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 order-3"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 order-2 md:order-1"></div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 md:text-left order-3">
                <h3 className="font-medium text-lg mb-2">Professional Implementation</h3>
                <p className="text-gray-600">
                  Our skilled technicians install the approved solutions, making sure everything works correctly and meets quality standards.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">Performance Verification</h3>
                <p className="text-gray-600">
                  We test all installed systems and improvements to ensure they're delivering the expected efficiency and performance gains.
                </p>
              </div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <Gauge className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 order-3"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 order-2 md:order-1"></div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 md:text-left order-3">
                <h3 className="font-medium text-lg mb-2">Follow-up & Optimization</h3>
                <p className="text-gray-600">
                  We provide ongoing support, monitor system performance, and offer recommendations for future improvements and maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
