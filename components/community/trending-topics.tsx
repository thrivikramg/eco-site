import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function TrendingTopics() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Trending Topics</h2>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start mb-4 overflow-x-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="gardening">Gardening</TabsTrigger>
          <TabsTrigger value="sustainable-living">Sustainable Living</TabsTrigger>
          <TabsTrigger value="zero-waste">Zero Waste</TabsTrigger>
          <TabsTrigger value="eco-tips">Eco Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingTopics.map((topic, index) => (
              <TopicCard key={index} {...topic} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gardening" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingTopics
              .filter((topic) => topic.category === "Gardening")
              .map((topic, index) => (
                <TopicCard key={index} {...topic} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="sustainable-living" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingTopics
              .filter((topic) => topic.category === "Sustainable Living")
              .map((topic, index) => (
                <TopicCard key={index} {...topic} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="zero-waste" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingTopics
              .filter((topic) => topic.category === "Zero Waste")
              .map((topic, index) => (
                <TopicCard key={index} {...topic} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="eco-tips" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingTopics
              .filter((topic) => topic.category === "Eco Tips")
              .map((topic, index) => (
                <TopicCard key={index} {...topic} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TopicCard({ title, category, posts, views }) {
  return (
    <div className="border rounded-lg p-4 hover:border-green-200 hover:bg-green-50/50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <Badge variant="outline" className="mb-2">
            {category}
          </Badge>
          <h3 className="font-medium mb-1">{title}</h3>
          <div className="text-sm text-gray-500">
            {posts} posts • {views} views
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Button>
      </div>
    </div>
  )
}

const trendingTopics = [
  {
    title: "Best practices for organic vegetable gardening",
    category: "Gardening",
    posts: 128,
    views: 3240,
  },
  {
    title: "How to start composting in small spaces",
    category: "Zero Waste",
    posts: 94,
    views: 2180,
  },
  {
    title: "DIY natural cleaning products that actually work",
    category: "Sustainable Living",
    posts: 156,
    views: 4120,
  },
  {
    title: "Water conservation techniques for home gardens",
    category: "Gardening",
    posts: 87,
    views: 1950,
  },
  {
    title: "Plastic-free kitchen: Tips and alternatives",
    category: "Zero Waste",
    posts: 112,
    views: 2760,
  },
  {
    title: "Seasonal planting guide for beginners",
    category: "Gardening",
    posts: 73,
    views: 1840,
  },
  {
    title: "Energy-saving habits that reduce your carbon footprint",
    category: "Eco Tips",
    posts: 104,
    views: 2490,
  },
  {
    title: "Sustainable fashion: Building an eco-friendly wardrobe",
    category: "Sustainable Living",
    posts: 89,
    views: 2150,
  },
]
