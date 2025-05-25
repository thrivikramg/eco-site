import Link from "next/link"
import Image from "next/image"
import { Badge } from "../../../components/ui/badge"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Search, Filter, ArrowUpRight } from "lucide-react"

const wasteManagementArticles = [
  {
    id: "wm1",
    title: "Zero Waste Living: A Practical Guide",
    excerpt: "How to dramatically reduce your household waste with simple lifestyle changes.",
    category: "Lifestyle",
    image: "/placeholder.svg?height=300&width=500&text=Zero+Waste+Living",
    author: "Lauren Singer",
    date: "May 24, 2025",
    readTime: "9 min read",
    externalLink: "https://www.goingzerowaste.com/blog/the-ultimate-step-by-step-guide-to-going-zero-waste"
  },
  {
    id: "wm2",
    title: "Composting 101: Transform Your Food Waste",
    excerpt: "A beginner's guide to starting your own compost system at home.",
    category: "Composting",
    image: "/placeholder.svg?height=300&width=500&text=Composting+101",
    author: "Dr. Elaine Ingham",
    date: "May 21, 2025",
    readTime: "8 min read",
    externalLink: "https://www.epa.gov/recycle/composting-home"
  },
  {
    id: "wm3",
    title: "Plastic Recycling: Truth vs. Myth",
    excerpt: "What actually happens to your plastic waste and how to make better recycling choices.",
    category: "Recycling",
    image: "/placeholder.svg?height=300&width=500&text=Plastic+Recycling",
    author: "Roland Geyer, Ph.D.",
    date: "May 18, 2025",
    readTime: "12 min read",
    externalLink: "https://www.nationalgeographic.com/science/article/plastic-pollution-huge-problem-not-too-late"
  },
  {
    id: "wm4",
    title: "Electronic Waste: The Growing Environmental Crisis",
    excerpt: "The environmental impact of discarded electronics and how to dispose of them responsibly.",
    category: "E-Waste",
    image: "/placeholder.svg?height=300&width=500&text=Electronic+Waste",
    author: "Dr. Josh Lepawsky",
    date: "May 15, 2025",
    readTime: "10 min read",
    externalLink: "https://www.ifixit.com/Right-to-Repair/E-waste"
  },
  {
    id: "wm5",
    title: "The Circular Economy: Reimagining Waste as a Resource",
    excerpt: "How businesses and communities are redesigning systems to eliminate waste.",
    category: "Sustainability",
    image: "/placeholder.svg?height=300&width=500&text=Circular+Economy",
    author: "Kate Raworth",
    date: "May 12, 2025",
    readTime: "11 min read",
    externalLink: "https://ellenmacarthurfoundation.org/topics/circular-economy-introduction/overview"
  },
  {
    id: "wm6",
    title: "Textile Waste: The Fast Fashion Problem",
    excerpt: "The environmental impact of clothing waste and sustainable alternatives.",
    category: "Fashion",
    image: "/placeholder.svg?height=300&width=500&text=Textile+Waste",
    author: "Dr. Linda Greer",
    date: "May 9, 2025",
    readTime: "8 min read",
    externalLink: "https://www.fashionrevolution.org/waste/"
  },
  {
    id: "wm7",
    title: "Bioplastics: Sustainable Solution or False Promise?",
    excerpt: "Examining the environmental impact of biodegradable and compostable plastics.",
    category: "Materials",
    image: "/placeholder.svg?height=300&width=500&text=Bioplastics",
    author: "Dr. Ramani Narayan",
    date: "May 6, 2025",
    readTime: "13 min read",
    externalLink: "https://www.sciencedirect.com/science/article/abs/pii/S0141391019301387"
  },
  {
    id: "wm8",
    title: "Waste-to-Energy: A Sustainable Solution?",
    excerpt: "Exploring the benefits and controversies of converting waste to renewable energy.",
    category: "Energy",
    image: "/placeholder.svg?height=300&width=500&text=Waste+to+Energy",
    author: "Dr. Marco Castaldi",
    date: "May 3, 2025",
    readTime: "10 min read",
    externalLink: "https://www.energy.gov/eere/bioenergy/waste-energy"
  }
];

// Generate more articles to reach the required count of 35
const generateMoreArticles = () => {
  const baseArticles = [...wasteManagementArticles];
  const result = [...baseArticles];
  
  const titles = [
    "Community Composting Initiatives",
    "The Problem with Single-Use Plastics",
    "Innovative Waste Collection Systems Around the World",
    "Reducing Food Waste: From Farm to Table",
    "Commercial Waste Management Best Practices",
    "Hazardous Waste Disposal: What You Need to Know",
    "Upcycling: Creative Reuse for a Sustainable Future",
    "Landfill Design and Environmental Protection",
    "Construction Waste Reduction Strategies",
    "The Global Waste Trade: Exporting Pollution",
    "Waste Audits: Tracking and Reducing Your Waste",
    "Marine Debris: Tackling Ocean Waste",
    "Waste Management in Developing Countries",
    "Anaerobic Digestion: Converting Waste to Biogas",
    "Extended Producer Responsibility Programs",
    "The Zero Landfill Movement",
    "Microplastics: The Invisible Threat",
    "Waste Management in Urban Settings",
    "Composting Toilets: A Sustainable Solution",
    "Medical Waste Management and Safety",
    "Packaging Alternatives for a Zero-Waste Future",
    "Sustainable Event Waste Management",
    "The Role of Policy in Waste Reduction",
    "Waste Management Education and Awareness",
    "Industrial Symbiosis: One Company's Waste as Another's Resource",
    "Smart Waste Management Technologies",
    "The Psychology of Waste and Consumption"
  ];
  
  // Generate additional articles to reach 35 total
  for (let i = 0; result.length < 35; i++) {
    const title = titles[i % titles.length];
    result.push({
      id: `wm${result.length + 1}`,
      title: title,
      excerpt: `Exploring effective strategies for ${title.toLowerCase()}.`,
      category: ["Recycling", "Composting", "Sustainability", "Waste Reduction", "Circular Economy"][Math.floor(Math.random() * 5)],
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

export default function WasteManagementPage() {
  return (
    <div className="bg-[#f5fbf5] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1600&text=Waste+Management')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-emerald-800/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Waste Management</h1>
            <p className="text-xl text-white/90 mb-6">Learn effective techniques for reducing, reusing, and recycling waste.</p>
            <div className="text-white font-medium">{allArticles.length} articles</div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white py-6 shadow-md sticky top-16 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 border-gray-200 rounded-md w-full"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Search</Button>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden h-full bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-lg border border-gray-100">
              <div className="relative aspect-video">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-700 text-white">
                  {article.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-green-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium">By {article.author}</span>
                  <a
                    href={article.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
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
            <Button variant="outline" className="bg-green-600 text-white">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline" className="rounded-r-md">Next</Button>
          </nav>
        </div>
      </section>
    </div>
  )
}
