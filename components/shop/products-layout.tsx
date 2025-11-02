"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import ProductGrid from "./product-grid"
import ProductFilters from "./product-filters"
import ProductsHeader from "./products-header"
import { Button } from "../../components/ui/button"
import { SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"
import { ScrollArea } from "../../components/ui/scroll-area"
import { useToast } from "../../hooks/use-toast"
import { useMobile } from "../../hooks/use-mobile"
import { type Product, type Category, productCategories } from "../../lib/products"

export default function ProductsLayout({ initialProducts }: { initialProducts: Product[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const isMobile = useMobile()

  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Get query parameters
  const categoryParam = searchParams.get("category")
  const subcategoryParam = searchParams.get("subcategory")
  const searchQuery = searchParams.get("q") || ""
  const sortOption = searchParams.get("sort") || "featured"

  // State for tracking if products are initially loaded
  const [initialLoad, setInitialLoad] = useState(true)

  // Fetch products
  // Products are now passed as a prop, so we can remove the client-side fetch.
  useEffect(() => {
    setIsLoading(false);
    setInitialLoad(false);
  }, []);

  // Filter and sort products
  useEffect(() => {
    if (products.length === 0) return
    
    console.log('Filtering products with params:', { 
      categoryParam, 
      subcategoryParam,
      productsCount: products.length 
    })

    let result = [...products]
    
    // Filter by category - make sure to normalize case
    if (categoryParam) {
      // Get the actual category label based on the value in URL param
      const selectedCategory = productCategories.find(
        cat => cat.value.toLowerCase() === categoryParam.toLowerCase()
      )
      
      if (selectedCategory) {
        console.log(`Filtering by category: ${selectedCategory.label}`)
        result = result.filter((product) => 
          product.category.toLowerCase() === selectedCategory.label.toLowerCase()
        )
        console.log(`Found ${result.length} products after category filtering`)
      }
    }

    // Filter by subcategory only if subcategory is selected
    if (subcategoryParam) {
      // Get all categories and find the matching subcategory
      let subcategoryLabel = ''
      
      for (const category of productCategories) {
        const foundSubcategory = category.subcategories.find(
          sub => sub.value.toLowerCase() === subcategoryParam.toLowerCase()
        )
        if (foundSubcategory) {
          subcategoryLabel = foundSubcategory.label
          break
        }
      }
      
      if (subcategoryLabel) {
        console.log(`Filtering by subcategory: ${subcategoryLabel}`)
        result = result.filter((product) => 
          product.category.toLowerCase() === subcategoryLabel.toLowerCase()
        )
        console.log(`Found ${result.length} products after subcategory filtering`)
      }
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Sort products
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        // 'featured' is default, products are already sorted by featured
        break
    }

    setFilteredProducts(result)
  }, [products, categoryParam, subcategoryParam, searchQuery, sortOption])

  // Update URL with filters
  const updateFilters = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    // Update search params
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, value)
      }
    })

    router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  // Clear all filters
  const clearFilters = () => {
    router.push(pathname)
    setMobileFiltersOpen(false)
  }

  // Check if any filters are applied
  const hasFilters = categoryParam || subcategoryParam || searchQuery || sortOption !== "featured"

  // Get page title based on filters
  const getPageTitle = () => {
    if (categoryParam) {
      const category = productCategories.find((c: Category) => c.value === categoryParam)
      return category ? `${category.label} Products` : "All Products"
    }
    return "All Products"
  }

  return (
    <div className="container px-4 py-6 sm:py-8 md:py-12">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{getPageTitle()}</h1>
      <ProductsHeader
        totalProducts={filteredProducts.length}
        searchQuery={searchQuery}
        onSearch={(query) => updateFilters({ q: query || null })}
        sortOption={sortOption}
        onSortChange={(option) => updateFilters({ sort: option })}
      />

      <div className="flex flex-col md:flex-row gap-6 mt-6 sm:mt-8">
        {/* Mobile filters */}
        {isMobile && (
          <div className="flex items-center justify-between mb-4">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 text-sm">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {hasFilters && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                      {[categoryParam, subcategoryParam].filter(Boolean).length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-sm p-0">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      disabled={!hasFilters}
                      className="text-sm text-primary hover:bg-transparent hover:underline"
                    >
                      Clear all
                    </Button>
                  </div>
                  <ScrollArea className="flex-1 px-6 py-4">
                    <ProductFilters
                      selectedCategory={categoryParam || ''}
                      selectedSubcategory={subcategoryParam || ''}
                      onCategoryChange={(category: string) => updateFilters({ category: category || null })}
                      onSubcategoryChange={(subcategory: string) => updateFilters({ subcategory: subcategory || null })}
                    />
                  </ScrollArea>
                  <div className="border-t p-4">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      Show {filteredProducts.length} products
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm text-primary hover:bg-transparent hover:underline"
              >
                Clear all
              </Button>
            )}
          </div>
        )}

        {/* Desktop filters */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-sm text-primary hover:bg-transparent hover:underline"
                >
                  Clear all
                </Button>
              )}
            </div>
            <ProductFilters
              selectedCategory={categoryParam || ''}
              selectedSubcategory={subcategoryParam || ''}
              onCategoryChange={(category: string) => updateFilters({ category: category || null })}
              onSubcategoryChange={(subcategory: string) => updateFilters({ subcategory: subcategory || null })}
            />
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1">
          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading}
            initialLoad={initialLoad}
          />
        </div>
      </div>
    </div>
  )
}
