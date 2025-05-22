import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

const tipsTutorials = [
  {
    id: 1,
    title: "Water Conservation During Drought Season",
    description:
      "Learn effective techniques to conserve water during the ongoing drought conditions affecting many regions.",
    image: "/placeholder.svg?height=200&width=350&text=Water+Conservation",
    category: "Conservation",
    date: "May 18, 2025",
    readTime: "5 min read",
    link: "/eco-library/tips/water-conservation",
  },
  {
    id: 2,
    title: "Sustainable Alternatives to Single-Use Plastics",
    description: "Discover eco-friendly alternatives to common single-use plastic items in your daily life.",
    image: "/placeholder.svg?height=200&width=350&text=Plastic+Alternatives",
    category: "Sustainability",
    date: "May 15, 2025",
    readTime: "7 min read",
    link: "/eco-library/tips/plastic-alternatives",
  },
  {
    id: 3,
    title: "Urban Gardening in Small Spaces",
    description: "Transform your balcony or windowsill into a thriving garden with these space-saving techniques.",
    image: "/placeholder.svg?height=200&width=350&text=Urban+Gardening",
    category: "Gardening",
    date: "May 10, 2025",
    readTime: "6 min read",
    link: "/eco-library/tips/urban-gardening",
  },
  {
    id: 4,
    title: "DIY Natural Pest Control Methods",
    description: "Create your own eco-friendly pest control solutions using ingredients from your kitchen.",
    image: "/placeholder.svg?height=200&width=350&text=Natural+Pest+Control",
    category: "DIY",
    date: "May 5, 2025",
    readTime: "8 min read",
    link: "/eco-library/tips/natural-pest-control",
  },
]

export default function TipsTutorials() {
  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Tips & Tutorials on Current Affairs</h2>
            <p className="text-gray-600 max-w-2xl">
              Stay informed with the latest environmental news and learn practical ways to make a positive impact.
            </p>
          </div>
          <Link href="/eco-library/tips" className="mt-4 md:mt-0 inline-flex items-center text-primary hover:underline">
            View all tips
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tipsTutorials.map((item) => (
            <Card key={item.id} className="overflow-hidden h-full hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary hover:bg-primary/90">{item.category}</Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{item.date}</span>
                  <span className="mx-2">•</span>
                  <span>{item.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{item.description}</p>
                <Link
                  href="/eco-library/tips"
                  className="text-primary font-medium hover:underline inline-flex items-center text-sm"
                >
                  Read more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
