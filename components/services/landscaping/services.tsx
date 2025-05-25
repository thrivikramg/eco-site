"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star } from "lucide-react"

// Mock services data
const services = [
  {
    id: "1",
    name: "Sustainable Landscape Design",
    description: "Custom landscape design using sustainable principles, native plants, and eco-friendly materials.",
    image: "/placeholder.svg?height=400&width=400&text=Landscape+Design",
    price: "₹7,999",
    duration: "2-3 days",
    rating: 4.9,
    reviewCount: 145,
    popular: true,
  },
  {
    id: "2",
    name: "Xeriscaping Installation",
    description: "Water-efficient landscaping using drought-tolerant plants and sustainable irrigation systems.",
    image: "/placeholder.svg?height=400&width=400&text=Xeriscaping",
    price: "₹8,499",
    duration: "3-4 days",
    rating: 4.8,
    reviewCount: 96,
    popular: true,
  },
  {
    id: "3",
    name: "Hardscaping & Pathways",
    description: "Creation of eco-friendly patios, walkways, and retaining walls using permeable materials.",
    image: "/placeholder.svg?height=400&width=400&text=Hardscaping",
    price: "₹9,999",
    duration: "4-5 days",
    rating: 4.7,
    reviewCount: 82,
    popular: false,
  },
  {
    id: "4",
    name: "Rain Gardens & Bioswales",
    description: "Specialized gardens designed to capture and filter rainwater, reducing runoff and pollution.",
    image: "/placeholder.svg?height=400&width=400&text=Rain+Gardens",
    price: "₹6,499",
    duration: "2-3 days",
    rating: 4.9,
    reviewCount: 64,
    popular: false,
  },
  {
    id: "5",
    name: "Native Plant Landscapes",
    description: "Complete landscape installations focusing on native species that support local ecosystems.",
    image: "/placeholder.svg?height=400&width=400&text=Native+Landscapes",
    price: "₹7,499",
    duration: "3-4 days",
    rating: 4.8,
    reviewCount: 102,
    popular: true,
  },
  {
    id: "6",
    name: "Sustainable Landscape Maintenance",
    description: "Ongoing care of sustainable landscapes using organic methods and eco-friendly practices.",
    image: "/placeholder.svg?height=400&width=400&text=Landscape+Maintenance",
    price: "₹2,999/month",
    duration: "Bi-weekly visits",
    rating: 4.8,
    reviewCount: 128,
    popular: false,
  },
]

export default function LandscapingServices() {
  const router = useRouter()

  const handleBookService = () => {
    router.push("/checkout")
  }

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Landscaping Services</h2>
          <p className="text-gray-600">
            We offer comprehensive landscaping solutions that balance aesthetic beauty with ecological responsibility,
            creating outdoor spaces that are both stunning and sustainable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden h-full group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {service.popular && <Badge className="absolute top-2 right-2 bg-primary">Popular</Badge>}
              </div>

              <CardContent className="pt-6 flex-grow">
                <h3 className="font-medium text-lg mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="flex items-center mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(service.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    {service.rating} ({service.reviewCount} reviews)
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="font-semibold text-primary">{service.price}</p>
                  <span className="text-sm text-gray-500">{service.duration}</span>
                </div>
              </CardContent>

              <CardFooter className="border-t p-4">
                <Button className="w-full" onClick={handleBookService}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Service
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
