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
    name: "Home Energy Audit",
    description: "Comprehensive assessment of your home's energy efficiency with detailed recommendations for improvements.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003627/Home_Energy_Audit_mkuy4l.jpg`,
    price: "₹4,999",
    duration: "3-4 hours",
    rating: 4.9,
    reviewCount: 124,
    popular: true,
  },
  {
    id: "2",
    name: "Solar Panel Installation",
    description: "Custom solar power solutions designed and installed to reduce your reliance on grid electricity.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750007229/how-to-install-solar-panels-hero_dpwfin.jpg`,
    price: "₹75,000+",
    duration: "2-3 days",
    rating: 4.8,
    reviewCount: 97,
    popular: true,
  },
  {
    id: "3",
    name: "Home Composting Setup",
    description: "Installation of composting systems that turn kitchen and garden waste into valuable soil amendments.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003627/Composting_System_Setup_g6umuc.webp`,
    price: "₹5,999",
    duration: "3-4 hours",
    rating: 4.7,
    reviewCount: 82,
    popular: false,
  },
  {
    id: "4",
    name: "Energy-Efficient Appliance Upgrade",
    description: "Consultation and installation of energy-efficient appliances to reduce electricity consumption and costs.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003627/Home_Energy_Audit_mkuy4l.jpg`,
    price: "₹2,499",
    duration: "1-2 hours",
    rating: 4.8,
    reviewCount: 64,
    popular: false,
  },
  {
    id: "5",
    name: "Home Insulation Services",
    description: "Installation of eco-friendly insulation to improve your home's energy efficiency and comfort.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750007334/home-insulation-services-1_r7voie.jpg`,
    price: "₹12,999+",
    duration: "1-2 days",
    rating: 4.9,
    reviewCount: 78,
    popular: true,
  },
  {
    id: "6",
    name: "Indoor Air Quality Improvement",
    description: "Solutions to enhance indoor air quality through natural ventilation, air purifying plants, and non-toxic materials.",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750007421/20220620_ClimateControl_AirQuality_ImproveAirInHome_HERO_bu3io9.png`,
    price: "₹7,999",
    duration: "1 day",
    rating: 4.8,
    reviewCount: 56,
    popular: false,
  },
]

export default function HomeSustainabilityServices() {
  const router = useRouter()

  const handleBookService = () => {
    router.push("/checkout")
  }

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Home Sustainability Services</h2>
          <p className="text-gray-600">
            We offer comprehensive solutions to make your home more environmentally friendly, energy-efficient, and healthy
            while reducing your utility costs and carbon footprint.
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
