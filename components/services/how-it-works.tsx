import { Search, Calendar, UserCheck, ThumbsUp } from "lucide-react"

const steps = [
  {
    title: "Browse Services",
    description: "Explore our range of eco-friendly services and choose what you need.",
    icon: Search,
  },
  {
    title: "Book Appointment",
    description: "Select a convenient date and time for your service.",
    icon: Calendar,
  },
  {
    title: "Meet Your Expert",
    description: "Our verified eco-friendly service professional will arrive at your location.",
    icon: UserCheck,
  },
  {
    title: "Enjoy & Review",
    description: "Experience quality service and share your feedback.",
    icon: ThumbsUp,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600">Booking our eco-friendly services is simple and convenient.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-200 -z-10 transform -translate-x-1/2" />
              )}

              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 relative">
                  <step.icon className="h-8 w-8" />
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
