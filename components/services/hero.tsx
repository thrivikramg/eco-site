import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function ServicesHero() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Eco-Friendly Services for Your Home & Garden
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Book professional services that prioritize sustainability and environmental responsibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#service-categories">
                <Button size="lg" className="font-medium">
                  Explore Services
                </Button>
              </Link>
              <Link href="/services/book">
                <Button size="lg" variant="outline" className="font-medium">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Service
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">25+</div>
                <div className="text-sm text-gray-500">Service Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-500">Eco-Friendly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-green-600/0 z-10" />
              <img
                src={`https://res.cloudinary.com/dc2mzcoqr/image/upload/v1748886048/Eco-Friendly_Services_for_Your_Home_Garden_rbsbc6.avif`}
                alt="Sustainable products"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 h-24 w-24 bg-green-100 rounded-full opacity-70" />
            <div className="absolute -bottom-8 -right-8 h-32 w-32 bg-green-100 rounded-full opacity-70" />
          </div>
        </div>
      </div>
    </section>
  )
}
