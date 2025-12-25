import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "../../../components/ui/badge"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Search, Filter, ArrowUpRight } from "lucide-react"
import PlantDiseaseDetector from "../../../components/eco-library/plant-disease-detector"
import CommonDiseases from "../../../components/eco-library/common-diseases"
import PreventionTips from "../../../components/eco-library/prevention-tips"

export const metadata: Metadata = {
  title: "Plant Disease Detector | EcoSaro",
  description: "Identify plant diseases and get treatment recommendations with our AI-powered tool.",
}

import { getArticlesByCategory } from "../../../lib/eco-data";

const allArticles = getArticlesByCategory("plant-disease", 18);

export default function PlantDiseasePage() {
  return (
    <div className="bg-[#fcf9f5] min-h-screen">
      {/* Plant Disease Tool Section */}
      <PlantDiseaseDetector />
      <CommonDiseases />
      <PreventionTips />

      {/* Articles Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Plant Disease Articles</h2>
        <p className="text-lg text-gray-700 mb-10 max-w-3xl">Explore our collection of articles about plant diseases, their identification, prevention, and treatment methods.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-lg border border-amber-100">
              <div className="relative aspect-video">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-amber-600 hover:bg-amber-700 text-white">
                  {article.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-amber-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium">By {article.author}</span>
                  <Link
                    href={`/eco-library/${article.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                  >
                    Read <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
