import Link from "next/link"
import Image from "next/image"
import { Badge } from "../../../components/ui/badge"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Search, Filter, ArrowUpRight } from "lucide-react"

const gardeningArticles = [
  {
    id: "gt1",
    title: "Companion Planting: Nature's Pest Control",
    excerpt: "Which plants work well together to boost growth and naturally deter pests.",
    category: "Organic Gardening",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
    author: "Jessica Walliser",
    date: "May 24, 2025",
    readTime: "10 min read",
    externalLink: "https://savvygardening.com/companion-planting-chart/"
  },
  {
    id: "gt2",
    title: "No-Dig Gardening: Better Results with Less Work",
    excerpt: "How to build fertile soil and grow healthier plants by disturbing the soil less.",
    category: "Sustainable Techniques",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
    author: "Charles Dowding",
    date: "May 22, 2025",
    readTime: "8 min read",
    externalLink: "https://charlesdowding.co.uk/no-dig-growing/how-to-start-no-dig/"
  },
  {
    id: "gt3",
    title: "Composting Masterclass: From Kitchen Scraps to Garden Gold",
    excerpt: "A comprehensive guide to creating nutrient-rich compost for your garden.",
    category: "Composting",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
    author: "Dr. Elaine Ingham",
    date: "May 20, 2025",
    readTime: "12 min read",
    externalLink: "https://www.permaculturenews.org/2018/09/12/the-art-and-science-of-making-a-hot-compost-pile/"
  },
  {
    id: "gt4",
    title: "Rainwater Harvesting for Garden Irrigation",
    excerpt: "Simple systems to collect and use rainwater in your garden.",
    category: "Water Conservation",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
    author: "Brad Lancaster",
    date: "May 18, 2025",
    readTime: "9 min read",
    externalLink: "https://www.harvestingrainwater.com/rainwater-harvesting-inforesources/rainwater-harvesting-online-resources/"
  },
  {
    id: "gt5",
    title: "Permaculture Principles for Home Gardens",
    excerpt: "How to apply permaculture ethics and principles to create a sustainable garden ecosystem.",
    category: "Permaculture",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
    author: "Geoff Lawton",
    date: "May 16, 2025",
    readTime: "14 min read",
    externalLink: "https://www.permaculturenews.org/what-is-permaculture/"
  },
  {
    id: "gt6",
    title: "Growing Food in Small Spaces: Urban Gardening Solutions",
    excerpt: "Innovative techniques for growing vegetables in limited spaces.",
    category: "Urban Gardening",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
    author: "Kevin Lee Jacobs",
    date: "May 14, 2025",
    readTime: "7 min read",
    externalLink: "https://www.urbanfarmonline.com/urban-gardening/backyard-gardening/container-gardening.aspx"
  },
  {
    id: "gt7",
    title: "Natural Pest Management: Beyond Chemicals",
    excerpt: "Effective strategies to manage garden pests without synthetic pesticides.",
    category: "Pest Control",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
    author: "Dr. Jessica Shade",
    date: "May 12, 2025",
    readTime: "11 min read",
    externalLink: "https://www.gardensalive.com/product/natural-pest-control"
  },
  {
    id: "gt8",
    title: "Seed Saving: Preserving Biodiversity in Your Garden",
    excerpt: "How to collect, process, and store seeds from your garden for future planting.",
    category: "Seed Saving",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
    author: "Vandana Shiva",
    date: "May 10, 2025",
    readTime: "9 min read",
    externalLink: "https://www.seedsavers.org/learn#save"
  }
];

// Generate more articles to reach the required count of 56
const generateMoreArticles = () => {
  const baseArticles = [...gardeningArticles];
  const result = [...baseArticles];
  
  const titles = [
    "Soil Testing and Amendment Guide",
    "Vertical Gardening: Growing Up Instead of Out",
    "Heirloom Vegetables: Preserving Food Heritage",
    "Season Extension Techniques for Year-Round Harvests",
    "Medicinal Herb Garden: Growing Your Own Pharmacy",
    "Drought-Resistant Gardening Strategies",
    "Attracting Beneficial Insects to Your Garden",
    "Cover Crops: Improving Soil Health Naturally",
    "Native Plant Gardening for Wildlife Support",
    "Raised Bed Construction and Maintenance",
    "Pruning Techniques for Healthier Plants",
    "Garden Planning for Maximum Yield",
    "Food Forests: Mimicking Natural Ecosystems",
    "Hydroponics Basics for Home Gardeners",
    "Container Gardening for Beginners",
    "Lasagna Gardening: No-Dig Bed Preparation",
    "Greywater Systems for Garden Irrigation",
    "Intensive Gardening Methods for Small Spaces",
    "Preventing and Managing Plant Diseases Naturally",
    "Mulching Guide: Types, Benefits, and Application",
    "Biochar: Improving Soil and Sequestering Carbon",
    "Winter Garden Preparation and Protection",
    "Succession Planting for Continuous Harvests",
    "Mycorrhizal Fungi: The Underground Garden Allies",
    "Vermicomposting: Worm Composting Basics",
    "Greenhouse Gardening Fundamentals",
    "Water-Wise Gardening Techniques",
    "Bokashi Composting for Urban Gardeners",
    "Pollinator Gardens: Supporting Bees and Butterflies",
    "Hugelkultur Beds: Self-Sustaining Garden Mounds",
    "Integrated Pest Management for Home Gardeners",
    "Edible Landscaping: Beautiful and Productive Gardens",
    "Moon Phase Gardening: Ancient Wisdom or Myth?",
    "Japanese Gardening Principles for Western Gardens",
    "Kids Gardening Projects: Growing Future Gardeners",
    "Agroforestry Techniques for Home Gardens",
    "Aquaponics: Combining Fish and Plant Cultivation",
    "Garden Recordkeeping and Journaling",
    "Indoor Gardening Under Grow Lights",
    "Preserving Your Harvest: Canning, Drying, and Freezing",
    "Microgreens: Quick and Nutritious Indoor Crops",
    "Seed Starting Indoors: Timing and Techniques",
    "Garden Tool Maintenance and Care",
    "Humus-Rich Soil: The Foundation of Garden Health",
    "Rooftop and Balcony Gardening Solutions",
    "Biodynamic Gardening Principles and Practices",
    "Winter Sowing: Cold-Weather Seed Starting",
    "Keyhole Gardens: Water-Efficient Raised Beds"
  ];
  
  // Generate additional articles to reach 56 total
  for (let i = 0; result.length < 56; i++) {
    const title = titles[i % titles.length];
    result.push({
      id: `gt${result.length + 1}`,
      title: title,
      excerpt: `Expert advice on ${title.toLowerCase()} for your sustainable garden.`,
      category: ["Organic Gardening", "Sustainable Techniques", "Water Conservation", "Permaculture", "Urban Gardening", "Pest Control", "Soil Health"][Math.floor(Math.random() * 7)],
      image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
      author: baseArticles[i % baseArticles.length].author,
      date: `May ${Math.floor(Math.random() * 25) + 1}, 2025`,
      readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
      externalLink: baseArticles[i % baseArticles.length].externalLink
    });
  }
  
  return result;
};

const allArticles = generateMoreArticles();

export default function GardeningTipsPage() {
  return (
    <div className="bg-[#f7f9f7] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: 'url(https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/70 to-green-600/70" />
        <div className="relative container mx-auto px-4 h-full flex items-center z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Gardening Tips</h1>
            <p className="text-xl text-white/90 mb-6">Expert advice for growing healthy plants and sustainable gardens.</p>
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
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              <select className="border border-gray-200 rounded-md px-3 py-2">
                <option value="">All Categories</option>
                <option value="Organic Gardening">Organic Gardening</option>
                <option value="Sustainable Techniques">Sustainable Techniques</option>
                <option value="Water Conservation">Water Conservation</option>
                <option value="Permaculture">Permaculture</option>
                <option value="Urban Gardening">Urban Gardening</option>
                <option value="Pest Control">Pest Control</option>
                <option value="Soil Health">Soil Health</option>
              </select>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Search</Button>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Featured Gardening Articles</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="overflow-hidden flex flex-col md:flex-row h-full hover:shadow-xl transition-all duration-300">
            <div className="md:w-2/5 relative">
              <Image
                src="https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg"
                alt="Permaculture Principles"
                fill
                className="object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-green-600 text-white">
                Permaculture
              </Badge>
            </div>
            <div className="md:w-3/5 p-6 flex flex-col">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span>May 16, 2025</span>
                <span className="mx-2">•</span>
                <span>14 min read</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Permaculture Principles for Home Gardens</h3>
              <p className="text-gray-600 mb-4">How to apply permaculture ethics and principles to create a sustainable garden ecosystem.</p>
              <p className="text-gray-600 mb-6">Learn how to design your garden as a self-sustaining ecosystem that works with nature rather than against it. This comprehensive guide covers the core ethics and principles of permaculture and provides practical examples for implementation in your home garden.</p>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-medium">By Geoff Lawton</span>
                <a
                  href="https://www.permaculturenews.org/what-is-permaculture/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Read Article <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </Card>
          <Card className="overflow-hidden flex flex-col md:flex-row h-full hover:shadow-xl transition-all duration-300">
            <div className="md:w-2/5 relative">
              <Image
                src="https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg"
                alt="Companion Planting"
                fill
                className="object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-green-600 text-white">
                Organic Gardening
              </Badge>
            </div>
            <div className="md:w-3/5 p-6 flex flex-col">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span>May 24, 2025</span>
                <span className="mx-2">•</span>
                <span>10 min read</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Companion Planting: Nature's Pest Control</h3>
              <p className="text-gray-600 mb-4">Which plants work well together to boost growth and naturally deter pests.</p>
              <p className="text-gray-600 mb-6">Discover how strategic plant combinations can help you create a healthier garden ecosystem. Learn which plants enhance each other's growth, repel pests, and attract beneficial insects for a more productive organic garden.</p>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-medium">By Jessica Walliser</span>
                <a
                  href="https://savvygardening.com/companion-planting-chart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Read Article <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* All Articles Grid */}
        <h2 className="text-2xl font-bold mb-8">All Gardening Articles</h2>
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
                <Badge className="absolute top-3 left-3 bg-green-600 text-white">
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
            <Button variant="outline">...</Button>
            <Button variant="outline">6</Button>
            <Button variant="outline" className="rounded-r-md">Next</Button>
          </nav>
        </div>
      </section>
    </div>
  )
}
