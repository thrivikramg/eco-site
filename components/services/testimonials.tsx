import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Bangalore",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    service: "Organic Pest Control",
    testimonial:
      "I was concerned about using chemical pesticides with kids and pets at home. The organic pest control service was perfect - effective yet safe for my family. Highly recommend!",
  },
  {
    id: "2",
    name: "Rahul Patel",
    location: "Chennai",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    service: "Garden Setup",
    testimonial:
      "The team transformed my barren backyard into a beautiful organic garden. They used native plants and set up a drip irrigation system that's saving water. Excellent service!",
  },
  {
    id: "3",
    name: "Ananya Reddy",
    location: "Hyderabad",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4,
    service: "Home Energy Audit",
    testimonial:
      "The energy audit was eye-opening. The technician identified several areas where we were wasting energy and provided practical solutions. We've already seen a reduction in our electricity bill.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600">Hear from people who have experienced our eco-friendly services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-primary font-medium mb-4">Service: {testimonial.service}</p>

                <div className="relative">
                  <Quote className="h-8 w-8 text-gray-200 absolute -top-2 -left-2 -z-10" />
                  <p className="text-gray-700 relative z-10">{testimonial.testimonial}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
