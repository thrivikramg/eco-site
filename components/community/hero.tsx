import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Hero() {
  return (
    <section className="bg-green-50 py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
            Join Our Growing <span className="text-green-600">Community</span>
          </h1>
          <p className="text-gray-500 md:text-xl max-w-[700px] mx-auto">
            Connect with like-minded individuals passionate about sustainable living and eco-friendly practices.
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search discussions, topics, or members..." className="pl-9 bg-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
