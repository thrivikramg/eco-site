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
    name: "Rainwater Harvesting Systems",
    description: "Custom rainwater collection and storage systems to reduce water bills and provide irrigation during dry periods.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750006013/Above-Ground-1600_2_2000x_jvwjkc.jpg`,
    price: "₹14,999",
    duration: "2-3 days",
    rating: 4.9,
    reviewCount: 87,
    popular: true,
  },
  {
    id: "2",
    name: "Smart Irrigation Installation",
    description: "Water-efficient irrigation systems with smart controllers, sensors, and precision delivery to minimize waste.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750006051/Smart-Irrigation-Systems-scaled_hfsf82.jpg`,
    price: "₹8,499",
    duration: "1-2 days",
    rating: 4.8,
    reviewCount: 112,
    popular: true,
  },
  {
    id: "3",
    name: "Greywater Recycling Systems",
    description: "Systems to safely capture and reuse water from sinks, showers, and washing machines for irrigation.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750006131/gray-water-system-design_nb6wkv.png`,
    price: "₹18,999",
    duration: "3-4 days",
    rating: 4.7,
    reviewCount: 64,
    popular: false,
  },
  {
    id: "4",
    name: "Water Efficiency Audit",
    description: "Comprehensive assessment of your property's water usage with detailed recommendations for improvement.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750006274/Meter_20switch_20out-cropped_x7ulzj.jpg`,
    price: "₹3,999",
    duration: "4-6 hours",
    rating: 4.9,
    reviewCount: 93,
    popular: false,
  },
  {
    id: "5",
    name: "Permeable Hardscaping",
    description: "Installation of permeable driveways, patios, and walkways that allow rainwater to infiltrate rather than run off.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750006402/slideshow-stonegate-1_332x332_jypoyv.jpg`,
    price: "₹11,999",
    duration: "2-3 days",
    rating: 4.8,
    reviewCount: 76,
    popular: true,
  },
  {
    id: "6",
    name: "Stormwater Management",
    description: "Solutions to manage stormwater runoff including rain gardens, bioswales, and retention systems to prevent flooding and erosion.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750006480/Really-good-scaled_sffqx4.jpg`,
    price: "₹9,499",
    duration: "2-3 days",
    rating: 4.8,
    reviewCount: 58,
    popular: false,
  },
]

export default function WaterManagementServices() {
  const router = useRouter()

  const handleBookService = () => {
    router.push("/checkout")
  }

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Water Management Services</h2>
          <p className="text-gray-600">
            We offer comprehensive water management solutions that help conserve this precious resource,
            reduce your environmental footprint, and lower your utility bills.
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
