import { ClipboardList, MessageSquare, Leaf, Calendar, ShieldCheck } from "lucide-react"

export default function Process() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Gardening Process</h2>
          <p className="text-gray-600">
            We follow a systematic approach to ensure your garden is beautiful, sustainable, and thrives year-round.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">Initial Consultation</h3>
                <p className="text-gray-600">
                  We'll discuss your vision, assess your space, understand your preferences, and analyze soil and light conditions.
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
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 md:text-left order-3">
                <h3 className="font-medium text-lg mb-2">Customized Garden Plan</h3>
                <p className="text-gray-600">
                  We'll create a detailed plan including plant selection, layout designs, irrigation systems, and sustainable
                  practices tailored to your space.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">Garden Installation</h3>
                <p className="text-gray-600">
                  Our experienced team will prepare the soil, install plants, set up irrigation systems, and apply organic mulch to
                  conserve water.
                </p>
              </div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <Leaf className="h-6 w-6 text-white" />
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
                <h3 className="font-medium text-lg mb-2">Maintenance Schedule</h3>
                <p className="text-gray-600">
                  We'll establish a regular maintenance schedule or provide detailed care instructions if you prefer to maintain
                  the garden yourself.
                </p>
              </div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="flex-1 md:pr-8 md:text-right order-2 md:order-1">
                <h3 className="font-medium text-lg mb-2">Follow-up Support</h3>
                <p className="text-gray-600">
                  We provide ongoing advice and support to ensure your garden continues to thrive and evolve with the seasons.
                </p>
              </div>
              <div className="order-1 md:order-2 mb-4 md:mb-0 md:mx-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 relative">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 md:pl-8 order-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
