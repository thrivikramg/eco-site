import Link from "next/link"
import Image from "next/image"
import { Badge } from "../../../components/ui/badge"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Search, Filter, ArrowUpRight } from "lucide-react"

const oceanographyArticles = [
  {
    id: "oc1",
    title: "Ocean Acidification: The Silent Crisis",
    excerpt: "How rising carbon dioxide levels are changing the chemistry of our oceans and threatening marine life.",
    category: "Climate Impact",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
    author: "Dr. Richard Feely",
    date: "May 22, 2025",
    readTime: "11 min read",
    externalLink: "https://www.noaa.gov/ocean-acidification"
  },
  {
    id: "oc2",
    title: "The Great Barrier Reef: Fighting for Survival",
    excerpt: "Current conservation efforts to protect the world's largest coral reef system.",
    category: "Coral Reefs",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
    author: "Dr. Ove Hoegh-Guldberg",
    date: "May 19, 2025",
    readTime: "14 min read",
    externalLink: "https://www.barrierreef.org/the-reef/threats"
  },
  {
    id: "oc3",
    title: "Deep Sea Hydrothermal Vents: Oases of Life",
    excerpt: "Exploring the unique ecosystems thriving in the most extreme environments on Earth.",
    category: "Marine Biology",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
    author: "Dr. Cindy Van Dover",
    date: "May 16, 2025",
    readTime: "9 min read",
    externalLink: "https://oceanservice.noaa.gov/facts/vents.html"
  },
  {
    id: "oc4",
    title: "Plastic Pollution in Our Oceans: A Global Crisis",
    excerpt: "The devastating impact of plastic waste on marine ecosystems and what we can do about it.",
    category: "Pollution",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
    author: "Dr. Marcus Eriksen",
    date: "May 13, 2025",
    readTime: "12 min read",
    externalLink: "https://www.plasticpollutioncoalition.org/the-problem-of-plastic"
  },
  {
    id: "oc5",
    title: "The Mysterious World of Cephalopods",
    excerpt: "Octopuses, squids, and cuttlefish: The intelligent aliens of our oceans.",
    category: "Marine Life",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
    author: "Dr. Jennifer Mather",
    date: "May 10, 2025",
    readTime: "8 min read",
    externalLink: "https://www.scientificamerican.com/article/the-mind-of-an-octopus/"
  },
  {
    id: "oc6",
    title: "Ocean Currents and Climate Regulation",
    excerpt: "How ocean circulation patterns help regulate Earth's climate system.",
    category: "Oceanography",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
    author: "Dr. Stefan Rahmstorf",
    date: "May 7, 2025",
    readTime: "10 min read",
    externalLink: "https://climate.nasa.gov/news/2950/ocean-worlds-water-is-common-in-the-outer-solar-system/"
  },
  {
    id: "oc7",
    title: "Bioluminescence: Living Light in the Deep",
    excerpt: "The science behind glowing marine organisms and their evolutionary advantages.",
    category: "Marine Biology",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
    author: "Dr. Edith Widder",
    date: "May 4, 2025",
    readTime: "7 min read",
    externalLink: "https://ocean.si.edu/ocean-life/fish/bioluminescence"
  },
  {
    id: "oc8",
    title: "Seagrass Meadows: The Forgotten Carbon Sinks",
    excerpt: "How underwater grasslands capture carbon and support marine biodiversity.",
    category: "Ecosystems",
    image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
    author: "Dr. Carlos Duarte",
    date: "May 1, 2025",
    readTime: "9 min read",
    externalLink: "https://www.sciencedirect.com/science/article/pii/S0025326X18307975"
  }
];

// Generate more articles to reach the required count of 28
const generateMoreArticles = () => {
  const baseArticles = [...oceanographyArticles];
  const result = [...baseArticles];
  
  const titles = [
    "Mapping the Ocean Floor: New Discoveries",
    "The Blue Carbon Initiative: Coastal Ecosystems as Climate Solutions",
    "Marine Protected Areas: Safeguarding Ocean Biodiversity",
    "Ocean Deoxygenation: Causes and Consequences",
    "Kelp Forests: Underwater Jungles in Peril",
    "The Role of Phytoplankton in Ocean Health",
    "Sharks: Misunderstood Guardians of the Sea",
    "Rising Sea Levels: Coastal Communities at Risk",
    "Sustainable Fisheries Management",
    "Marine Mammals: Adaptations for Aquatic Life",
    "The Deep Scattering Layer: The Ocean's Twilight Zone",
    "Coral Bleaching: Causes, Impacts, and Recovery",
    "Ocean Noise Pollution and Its Effects on Marine Life",
    "Mangrove Ecosystems: Coastal Protection and Carbon Storage",
    "Ocean Microplastics: The Invisible Threat",
    "The Thermohaline Circulation: Earth's Ocean Conveyor Belt",
    "Marine Biotechnology: Medicines from the Sea",
    "Sea Turtles: Ancient Mariners in Crisis",
    "Deep-Sea Mining: Environmental Concerns and Regulations",
    "Ocean Observing Systems: Monitoring the Blue Planet"
  ];
  
  // Generate additional articles to reach 28 total
  for (let i = 0; result.length < 28; i++) {
    const title = titles[i % titles.length];
    result.push({
      id: `oc${result.length + 1}`,
      title: title,
      excerpt: `Exploring the fascinating aspects of ${title.toLowerCase()}.`,
      category: ["Oceanography", "Marine Biology", "Conservation", "Climate Impact", "Ecosystems"][Math.floor(Math.random() * 5)],
      image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
      author: baseArticles[i % baseArticles.length].author,
      date: `May ${Math.floor(Math.random() * 25) + 1}, 2025`,
      readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
      externalLink: baseArticles[i % baseArticles.length].externalLink
    });
  }
  
  return result;
};

const allArticles = generateMoreArticles();

export default function OceanographyPage() {
  return (
    <div className="bg-[#f0f7fa] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: 'url(https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015831/90_mtxx8f.png)' }}>
        <div className="absolute inset-0 bg-blue-900/60" />
        <div className="relative container mx-auto px-4 h-full flex items-center z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Oceanography</h1>
            <p className="text-xl text-white/90 mb-6">Explore the mysteries of our oceans and marine ecosystems.</p>
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
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Search</Button>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden h-full bg-white border-none transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative aspect-video">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700 text-white">
                  {article.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium">By {article.author}</span>
                  <a
                    href={article.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
            <Button variant="outline" className="bg-blue-600 text-white">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline" className="rounded-r-md">Next</Button>
          </nav>
        </div>
      </section>
    </div>
  )
}
