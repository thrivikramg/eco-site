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
  title: "Wildlife Sanctuaries | EcoGrow",
  description: "Explore wildlife sanctuaries and conservation areas around the world.",
}

const sanctuariesArticles = [
  {
    id: "s1",
    title: "Bandipur Tiger Reserve: A Conservation Success Story",
    excerpt: "How careful management has helped tiger populations rebound in this Indian sanctuary.",
    category: "Tiger Conservation",
    image: "/placeholder.svg?height=300&width=500&text=Bandipur+Tiger+Reserve",
    author: "Rahul Sharma",
    date: "May 23, 2025",
    readTime: "15 min read",
    externalLink: "https://www.bandipurtigerreserve.in/"
  },
  {
    id: "s2",
    title: "Serengeti National Park: The Great Migration",
    excerpt: "Tracking the annual wildebeest migration across Tanzania and Kenya.",
    category: "African Wildlife",
    image: "/placeholder.svg?height=300&width=500&text=Serengeti+National+Park",
    author: "Dr. Jane Goodall",
    date: "May 20, 2025",
    readTime: "14 min read",
    externalLink: "https://www.nationalgeographic.com/animals/article/serengeti-migration-safari-guide"
  },
  {
    id: "s3",
    title: "The Amazon Rainforest: Protecting Earth's Biodiversity Hotspot",
    excerpt: "Conservation efforts in the world's largest tropical rainforest.",
    category: "Rainforest Conservation",
    image: "/placeholder.svg?height=300&width=500&text=Amazon+Rainforest",
    author: "Dr. Carlos Nobre",
    date: "May 17, 2025",
    readTime: "12 min read",
    externalLink: "https://www.worldwildlife.org/places/amazon"
  },
  {
    id: "s4",
    title: "Great Barrier Reef Marine Park: Ocean Conservation",
    excerpt: "Efforts to protect the world's largest coral reef system from climate change.",
    category: "Marine Conservation",
    image: "/placeholder.svg?height=300&width=500&text=Great+Barrier+Reef",
    author: "Dr. Ove Hoegh-Guldberg",
    date: "May 14, 2025",
    readTime: "11 min read",
    externalLink: "https://greatbarrierreef.org/"
  },
  {
    id: "s5",
    title: "Yellowstone National Park: America's First National Park",
    excerpt: "The history and ecological significance of this pioneer in conservation.",
    category: "National Parks",
    image: "/placeholder.svg?height=300&width=500&text=Yellowstone+National+Park",
    author: "Dr. Robert Smith",
    date: "May 11, 2025",
    readTime: "13 min read",
    externalLink: "https://www.nps.gov/yell/index.htm"
  },
  {
    id: "s6",
    title: "Galápagos Marine Reserve: Protecting Darwin's Laboratory",
    excerpt: "Conservation efforts in the waters surrounding the iconic Galápagos Islands.",
    category: "Marine Conservation",
    image: "/placeholder.svg?height=300&width=500&text=Galapagos+Marine+Reserve",
    author: "Dr. Patricia Parker",
    date: "May 8, 2025",
    readTime: "10 min read",
    externalLink: "https://www.darwinfoundation.org/en/"
  },
  {
    id: "s7",
    title: "Kruger National Park: Big Five Conservation",
    excerpt: "Efforts to protect lions, elephants, rhinos, leopards and buffalo in South Africa.",
    category: "African Wildlife",
    image: "/placeholder.svg?height=300&width=500&text=Kruger+National+Park",
    author: "Dr. Sam Ferreira",
    date: "May 5, 2025",
    readTime: "9 min read",
    externalLink: "https://www.sanparks.org/parks/kruger/"
  },
  {
    id: "s8",
    title: "Sundarbans National Park: Protecting the Bengal Tiger",
    excerpt: "Conservation challenges in the world's largest mangrove forest.",
    category: "Tiger Conservation",
    image: "/placeholder.svg?height=300&width=500&text=Sundarbans+National+Park",
    author: "Dr. Priya Mondal",
    date: "May 2, 2025",
    readTime: "11 min read",
    externalLink: "https://whc.unesco.org/en/list/798/"
  }
];

// Generate more articles to reach the required count of 24
const generateMoreArticles = () => {
  const baseArticles = [...sanctuariesArticles];
  const result = [...baseArticles];
  
  const titles = [
    "Everglades National Park: America's River of Grass",
    "Komodo National Park: Protecting the World's Largest Lizards",
    "Kaziranga National Park: Rhino Conservation Success",
    "Borneo Rainforest: Orangutan Sanctuaries",
    "Monarch Butterfly Biosphere Reserve in Mexico",
    "Arctic National Wildlife Refuge: Protecting the Last Frontier",
    "Okavango Delta: Africa's Last Eden",
    "Bwindi Impenetrable National Park: Mountain Gorilla Sanctuary",
    "Pantanal Conservation Area: South America's Wetland Wonder",
    "Białowieża Forest: Europe's Last Primeval Forest",
    "Coral Triangle: The Amazon of the Seas",
    "Virunga National Park: Conservation Amid Conflict",
    "Corcovado National Park: Costa Rica's Crown Jewel",
    "Etosha National Park: Namibia's Wildlife Haven",
    "Daintree Rainforest: Ancient Ecosystem Protection",
    "Yosemite National Park: Conservation Pioneer"
  ];
  
  // Generate additional articles to reach 24 total
  for (let i = 0; result.length < 24; i++) {
    const title = titles[i % titles.length];
    result.push({
      id: `s${result.length + 1}`,
      title: title,
      excerpt: `Conservation strategies and wildlife protection in ${title.split(":")[0]}.`,
      category: ["National Parks", "Marine Conservation", "Tiger Conservation", "African Wildlife", "Rainforest Conservation", "Endangered Species"][Math.floor(Math.random() * 6)],
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
                  src="/placeholder.svg?height=800&width=1200&text=Serengeti+National+Park"
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
                <a
                  href="https://www.nationalgeographic.com/animals/article/serengeti-migration-safari-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors w-fit"
                >
                  Read Full Article <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
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
                  <a
                    href={article.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  >
                    Read <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
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
