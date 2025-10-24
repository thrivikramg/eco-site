import { Suspense } from "react";
import type { Metadata } from "next";
import CategoryShowcase from "../../components/shop/category-showcase";
import ProductsLayout from "../../components/shop/products-layout";
import { Skeleton } from "../../components/ui/skeleton";
import { getProductCategories } from "../../lib/products";

export const metadata: Metadata = {
  title: "Shop All Products | EcoGrow",
  description: "Browse our collection of sustainable and eco-friendly products for a greener lifestyle.",
};

export default async function ShopPage() {
  const categories = await getProductCategories();

  return (
    <>
      <CategoryShowcase categories={categories} />
      <Suspense fallback={<ProductsLayoutSkeleton />}>
        <ProductsLayout />
      </Suspense>
    </>
  );
}

function ProductsLayoutSkeleton() {
  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <Skeleton className="h-10 w-full md:max-w-sm" />
          <Skeleton className="h-10 w-48" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Filters skeleton */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Skeleton className="h-[600px] w-full" />
        </div>

        {/* Products grid skeleton */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
