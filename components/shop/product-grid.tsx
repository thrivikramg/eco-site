"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Card, CardContent, CardFooter } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Skeleton } from "../../components/ui/skeleton"
import { useCart } from "../../components/cart-provider"
import { useToast } from "../../hooks/use-toast"
import { Product } from "@/lib/products"

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
  initialLoad?: boolean
}

export default function ProductGrid({ products, isLoading, initialLoad = false }: ProductGridProps) {
  const [mounted, setMounted] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = (product: Product) => {
    try {
      if (!addToCart) {
        console.error("addToCart function is not available")
        toast({
          title: "Error",
          description: "Could not add item to cart. Please try again.",
          variant: "destructive",
        })
        return
      }

      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images?.[0] || "/placeholder.svg",
      })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      console.error("Error adding item to cart:", error)
      toast({
        title: "Error",
        description: "Could not add item to cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Show loading skeletons during initial load or when loading
  if (isLoading || !mounted || initialLoad) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
      ))}
    </div>
  )
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col border border-gray-100 hover:border-primary/20 transition-colors">
      <Link href={`/shop/product/${product._id}`} className="relative block">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
          <Image
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </div>
      </Link>

      <CardContent className="p-3 sm:p-4 flex-grow">
        <div className="text-xs sm:text-sm text-primary mb-0.5 line-clamp-1">{product.category}</div>
        <Link href={`/shop/product/${product._id}`} className="group-hover:text-primary transition-colors">
          <h3 className="font-medium text-sm sm:text-base lg:text-lg leading-tight line-clamp-2 h-10 sm:h-12 overflow-hidden">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 sm:mt-2 space-y-0.5">
          <div className="flex items-center flex-wrap gap-x-2">
            <p className="font-semibold text-base sm:text-lg text-primary">
              ₹{product.price.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t p-2 sm:p-3 mt-auto">
        <Button 
          className="w-full h-9 sm:h-10 text-xs sm:text-sm" 
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
          size="sm" 
        >
          <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col border border-gray-100">
      <div className="relative aspect-square w-full bg-gray-100 animate-pulse" />
      <CardContent className="p-3 sm:p-4 flex-grow space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-3 rounded-full" />
          ))}
          <Skeleton className="h-3 w-6 ml-1" />
        </div>
        <Skeleton className="h-5 w-20 mt-1" />
      </CardContent>
      <CardFooter className="border-t p-2 sm:p-3 mt-auto">
        <Skeleton className="h-9 w-full rounded-md" />
      </CardFooter>
    </Card>
  )
}
