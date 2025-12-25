import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "../../../components/ui/badge"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Search, Filter, ArrowUpRight } from "lucide-react"
import SanctuariesMap from "../../../components/eco-library/sanctuaries-map"
import SanctuariesList from "../../../components/eco-library/sanctuaries-list"

export const metadata: Metadata = {
  title: "Wildlife Sanctuaries | EcoSaro",
  description: "Explore wildlife sanctuaries and conservation areas around the world.",
}

import { getArticlesByCategory } from "../../../lib/eco-data";

const allArticles = getArticlesByCategory("sanctuaries", 24);

export default function SanctuariesPage() {
  return (
    <div className="bg-[#f5f8fb] min-h-screen">
      {/* Existing Sanctuaries Components */}
      <SanctuariesMap />
      <SanctuariesList />

      {/* Articles Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Sanctuaries Articles</h2>
          <p className="text-lg text-gray-700 max-w-3xl">Discover wildlife sanctuaries and conservation areas around the world through our curated collection of articles.</p>
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <Card className="overflow-hidden h-full">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 relative min-h-[400px]">
                <Image
                  src={`https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750014347/1-serengeti-national-park-tanzania-timbuktu-travel-21_ed4w3g.jpg`}
                  alt="Serengeti National Park"
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-5 left-5 bg-teal-600 hover:bg-teal-700 text-white text-sm px-4 py-1">
                  Featured
                </Badge>
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">African Wildlife</Badge>
                <h3 className="text-3xl font-bold mb-4">Serengeti National Park: The Great Migration</h3>
                <p className="text-gray-600 text-lg mb-6">
                  Witness one of nature's most spectacular events as millions of wildebeest, zebras, and gazelles move in an annual pattern through Tanzania and Kenya in search of water and fresh pasture.
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <span>May 20, 2025</span>
                  <span className="mx-2">•</span>
                  <span>14 min read</span>
                  <span className="mx-2">•</span>
                  <span>By Dr. Jane Goodall</span>
                </div>
                <Link
                  href="/eco-library/s2"
                  className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors w-fit"
                >
                  Read Full Article <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* All Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allArticles.filter(article => article.id !== "s2").map((article) => (
            <Card key={article.id} className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-lg border border-blue-50">
              <div className="relative aspect-video">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-teal-600 hover:bg-teal-700 text-white">
                  {article.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-teal-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium">By {article.author}</span>
                  <Link
                    href={`/eco-library/${article.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  >
                    Read <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="inline-flex space-x-1 rounded-md shadow-sm" aria-label="Pagination">
            <Button variant="outline" className="rounded-l-md">Previous</Button>
            <Button variant="outline" className="bg-teal-600 text-white">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline" className="rounded-r-md">Next</Button>
          </nav>
        </div>
      </section>
    </div>
  )
}
