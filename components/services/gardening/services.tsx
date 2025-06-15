"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Calendar, Star } from "lucide-react"
import { bookService } from "../../../lib/service-utils"

// Mock services data
const services = [
  {
    id: "1",
    name: "Garden Design & Planning",
    description: "Professional garden design services to transform your outdoor space using sustainable principles.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003631/Garden_Setup_Maintenance_eatdpl.avif`,
    price: "₹4,999",
    duration: "1-2 days",
    rating: 4.9,
    reviewCount: 138,
    popular: true,
  },
  {
    id: "2",
    name: "Organic Vegetable Garden Setup",
    description: "Setup of raised beds or in-ground vegetable gardens using organic soil and sustainable methods.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750005513/Featured-Image_qc8zjz.jpg`,
    price: "₹3,499",
    duration: "1 day",
    rating: 4.8,
    reviewCount: 112,
    popular: true,
  },
  {
    id: "3",
    name: "Native Plant Installation",
    description: "Selection and installation of native plants that thrive in local conditions and support biodiversity.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750004347/2048x1365-10-New-Year-resolutions-for-garden-LI3022053-488e702_fnkusl.jpg`,
    price: "₹2,999",
    duration: "4-6 hours",
    rating: 4.7,
    reviewCount: 89,
    popular: false,
  },
  {
    id: "4",
    name: "Garden Maintenance",
    description: "Regular maintenance including pruning, weeding, and organic fertilization to keep your garden thriving.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003629/Sustainable_Landscapin_jod4gr.jpg`,
    price: "₹1,499/month",
    duration: "Bi-weekly visits",
    rating: 4.9,
    reviewCount: 156,
    popular: true,
  },
  {
    id: "5",
    name: "Sustainable Lawn Care",
    description: "Eco-friendly lawn care services using organic fertilizers and water-efficient practices.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750004346/Second-Year-Gardening-Tips-main-sherwood-park_bhvybw.jpg`,
    price: "₹1,999",
    duration: "3-4 hours",
    rating: 4.6,
    reviewCount: 72,
    popular: false,
  },
  {
    id: "6",
    name: "Herb & Medicinal Garden",
    description: "Creation of specialized herb gardens with culinary and medicinal plants for your kitchen and health needs.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750004351/ID706_wide_dveuiy.jpg`,
    price: "₹2,499",
    duration: "5-6 hours",
    rating: 4.8,
    reviewCount: 64,
    popular: false,
  },
]

export default function GardeningServices() {
  const router = useRouter()

  const handleBookService = (service: any) => {
    // Use the utility function to book a service
    bookService({
      ...service,
      category: "Gardening" // Ensure category is set
    }, router)
  }

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Gardening Services</h2>
          <p className="text-gray-600">
            We offer a range of sustainable gardening services that promote biodiversity, water conservation, and healthy plants
            without harmful chemicals.
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
                <Button className="w-full" onClick={() => handleBookService(service)}>
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
