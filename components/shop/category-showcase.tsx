"use client"

import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "../../components/ui/card"
import { productCategories } from "../../lib/products"

export default function CategoryShowcase() {
  const router = useRouter()
  const pathname = usePathname()

  const handleCategoryClick = (categoryValue: string) => {
    const searchParams = new URLSearchParams()
    searchParams.set("category", categoryValue)
    router.push(`${pathname}?${searchParams.toString()}`)
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCategories.map((category) => (
            <div 
              key={category.value} 
              onClick={() => handleCategoryClick(category.value)}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow group">
                <div className="relative h-48 w-full bg-green-100">
                  <Image
                    src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(category.label)}`}
                    alt={category.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-lg font-medium group-hover:text-primary transition-colors">{category.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{category.count} products</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
