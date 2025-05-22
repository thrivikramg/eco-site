import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function EcoLibraryHero() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Eco Library</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Explore our knowledge hub for sustainable living, gardening tips, and environmental education.
          </p>

          <form className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for articles, tips, and guides..."
              className="pl-10 pr-4 py-2 w-full"
            />
            <Button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2">
              Search
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" className="rounded-full">
              Flora & Fauna
            </Button>
            <Button variant="outline" className="rounded-full">
              Oceanography
            </Button>
            <Button variant="outline" className="rounded-full">
              Waste Management
            </Button>
            <Button variant="outline" className="rounded-full">
              Gardening
            </Button>
            <Button variant="outline" className="rounded-full">
              Plant Diseases
            </Button>
            <Button variant="outline" className="rounded-full">
              Sanctuaries
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
