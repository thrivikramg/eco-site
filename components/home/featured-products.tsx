"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

// Mock products data - expanded for better scrolling effect
const products = [
  {
    id: "1",
    name: "Organic Plant Food",
    price: 12.99,
    category: "Agro Products",
    image: "/Organic Plant Food.webp",
    isNew: true,
  },
  {
    id: "2",
    name: "Bamboo Toothbrush Set",
    price: 8.49,
    category: "Eco-Friendly",
    image: "/bamboo toothbrush set.webp?height=400&width=400",
    isNew: false,
  },
  {
    id: "3",
    name: "Herbal Hair Oil",
    price: 15.99,
    category: "Herbal Products",
    image: "/herbal hair oil.webp?height=400&width=400",
    isNew: true,
  },
  {
    id: "4",
    name: "Aloe Vera Gel",
    price: 9.99,
    category: "Cosmetics",
    image: "/alovera-gel.jpg?height=400&width=400",
    isNew: false,
  },
  {
    id: "5",
    name: "Reusable Produce Bags",
    price: 6.99,
    category: "Eco-Friendly",
    image: "/reusable bags.jpg?height=400&width=400",
    isNew: true,
  },
  {
    id: "6",
    name: "Neem Face Wash",
    price: 11.49,
    category: "Cosmetics",
    image: "/neem face wash.webp?height=400&width=400",
    isNew: false,
  },
  {
    id: "7",
    name: "Organic Seeds Pack",
    price: 7.99,
    category: "Agro Products",
    image: "/seeds.jpg?height=400&width=400",
    isNew: true,
  },
  {
    id: "8",
    name: "Eco-Friendly Detergent",
    price: 14.99,
    category: "Home Care",
    image: "/detergent.webp?height=400&width=400",
    isNew: false,
  },
]

export default function FeaturedProducts() {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const scrollSpeed = 1.5 // Increased speed for more noticeable scrolling

  const handleAddToCart = (product: (typeof products)[0], e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  // Duplicate products array to create a seamless loop
  const duplicatedProducts = [...products, ...products, ...products] // Triple the products for more content

  // Auto-scrolling animation with simplified approach
  useEffect(() => {
    if (!scrollRef.current) return

    let animationId: number
    let startTime: number | null = null

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      if (!isPaused && scrollRef.current) {
        // Calculate the scroll position
        const scrollContainer = scrollRef.current
        const scrollPosition = scrollContainer.scrollLeft
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth

        // If we're near the end, jump back to start (for seamless loop)
        if (scrollPosition >= maxScroll / 2) {
          scrollContainer.scrollLeft = 0
        } else {
          // Otherwise continue scrolling
          scrollContainer.scrollLeft += scrollSpeed
        }
      }

      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPaused, scrollSpeed])

  return (
    <section className="py-16 bg-cream-50 overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-emerald-900 sm:text-4xl">Our Best Sellers</h2>
            <p className="mt-4 text-lg text-emerald-800">Discover our most popular eco-friendly products</p>
          </div>
          <Link href="/shop">
            <Button
              variant="outline"
              className="mt-4 md:mt-0 group border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Full width scrolling container outside of the main container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient overlays for smooth scroll effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cream-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream-50 to-transparent z-10 pointer-events-none"></div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide gap-6 pb-6 px-8 no-scrollbar"
          style={{ scrollBehavior: "auto" }} // Changed to auto for smoother programmatic scrolling
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedProducts.map((product, index) => (
            <Card
              key={`${product.id}-${index}`}
              className="overflow-hidden group flex-shrink-0 w-[280px] transition-all duration-300 hover:shadow-lg border border-emerald-200 hover:border-emerald-400 bg-white"
            >
              <Link href={`/shop/product/${product.id}`} className="block">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {product.isNew && <Badge className="absolute top-2 right-2 bg-emerald-600 text-white">New</Badge>}
                </div>

                <CardContent className="pt-6">
                  <div className="text-sm text-emerald-700 mb-1">{product.category}</div>
                  <h3 className="font-medium text-lg text-emerald-900">{product.name}</h3>
                  <p className="font-semibold mt-2 text-emerald-800">₹{product.price.toFixed(2)}</p>
                </CardContent>

                <CardFooter className="flex justify-between border-t border-emerald-100 p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full group text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50"
                  >
                    <span>View Details</span>
                    <ArrowRight className="ml-0 h-4 w-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="sm"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <ShoppingCart className="h-4 w-2 mr-0" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
