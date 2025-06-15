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
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {productCategories.map((category) => (
            <div 
              key={category.value} 
              onClick={() => handleCategoryClick(category.value)}
              className="cursor-pointer w-full"
            >
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow group border-2 border-transparent hover:border-primary">
                <div className="relative aspect-square w-full bg-green-100">
                  <Image
                    src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(category.label)}`}
                    alt={category.label}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <CardContent className="p-3 sm:p-4 text-center">
                  <h3 className="text-base sm:text-lg font-medium group-hover:text-primary transition-colors line-clamp-1">
                    {category.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {category.count} {category.count === 1 ? 'product' : 'products'}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
