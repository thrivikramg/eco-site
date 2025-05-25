import { ClipboardList, FileCheck, Recycle, BookOpen, Scale, BarChart } from "lucide-react"

export default function Process() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Waste Management Process</h2>
          <p className="text-gray-600">
            We follow a systematic approach to creating effective, sustainable waste management solutions.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">Waste Audit & Assessment</h3>
                <p className="text-gray-600">
                  We analyze your current waste generation patterns, identifying types and quantities of waste produced and existing management practices.
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
                  <FileCheck className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 md:text-left order-3">
                <h3 className="font-medium text-lg mb-2">Custom Waste Management Plan</h3>
                <p className="text-gray-600">
                  We develop a tailored plan prioritizing waste reduction, reuse, recycling, and composting based on your specific needs and constraints.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">System Implementation</h3>
                <p className="text-gray-600">
                  We set up appropriate collection systems, bins, signage, and equipment needed for effective waste sorting and management.
                </p>
              </div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <Recycle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 order-3"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 order-2 md:order-1"></div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 md:text-left order-3">
                <h3 className="font-medium text-lg mb-2">Training & Education</h3>
                <p className="text-gray-600">
                  We provide comprehensive training sessions and educational materials to ensure everyone understands and follows the new waste management practices.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">System Optimization</h3>
                <p className="text-gray-600">
                  We monitor the system's performance and make adjustments to improve efficiency, convenience, and compliance.
                </p>
              </div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <Scale className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 order-3"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 order-2 md:order-1"></div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <BarChart className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 md:text-left order-3">
                <h3 className="font-medium text-lg mb-2">Progress Tracking & Reporting</h3>
                <p className="text-gray-600">
                  We track waste diversion rates and provide regular reports showing environmental impact and progress toward waste reduction goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
