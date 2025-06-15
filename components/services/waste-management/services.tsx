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
    name: "Waste Audit & Management Plan",
    description: "Comprehensive assessment of your waste streams with a customized plan to minimize waste and optimize recycling.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750008681/Performing-a-Waste-Audit_Blog-Header_July2024_uct4vs.jpg`,
    price: "₹4,999",
    duration: "1-2 days",
    rating: 4.9,
    reviewCount: 87,
    popular: true,
  },
  {
    id: "2",
    name: "Composting System Setup",
    description: "Installation of custom composting systems for organic waste, with training on proper maintenance and usage.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750008724/02-RGMW-Compost-3-bin-system-5_awiixl.jpg`,
    price: "₹6,499",
    duration: "1 day",
    rating: 4.8,
    reviewCount: 124,
    popular: true,
  },
  {
    id: "3",
    name: "Recycling Program Implementation",
    description: "Setup of comprehensive recycling systems with appropriate bins, signage, and training for maximum effectiveness.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750008766/1160x653_Office-Recycling-Programs_Blog-Header_yglfvz.jpg`,
    price: "₹7,999",
    duration: "1-2 days",
    rating: 4.7,
    reviewCount: 93,
    popular: false,
  },
  {
    id: "4",
    name: "E-Waste & Hazardous Waste Disposal",
    description: "Safe collection and proper disposal of electronic waste and hazardous materials in compliance with regulations.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750008855/ewaste-300x254_bkuyo7.jpg`,
    price: "₹3,499",
    duration: "4-6 hours",
    rating: 4.9,
    reviewCount: 76,
    popular: false,
  },
  {
    id: "5",
    name: "Zero Waste Consultation",
    description: "Personalized guidance on transitioning to a zero-waste lifestyle or business operation with practical solutions.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750008938/cropped-FINAL-CY_ZeroWaste_LOGO_white-1_yzrn81.jpg`,
    price: "₹2,999",
    duration: "3-4 hours",
    rating: 4.8,
    reviewCount: 112,
    popular: true,
  },
  {
    id: "6",
    name: "Waste Reduction Workshops",
    description: "Educational workshops for homes, businesses, or schools on waste reduction strategies and sustainable practices.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750008989/0.75503400_1628496890_solid-wastebanners_nqtrbc.jpg`,
    price: "₹1,999",
    duration: "2-3 hours",
    rating: 4.8,
    reviewCount: 68,
    popular: false,
  },
]

export default function WasteManagementServices() {
  const router = useRouter()

  const handleBookService = () => {
    router.push("/checkout")
  }

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Waste Management Services</h2>
          <p className="text-gray-600">
            We offer comprehensive waste management solutions that help reduce environmental impact,
            recover valuable resources, and promote a circular economy.
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
