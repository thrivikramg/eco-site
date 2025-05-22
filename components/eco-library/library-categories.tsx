import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    title: "Flora and Fauna",
    description: "Discover the diverse plant and animal species of our planet.",
    image: "/placeholder.svg?height=300&width=400&text=Flora+and+Fauna",
    link: "/eco-library/flora-fauna",
    count: 42,
  },
  {
    title: "Oceanography",
    description: "Explore the mysteries of our oceans and marine ecosystems.",
    image: "/placeholder.svg?height=300&width=400&text=Oceanography",
    link: "/eco-library/oceanography",
    count: 28,
  },
  {
    title: "Waste Management",
    description: "Learn effective techniques for reducing, reusing, and recycling waste.",
    image: "/placeholder.svg?height=300&width=400&text=Waste+Management",
    link: "/eco-library/waste-management",
    count: 35,
  },
  {
    title: "Gardening Tips",
    description: "Expert advice for growing healthy plants and sustainable gardens.",
    image: "/placeholder.svg?height=300&width=400&text=Gardening+Tips",
    link: "/eco-library/gardening-tips",
    count: 56,
  },
  {
    title: "Plant Disease Detector",
    description: "Identify and treat common plant diseases with our AI-powered tool.",
    image: "/placeholder.svg?height=300&width=400&text=Plant+Disease+Detector",
    link: "/eco-library/plant-disease",
    count: 18,
  },
  {
    title: "Sanctuaries",
    description: "Explore wildlife sanctuaries and conservation areas around the world.",
    image: "/placeholder.svg?height=300&width=400&text=Sanctuaries",
    link: "/eco-library/sanctuaries",
    count: 24,
  },
]

export default function LibraryCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Knowledge Categories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.title} className="overflow-hidden h-full hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image src={category.image || "/placeholder.svg"} alt={category.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.count} articles</span>
                  <Link href={category.link} className="flex items-center text-primary hover:underline">
                    Explore <ArrowRight className="ml-1 h-4 w-4" />
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
