"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const tips = [
  {
    id: 1,
    title: "5 Ways to Reduce Your Carbon Footprint Today",
    description: "Simple daily habits that can make a big difference for our planet.",
    image: "/co2.jpg?height=200&width=300",
    category: "Sustainability",
    date: "Today",
  },
  {
    id: 2,
    title: "Indoor Plants That Purify Air Naturally",
    description: "Discover plants that improve air quality and add beauty to your home.",
    image: "/indoorplants.jpg?height=200&width=300",
    category: "Gardening",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "DIY Natural Cleaning Solutions",
    description: "Make your own eco-friendly cleaning products with common household items.",
    image: "/DIYnaturalclean.avif?height=200&width=300",
    category: "DIY",
    date: "2 days ago",
  },
  {
    id: 4,
    title: "Composting 101: Getting Started",
    description: "A beginner's guide to turning kitchen waste into garden gold.",
    image: "/composting.jpg?height=200&width=300",
    category: "Gardening",
    date: "3 days ago",
  },
  {
    id: 5,
    title: "Plastic-Free Food Storage Solutions",
    description: "Sustainable alternatives to plastic wrap and containers.",
    image: "/plasticfree.jpg?height=200&width=300",
    category: "Sustainability",
    date: "4 days ago",
  },
]

export default function DailyTips() {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  return (
    <section className="py-16 bg-gradient-to-r from-cream-50 to-cream-100 overflow-hidden">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-emerald-700" />
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">Daily Green Tips</h2>
            </div>
            <p className="text-emerald-800 mt-1">Eco-friendly advice to incorporate into your daily routine</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              className="gap-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
              onClick={() => router.push("/eco-library/tips")}
            >
              View All Tips
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <div className="relative" ref={containerRef}>
          <motion.div
            className="flex space-x-6 py-4"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...tips, ...tips].map((tip, index) => (
              <motion.div
                key={`${tip.id}-${index}`}
                className="flex-shrink-0 w-[300px]"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full overflow-hidden border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all duration-300 bg-white">
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={tip.image || "/placeholder.svg"}
                      alt={tip.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                        {tip.category}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-emerald-200">
                        {tip.date}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-lg line-clamp-1 text-emerald-900">{tip.title}</h3>
                    <p className="text-emerald-800 mt-1 text-sm line-clamp-2">{tip.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link
                      href="/eco-library/tips"
                      className="text-emerald-700 hover:text-emerald-800 text-sm font-medium inline-flex items-center gap-1 group"
                    >
                      Read more
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays for smooth scroll effect */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream-50 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream-100 to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}
