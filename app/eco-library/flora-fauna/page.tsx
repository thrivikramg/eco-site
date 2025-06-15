import Link from "next/link"
import Image from "next/image"
import { Badge } from "../../../components/ui/badge"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Search, Filter, ArrowUpRight } from "lucide-react"

const floraFaunaArticles = [
  {
    id: "ff1",
    title: "10 Rare Animal Species Making a Comeback",
    excerpt: "Thanks to conservation efforts, these endangered species are showing promising signs of recovery.",
    category: "Conservation",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015104/hq720_sv2zwd.jpg`,
    author: "Dr. Maya Patel",
    date: "May 23, 2025",
    readTime: "8 min read",
    externalLink: "https://www.nationalgeographic.com/animals/article/endangered-species-recovery-success-stories"
  },
  {
    id: "ff2",
    title: "The Hidden World of Mycorrhizal Networks",
    excerpt: "How underground fungal networks help trees communicate and share resources.",
    category: "Plant Biology",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015102/826760c4-5f79-4a56-b01c-bec5673f42a0_dzlrdz.jpg`,
    author: "Prof. Suzanne Simard",
    date: "May 20, 2025",
    readTime: "12 min read",
    externalLink: "https://www.scientificamerican.com/article/do-trees-talk-to-each-other/"
  },
  {
    id: "ff3",
    title: "Monarch Butterfly Migration: A Spectacular Journey",
    excerpt: "Following the 3,000-mile journey of one of nature's most impressive migrations.",
    category: "Wildlife",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015102/826760c4-5f79-4a56-b01c-bec5673f42a0_dzlrdz.jpg`,
    author: "Carlos Gutierrez",
    date: "May 18, 2025",
    readTime: "10 min read",
    externalLink: "https://www.worldwildlife.org/species/monarch-butterfly"
  },
  {
    id: "ff4",
    title: "Keystone Species: The Architects of Ecosystems",
    excerpt: "How certain species have disproportionate effects on their environments.",
    category: "Ecology",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015104/hq720_sv2zwd.jpg`,
    author: "Dr. Jane Goodall",
    date: "May 15, 2025",
    readTime: "11 min read",
    externalLink: "https://www.britannica.com/science/keystone-species"
  },
  {
    id: "ff5",
    title: "The Remarkable Resilience of Mangrove Forests",
    excerpt: "How these unique coastal ecosystems protect shorelines and support biodiversity.",
    category: "Ecosystems",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015029/intricate-line-art-earth-surrounded-diverse-flora-fauna-drawing-save-366564860_rinsr9.jpg`,
    author: "Lin Wei Chen",
    date: "May 12, 2025",
    readTime: "9 min read",
    externalLink: "https://www.iucn.org/resources/issues-brief/mangroves"
  },
  {
    id: "ff6",
    title: "Urban Wildlife: Adapting to City Life",
    excerpt: "How animals are evolving to thrive in our concrete jungles.",
    category: "Urban Ecology",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015029/intricate-line-art-earth-surrounded-diverse-flora-fauna-drawing-save-366564860_rinsr9.jpg`,
    author: "Dr. Mark Johnson",
    date: "May 9, 2025",
    readTime: "7 min read",
    externalLink: "https://theconversation.com/urban-rewilding-the-wildlife-thriving-in-cities-around-the-world"
  },
  {
    id: "ff7",
    title: "Pollinator Decline: Causes and Solutions",
    excerpt: "Understanding why bees and other pollinators are disappearing and how to help.",
    category: "Conservation",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015102/826760c4-5f79-4a56-b01c-bec5673f42a0_dzlrdz.jpg`,
    author: "Dr. Elizabeth Warren",
    date: "May 6, 2025",
    readTime: "13 min read",
    externalLink: "https://www.nrdc.org/stories/buzz-about-disappearing-bees"
  },
  {
    id: "ff8",
    title: "Invasive Species: Ecological Disruptors",
    excerpt: "How non-native species can transform ecosystems and threaten biodiversity.",
    category: "Ecology",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015104/hq720_sv2zwd.jpg`,
    author: "Prof. Daniel Smith",
    date: "May 3, 2025",
    readTime: "10 min read",
    externalLink: "https://www.nature.org/en-us/about-us/where-we-work/united-states/indiana/stories-in-indiana/invasive-species-101/"
  }
];

// Generate more articles to reach the required count of 42
const generateMoreArticles = () => {
  const baseArticles = [...floraFaunaArticles];
  const result = [...baseArticles];
  
  const titles = [
    "The Secret Life of Carnivorous Plants",
    "Coral Reef Restoration Techniques",
    "Wildlife Corridors: Connecting Habitats",
    "Ancient Forests: The World's Oldest Trees",
    "Bird Migration Patterns in a Changing Climate",
    "Rewilding: Bringing Back Lost Species",
    "Symbiotic Relationships in Nature",
    "The Impact of Light Pollution on Nocturnal Animals",
    "Seed Banks: Preserving Biodiversity for the Future",
    "How Animals Navigate: Nature's Compass",
    "Extremophiles: Life in Harsh Environments",
    "Freshwater Ecosystems Under Threat",
    "The Role of Predators in Healthy Ecosystems",
    "Plant Communication: The Wood Wide Web",
    "Conservation Genetics: Saving Species Through DNA",
    "The Return of Wolves to Yellowstone",
    "Amphibian Decline: Causes and Conservation",
    "Native Plant Gardening for Wildlife",
    "Mimicry in Nature: Masters of Disguise",
    "Deep Sea Creatures: Life in the Abyss",
    "Rainforest Canopy: Life in the Treetops",
    "Hibernation and Torpor: Winter Survival Strategies",
    "Pollinators Beyond Bees: Flies, Beetles, and More",
    "Island Biogeography: Unique Evolutionary Laboratories",
    "The Importance of Wetlands for Biodiversity",
    "Fungi: The Hidden Kingdom",
    "Animal Intelligence: Cognitive Abilities Across Species",
    "Desert Adaptations: Surviving Extreme Heat",
    "Urban Biodiversity: Creating City Habitats",
    "The California Condor Recovery Program",
    "Restoration Ecology: Healing Damaged Ecosystems",
    "Biomimicry: Learning from Nature's Designs",
    "Citizen Science in Wildlife Conservation",
    "Arctic Wildlife in a Warming World"
  ];
  
  // Generate additional articles to reach 42 total
  for (let i = 0; result.length < 42; i++) {
    const title = titles[i % titles.length];
    const existingCount = result.filter(a => a.title === title).length;
    
    if (existingCount > 0) {
      const modifiedTitle = `${title} - Part ${existingCount + 1}`;
      result.push({
        id: `ff${result.length + 1}`,
        title: modifiedTitle,
        excerpt: `Continued exploration of ${title.toLowerCase()}.`,
        category: ["Conservation", "Ecology", "Wildlife", "Plant Biology", "Ecosystems"][Math.floor(Math.random() * 5)],
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015102/826760c4-5f79-4a56-b01c-bec5673f42a0_dzlrdz.jpg`,
        author: baseArticles[i % baseArticles.length].author,
        date: `May ${Math.floor(Math.random() * 25) + 1}, 2025`,
        readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
        externalLink: baseArticles[i % baseArticles.length].externalLink
      });
    } else {
      result.push({
        id: `ff${result.length + 1}`,
        title: title,
        excerpt: `Exploring the fascinating world of ${title.toLowerCase()}.`,
        category: ["Conservation", "Ecology", "Wildlife", "Plant Biology", "Ecosystems"][Math.floor(Math.random() * 5)],
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015108/boersch-2_hvmigf.jpg`,
        author: baseArticles[i % baseArticles.length].author,
        date: `May ${Math.floor(Math.random() * 25) + 1}, 2025`,
        readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
        externalLink: baseArticles[i % baseArticles.length].externalLink
      });
    }
  }
  
  return result;
};

const allArticles = generateMoreArticles();

export default function FloraFaunaPage() {
  return (
    <div className="bg-[#f8faf5] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: 'url(https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015108/boersch-2_hvmigf.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto px-4 h-full flex items-center z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Flora and Fauna</h1>
            <p className="text-xl text-white/90 mb-6">Discover the diverse plant and animal species of our planet.</p>
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
            <Button className="bg-primary hover:bg-primary/90">Search</Button>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative aspect-video">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary text-white">
                  {article.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium">By {article.author}</span>
                  <a
                    href={article.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
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
            <Button variant="outline" className="bg-primary text-white">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline" className="rounded-r-md">Next</Button>
          </nav>
        </div>
      </section>
    </div>
  )
}
