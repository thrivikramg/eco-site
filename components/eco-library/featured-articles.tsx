import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

// Define the article type to include all required properties
export interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  author: string
  date: string
  readTime: string
  link?: string // Optional internal link property
  externalLink?: string // Optional external link property
}

export const featuredArticles: Article[] = [
  {
    id: "1",
    title: "10 Endangered Species Making a Comeback",
    excerpt: "Conservation success stories that give us hope for biodiversity recovery.",
    category: "Flora and Fauna",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750010842/nationalgeographic_2764597-4f1f37faa9a5ecf0cc8e5b662e07c324f5e8fa3a_c2turg.jpg`,
    author: "Dr. Maya Patel",
    date: "May 15, 2025",
    readTime: "8 min read",
    externalLink: "https://www.worldwildlife.org/stories/10-species-with-remarkable-conservation-successes"
  },
  {
    id: "2",
    title: "Understanding Ocean Acidification",
    excerpt: "How carbon emissions are changing our oceans and what we can do about it.",
    category: "Oceanography",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750010914/Ocean-Acidification-Vernier_qyfvck.png`,
    author: "Prof. James Chen",
    date: "May 10, 2025",
    readTime: "12 min read",
    externalLink: "https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification"
  },
  {
    id: "3",
    title: "Home Composting: A Beginner's Guide",
    excerpt: "Turn your kitchen waste into garden gold with these simple steps.",
    category: "Waste Management",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003627/Composting_System_Setup_g6umuc.webp`,
    author: "Aisha Johnson",
    date: "May 5, 2025",
    readTime: "6 min read",
    externalLink: "https://www.epa.gov/recycle/composting-home"
  },
  {
    id: "4",
    title: "Companion Planting for Pest Control",
    excerpt: "Natural ways to keep pests away by strategically pairing plants in your garden.",
    category: "Gardening Tips",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750004351/ID706_wide_dveuiy.jpg`,
    author: "Miguel Rodriguez",
    date: "April 28, 2025",
    readTime: "10 min read",
    externalLink: "https://savvygardening.com/companion-planting-chart/"
  },
  {
    id: "5",
    title: "Identifying and Treating Tomato Blight",
    excerpt: "Spot the early signs of this common disease and save your tomato harvest.",
    category: "Plant Disease",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750011054/8_Common_Tomato_Diseases_xuhdnb.jpg`,
    author: "Dr. Sarah Williams",
    date: "April 22, 2025",
    readTime: "7 min read",
    externalLink: "https://www.gardeningknowhow.com/edible/vegetables/tomato/tomato-blight-treatment.htm"
  },
  {
    id: "6",
    title: "Virtual Tour: Bandipur Tiger Reserve",
    excerpt: "Explore one of India's premier tiger sanctuaries from the comfort of your home.",
    category: "Sanctuaries",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750011125/6b_tbxzbz.jpg`,
    author: "Rahul Sharma",
    date: "April 18, 2025",
    readTime: "15 min read",
    externalLink: "https://www.bandipurtigerreserve.in/"
  },
]

export default function FeaturedArticles() {
  // Process articles to add link property if needed
  const articlesWithLinks = featuredArticles.map(article => ({
    ...article,
    link: article.externalLink || `/eco-library/article/${article.id}` // Use external link if available, otherwise use internal link
  }))
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold">Featured Articles</h2>
            <p className="text-gray-600 mt-2">Curated content to enhance your eco-knowledge</p>
          </div>
          <Link href="/eco-library/all-articles" passHref legacyBehavior>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <a>View All Articles</a>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesWithLinks.map((article) => (
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
                  <a
                    href={article.externalLink || article.link}
                    target={article.externalLink ? "_blank" : "_self"}
                    rel={article.externalLink ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
