import { ClipboardList, Calculator, FileText, Wrench, Droplets, BarChart } from "lucide-react"

export default function Process() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Water Management Process</h2>
          <p className="text-gray-600">
            We follow a comprehensive approach to create custom water management solutions that meet your specific needs.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">Initial Assessment</h3>
                <p className="text-gray-600">
                  We evaluate your property's current water usage patterns, existing systems, landscape needs, and environmental factors.
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
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 md:text-left order-3">
                <h3 className="font-medium text-lg mb-2">Water Audit & Analysis</h3>
                <p className="text-gray-600">
                  We conduct a detailed analysis of your water consumption, identify inefficiencies, and calculate potential savings from improvements.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">Custom Solution Design</h3>
                <p className="text-gray-600">
                  We develop a tailored water management plan addressing your specific needs with appropriate technologies and approaches.
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
                <h3 className="font-medium text-lg mb-2">Professional Installation</h3>
                <p className="text-gray-600">
                  Our skilled technicians install your water management systems with minimal disruption to your property.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">System Testing & Calibration</h3>
                <p className="text-gray-600">
                  We thoroughly test all components and calibrate systems to ensure optimal performance under various conditions.
                </p>
              </div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <Droplets className="h-6 w-6 text-white" />
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
                <h3 className="font-medium text-lg mb-2">Monitoring & Maintenance</h3>
                <p className="text-gray-600">
                  We provide ongoing support, performance monitoring, and maintenance services to ensure long-term efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
