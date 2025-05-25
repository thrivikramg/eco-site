import { ClipboardList, PenTool, Shovel, Droplets, Trees, Calendar } from "lucide-react"

export default function Process() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Landscaping Process</h2>
          <p className="text-gray-600">
            We follow a comprehensive approach to create sustainable, beautiful landscapes that thrive for years to come.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">Site Analysis & Consultation</h3>
                <p className="text-gray-600">
                  We assess your site's soil, drainage, sunlight, and existing vegetation while discussing your goals, preferences, and budget.
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
                  <PenTool className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 md:text-left order-3">
                <h3 className="font-medium text-lg mb-2">Sustainable Landscape Design</h3>
                <p className="text-gray-600">
                  We create a detailed design plan incorporating sustainable principles, native plants, efficient irrigation, and eco-friendly materials.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">Site Preparation</h3>
                <p className="text-gray-600">
                  We prepare the site with minimal disruption, preserving valuable soil and existing vegetation when possible.
                </p>
              </div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <Shovel className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 order-3"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 order-2 md:order-1"></div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <Droplets className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 md:text-left order-3">
                <h3 className="font-medium text-lg mb-2">Infrastructure Installation</h3>
                <p className="text-gray-600">
                  We install hardscaping elements, irrigation systems, drainage solutions, and other structural components.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">Planting & Finishing</h3>
                <p className="text-gray-600">
                  We carefully install plants, mulch, and final details according to the design plan, ensuring proper placement for long-term health.
                </p>
              </div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <Trees className="h-6 w-6 text-white" />
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
                <h3 className="font-medium text-lg mb-2">Ongoing Support & Maintenance</h3>
                <p className="text-gray-600">
                  We provide care instructions and optional maintenance services to ensure your landscape thrives for years to come.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
