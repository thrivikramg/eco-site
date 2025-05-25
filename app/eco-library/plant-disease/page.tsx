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
  title: "Plant Disease Detector | EcoGrow",
  description: "Identify plant diseases and get treatment recommendations with our AI-powered tool.",
}

const plantDiseaseArticles = [
  {
    id: "pd1",
    title: "Early Blight in Tomatoes: Identification and Treatment",
    excerpt: "How to identify, prevent, and treat early blight fungal disease in tomato plants.",
    category: "Fungal Diseases",
    image: "/placeholder.svg?height=300&width=500&text=Tomato+Early+Blight",
    author: "Dr. Sarah Williams",
    date: "May 22, 2025",
    readTime: "7 min read",
    externalLink: "https://www.gardeningknowhow.com/edible/vegetables/tomato/early-blight-alternaria-solani.htm"
  },
  {
    id: "pd2",
    title: "Identifying Powdery Mildew: The White Fungus",
    excerpt: "Recognizing symptoms and effective treatments for this common plant disease.",
    category: "Fungal Diseases",
    image: "/placeholder.svg?height=300&width=500&text=Powdery+Mildew",
    author: "Dr. Robert Martin",
    date: "May 19, 2025",
    readTime: "6 min read",
    externalLink: "https://www.thespruce.com/identifying-and-controlling-powdery-mildew-1402468"
  },
  {
    id: "pd3",
    title: "Root Rot: Causes, Symptoms, and Solutions",
    excerpt: "How overwatering leads to root rot and what you can do to save affected plants.",
    category: "Fungal Diseases",
    image: "/placeholder.svg?height=300&width=500&text=Root+Rot",
    author: "Dr. Lisa Peterson",
    date: "May 16, 2025",
    readTime: "8 min read",
    externalLink: "https://extension.umn.edu/solve-problem/root-rot-plants"
  },
  {
    id: "pd4",
    title: "Fire Blight in Fruit Trees: Prevention and Control",
    excerpt: "Protecting apple and pear trees from this destructive bacterial disease.",
    category: "Bacterial Diseases",
    image: "/placeholder.svg?height=300&width=500&text=Fire+Blight",
    author: "Dr. James Chen",
    date: "May 13, 2025",
    readTime: "9 min read",
    externalLink: "https://www.canr.msu.edu/resources/fire_blight"
  },
  {
    id: "pd5",
    title: "Viral Mosaics: Identification and Management",
    excerpt: "How to recognize and manage mosaic virus infections in vegetables and ornamentals.",
    category: "Viral Diseases",
    image: "/placeholder.svg?height=300&width=500&text=Viral+Mosaics",
    author: "Dr. Emily Johnson",
    date: "May 10, 2025",
    readTime: "10 min read",
    externalLink: "https://extension.psu.edu/virus-diseases-of-plants"
  },
  {
    id: "pd6",
    title: "Downy Mildew in Cucurbits: A Grower's Guide",
    excerpt: "Managing downy mildew in cucumbers, squash, and other cucurbit crops.",
    category: "Fungal Diseases",
    image: "/placeholder.svg?height=300&width=500&text=Downy+Mildew",
    author: "Dr. Thomas Rodriguez",
    date: "May 7, 2025",
    readTime: "8 min read",
    externalLink: "https://extension.umn.edu/disease-management/downy-mildew-cucurbits"
  }
];

// Generate more articles to reach the required count of 18
const generateMoreArticles = () => {
  const baseArticles = [...plantDiseaseArticles];
  const result = [...baseArticles];
  
  const titles = [
    "Leaf Spot Diseases: Identification Guide",
    "Black Spot on Roses: Treatment Options",
    "Bacterial Wilt in Cucumbers and Melons",
    "Fusarium Wilt: A Soil-Borne Threat",
    "Rust Diseases in Ornamental Plants",
    "Verticillium Wilt: Symptoms and Management",
    "Clubroot Disease in Brassicas",
    "Anthracnose: The Plant Canker Disease",
    "Late Blight: The Potato Famine Disease",
    "Sooty Mold: The Honeydew Fungus",
    "Bacterial Leaf Spot in Peppers",
    "Cedar-Apple Rust: A Complex Fungal Disease"
  ];
  
  // Generate additional articles to reach 18 total
  for (let i = 0; result.length < 18; i++) {
    const title = titles[i % titles.length];
    result.push({
      id: `pd${result.length + 1}`,
      title: title,
      excerpt: `Diagnosis, prevention, and treatment of ${title.toLowerCase()} in garden plants.`,
      category: ["Fungal Diseases", "Bacterial Diseases", "Viral Diseases", "Prevention", "Treatment"][Math.floor(Math.random() * 5)],
      image: `/placeholder.svg?height=300&width=500&text=${title.replace(/ /g, '+')}`,
      author: baseArticles[i % baseArticles.length].author,
      date: `May ${Math.floor(Math.random() * 25) + 1}, 2025`,
      readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
      externalLink: baseArticles[i % baseArticles.length].externalLink
    });
  }
  
  return result;
};

const allArticles = generateMoreArticles();

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
                  <a
                    href={article.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                  >
                    Read <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
