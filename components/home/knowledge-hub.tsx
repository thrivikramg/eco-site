import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

// Mock knowledge resources
const resources = [
  {
    id: "1",
    title: "Guide to Organic Gardening",
    category: "Gardening Tips",
    image: "/organic guide.jpg?height=300&width=500",
  },
  {
    id: "2",
    title: "Identifying Common Plant Diseases",
    category: "Plant Care",
    image: "/plant diseasses.png?height=300&width=500",
  },
  {
    id: "3",
    title: "Home Composting 101",
    category: "Waste Management",
    image: "/home composting.webp?height=300&width=500",
  },
]

export default function KnowledgeHub() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Knowledge Hub</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover resources to help you live more sustainably and care for your plants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={resource.image || "/placeholder.svg"}
                  alt={resource.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>

              <CardContent className="pt-6">
                <div className="text-sm text-primary mb-1">{resource.category}</div>
                <h3 className="font-medium text-lg">{resource.title}</h3>
                <Link
                  href={`/eco-library/${resource.id}`}
                  className="inline-flex items-center mt-4 text-primary hover:underline"
                >
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/eco-library">
            <Button>Explore Eco Library</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
