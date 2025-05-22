import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

const featuredArticles = [
  {
    id: "1",
    title: "10 Endangered Species Making a Comeback",
    excerpt: "Conservation success stories that give us hope for biodiversity recovery.",
    category: "Flora and Fauna",
    image: "/placeholder.svg?height=300&width=500&text=Endangered+Species",
    author: "Dr. Maya Patel",
    date: "May 15, 2025",
    readTime: "8 min read",
  },
  {
    id: "2",
    title: "Understanding Ocean Acidification",
    excerpt: "How carbon emissions are changing our oceans and what we can do about it.",
    category: "Oceanography",
    image: "/placeholder.svg?height=300&width=500&text=Ocean+Acidification",
    author: "Prof. James Chen",
    date: "May 10, 2025",
    readTime: "12 min read",
  },
  {
    id: "3",
    title: "Home Composting: A Beginner's Guide",
    excerpt: "Turn your kitchen waste into garden gold with these simple steps.",
    category: "Waste Management",
    image: "/placeholder.svg?height=300&width=500&text=Home+Composting",
    author: "Aisha Johnson",
    date: "May 5, 2025",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Companion Planting for Pest Control",
    excerpt: "Natural ways to keep pests away by strategically pairing plants in your garden.",
    category: "Gardening Tips",
    image: "/placeholder.svg?height=300&width=500&text=Companion+Planting",
    author: "Miguel Rodriguez",
    date: "April 28, 2025",
    readTime: "10 min read",
  },
  {
    id: "5",
    title: "Identifying and Treating Tomato Blight",
    excerpt: "Spot the early signs of this common disease and save your tomato harvest.",
    category: "Plant Disease",
    image: "/placeholder.svg?height=300&width=500&text=Tomato+Blight",
    author: "Dr. Sarah Williams",
    date: "April 22, 2025",
    readTime: "7 min read",
  },
  {
    id: "6",
    title: "Virtual Tour: Bandipur Tiger Reserve",
    excerpt: "Explore one of India's premier tiger sanctuaries from the comfort of your home.",
    category: "Sanctuaries",
    image: "/placeholder.svg?height=300&width=500&text=Bandipur+Tiger+Reserve",
    author: "Rahul Sharma",
    date: "April 18, 2025",
    readTime: "15 min read",
  },
]

export default function FeaturedArticles() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold">Featured Articles</h2>
            <p className="text-gray-600 mt-2">Curated content to enhance your eco-knowledge</p>
          </div>
          <Link href="/eco-library/all-articles">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Articles
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden h-full hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                <Badge className="absolute top-2 right-2">{article.category}</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-medium">By {article.author}</span>
                  <Link
                    href={`/eco-library/article/${article.id}`}
                    className="flex items-center text-primary hover:underline"
                  >
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
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
