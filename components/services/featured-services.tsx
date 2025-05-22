"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star } from "lucide-react"

// Mock services data
const services = [
  {
    id: "1",
    name: "Organic Pest Control",
    description: "Eco-friendly pest management solutions using natural ingredients and biological controls.",
    image: "/placeholder.svg?height=400&width=400&text=Organic+Pest+Control",
    price: "Starting at ₹1,499",
    category: "Pest Control",
    rating: 4.8,
    reviewCount: 124,
    popular: true,
  },
  {
    id: "2",
    name: "Garden Setup & Maintenance",
    description: "Professional gardening services to create and maintain your green space with organic practices.",
    image: "/placeholder.svg?height=400&width=400&text=Garden+Setup",
    price: "Starting at ₹2,999",
    category: "Gardening",
    rating: 4.7,
    reviewCount: 98,
    popular: true,
  },
  {
    id: "3",
    name: "Sustainable Landscaping",
    description: "Transform your outdoor space with sustainable landscaping solutions using native plants.",
    image: "/placeholder.svg?height=400&width=400&text=Sustainable+Landscaping",
    price: "Starting at ₹5,999",
    category: "Landscaping",
    rating: 4.9,
    reviewCount: 76,
    popular: false,
  },
  {
    id: "4",
    name: "Rainwater Harvesting Setup",
    description: "Install efficient rainwater harvesting systems to conserve water and reduce bills.",
    image: "/placeholder.svg?height=400&width=400&text=Rainwater+Harvesting",
    price: "Starting at ₹8,999",
    category: "Water Management",
    rating: 4.6,
    reviewCount: 52,
    popular: false,
  },
  {
    id: "5",
    name: "Home Energy Audit",
    description: "Comprehensive assessment of your home's energy usage with recommendations for improvement.",
    image: "/placeholder.svg?height=400&width=400&text=Energy+Audit",
    price: "Starting at ₹1,999",
    category: "Home Sustainability",
    rating: 4.7,
    reviewCount: 68,
    popular: true,
  },
  {
    id: "6",
    name: "Composting System Setup",
    description: "Setup of home composting systems with training on maintenance and usage.",
    image: "/placeholder.svg?height=400&width=400&text=Composting+Setup",
    price: "Starting at ₹1,499",
    category: "Waste Management",
    rating: 4.8,
    reviewCount: 45,
    popular: false,
  },
]

export default function FeaturedServices() {
  const router = useRouter()

  const handleBookService = () => {
    router.push("/checkout")
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold">Featured Services</h2>
            <p className="text-gray-600 mt-2">Our most popular eco-friendly services</p>
          </div>
          <Link href="/services/all">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Services
            </Button>
          </Link>
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
                <Badge variant="outline" className="absolute top-2 left-2 bg-white">
                  {service.category}
                </Badge>
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

                <p className="font-semibold text-primary">{service.price}</p>
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
