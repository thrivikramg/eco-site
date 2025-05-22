import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, ShieldCheck } from "lucide-react"

export default function PestControlHero() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
              <ShieldCheck className="mr-1 h-3 w-3" />
              100% Organic & Safe
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Organic Pest Control Services</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Effective pest management solutions that are safe for your family, pets, and the environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services/pest-control/book">
                <Button size="lg" className="font-medium">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Now
                </Button>
              </Link>
              <Link href="#pest-control-services">
                <Button size="lg" variant="outline" className="font-medium">
                  View Services
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Child & Pet Safe</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">No Chemicals</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Eco-Friendly</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Organic+Pest+Control"
                alt="Organic Pest Control"
                fill
                className="object-cover"
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
