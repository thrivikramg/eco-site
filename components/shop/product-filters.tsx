import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { productCategories } from "@/lib/products"

interface ProductFiltersProps {
  selectedCategory: string
  selectedSubcategory: string
  onCategoryChange: (category: string) => void
  onSubcategoryChange: (subcategory: string) => void
}

export default function ProductFilters({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}: ProductFiltersProps) {
  // Get subcategories for the selected category
  const subcategories = selectedCategory
    ? productCategories.find((cat) => cat.value === selectedCategory)?.subcategories || []
    : []

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Categories</h3>
        <div className="space-y-3">
          {productCategories.map((category) => (
            <div key={category.value} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.value}`}
                checked={selectedCategory === category.value}
                onCheckedChange={() => {
                  if (selectedCategory === category.value) {
                    onCategoryChange("")
                  } else {
                    onCategoryChange(category.value)
                  }
                }}
              />
              <Label
                htmlFor={`category-${category.value}`}
                className="flex items-center justify-between w-full text-sm font-normal cursor-pointer"
              >
                <span>{category.label}</span>
                <Badge variant="outline" className="ml-auto">
                  {category.count}
                </Badge>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory && subcategories.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3">Subcategories</h3>
          <div className="space-y-3">
            {subcategories.map((subcategory) => (
              <div key={subcategory.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`subcategory-${subcategory.value}`}
                  checked={selectedSubcategory === subcategory.value}
                  onCheckedChange={() => {
                    if (selectedSubcategory === subcategory.value) {
                      onSubcategoryChange("")
                    } else {
                      onSubcategoryChange(subcategory.value)
                    }
                  }}
                />
                <Label
                  htmlFor={`subcategory-${subcategory.value}`}
                  className="flex items-center justify-between w-full text-sm font-normal cursor-pointer"
                >
                  <span>{subcategory.label}</span>
                  <Badge variant="outline" className="ml-auto">
                    {subcategory.count}
                  </Badge>
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="price-under-10" />
                <Label htmlFor="price-under-10" className="text-sm font-normal cursor-pointer">
                  Under ₹500
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-10-25" />
                <Label htmlFor="price-10-25" className="text-sm font-normal cursor-pointer">
                  ₹500 - ₹1,000
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-25-50" />
                <Label htmlFor="price-25-50" className="text-sm font-normal cursor-pointer">
                  ₹1,000 - ₹2,000
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-50-100" />
                <Label htmlFor="price-50-100" className="text-sm font-normal cursor-pointer">
                  ₹2,000 - ₹5,000
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="price-over-100" />
                <Label htmlFor="price-over-100" className="text-sm font-normal cursor-pointer">
                  Over ₹5,000
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ratings">
          <AccordionTrigger className="text-sm font-medium">Ratings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-4-up" />
                <Label htmlFor="rating-4-up" className="text-sm font-normal cursor-pointer">
                  4 Stars & Up
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-3-up" />
                <Label htmlFor="rating-3-up" className="text-sm font-normal cursor-pointer">
                  3 Stars & Up
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-2-up" />
                <Label htmlFor="rating-2-up" className="text-sm font-normal cursor-pointer">
                  2 Stars & Up
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rating-1-up" />
                <Label htmlFor="rating-1-up" className="text-sm font-normal cursor-pointer">
                  1 Star & Up
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger className="text-sm font-medium">Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" />
                <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                  In Stock
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="out-of-stock" />
                <Label htmlFor="out-of-stock" className="text-sm font-normal cursor-pointer">
                  Out of Stock
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
