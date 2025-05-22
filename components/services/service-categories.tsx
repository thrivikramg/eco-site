import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Bug, Flower2, Trees, Droplets, Home, Recycle, ArrowRight } from "lucide-react"

const serviceCategories = [
  {
    title: "Pest Control",
    description: "Eco-friendly pest management solutions using natural ingredients.",
    icon: Bug,
    image: "/placeholder.svg?height=300&width=400&text=Pest+Control",
    link: "/services/pest-control",
    count: 8,
  },
  {
    title: "Gardening",
    description: "Professional gardening services to create and maintain your green space.",
    icon: Flower2,
    image: "/placeholder.svg?height=300&width=400&text=Gardening",
    link: "/services/gardening",
    count: 12,
  },
  {
    title: "Landscaping",
    description: "Transform your outdoor space with sustainable landscaping solutions.",
    icon: Trees,
    image: "/placeholder.svg?height=300&width=400&text=Landscaping",
    link: "/services/landscaping",
    count: 6,
  },
  {
    title: "Water Management",
    description: "Efficient irrigation systems and rainwater harvesting solutions.",
    icon: Droplets,
    image: "/placeholder.svg?height=300&width=400&text=Water+Management",
    link: "/services/water-management",
    count: 5,
  },
  {
    title: "Home Sustainability",
    description: "Energy audits and eco-friendly home improvement services.",
    icon: Home,
    image: "/placeholder.svg?height=300&width=400&text=Home+Sustainability",
    link: "/services/home-sustainability",
    count: 9,
  },
  {
    title: "Waste Management",
    description: "Composting setup, waste reduction, and recycling solutions.",
    icon: Recycle,
    image: "/placeholder.svg?height=300&width=400&text=Waste+Management",
    link: "/services/waste-management",
    count: 7,
  },
]

export default function ServiceCategories() {
  return (
    <section id="service-categories" className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Service Categories</h2>
          <p className="text-gray-600">
            We offer a wide range of eco-friendly services to help you create and maintain a sustainable environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category) => (
            <Card key={category.title} className="overflow-hidden h-full hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image src={category.image || "/placeholder.svg"} alt={category.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <category.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.count} services</span>
                  <Link href={category.link} className="flex items-center text-primary hover:underline">
                    View Services <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
