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
    name: "Basic Pest Inspection",
    description: "Comprehensive inspection of your property to identify pest issues and recommend solutions.",
    image: "/placeholder.svg?height=400&width=400&text=Pest+Inspection",
    price: "₹999",
    duration: "1-2 hours",
    rating: 4.8,
    reviewCount: 124,
    popular: true,
  },
  {
    id: "2",
    name: "Organic Pest Control Treatment",
    description: "Complete treatment using organic solutions to eliminate pests without harmful chemicals.",
    image: "/placeholder.svg?height=400&width=400&text=Organic+Treatment",
    price: "₹2,499",
    duration: "3-4 hours",
    rating: 4.9,
    reviewCount: 98,
    popular: true,
  },
  {
    id: "3",
    name: "Preventive Pest Control",
    description: "Regular preventive treatments to keep your property pest-free throughout the year.",
    image: "/placeholder.svg?height=400&width=400&text=Preventive+Control",
    price: "₹1,499/month",
    duration: "Monthly visits",
    rating: 4.7,
    reviewCount: 76,
    popular: false,
  },
  {
    id: "4",
    name: "Termite Control",
    description: "Specialized organic treatment for termite infestations with long-term protection.",
    image: "/placeholder.svg?height=400&width=400&text=Termite+Control",
    price: "₹4,999",
    duration: "4-6 hours",
    rating: 4.9,
    reviewCount: 52,
    popular: false,
  },
  {
    id: "5",
    name: "Rodent Control",
    description: "Humane and effective solutions for rodent problems using eco-friendly methods.",
    image: "/placeholder.svg?height=400&width=400&text=Rodent+Control",
    price: "₹1,999",
    duration: "2-3 hours",
    rating: 4.6,
    reviewCount: 68,
    popular: false,
  },
  {
    id: "6",
    name: "Garden Pest Management",
    description:
      "Specialized treatment for garden pests using organic solutions safe for plants and beneficial insects.",
    image: "/placeholder.svg?height=400&width=400&text=Garden+Pest+Management",
    price: "₹1,799",
    duration: "2-3 hours",
    rating: 4.8,
    reviewCount: 45,
    popular: true,
  },
]

export default function PestControlServices() {
  const router = useRouter()

  const handleBookService = () => {
    router.push("/checkout")
  }

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Pest Control Services</h2>
          <p className="text-gray-600">
            We offer a range of eco-friendly pest control services using organic solutions that are safe for your
            family, pets, and the environment.
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
