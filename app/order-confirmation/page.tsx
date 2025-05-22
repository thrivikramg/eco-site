import { Suspense } from "react"
import OrderDetails from "@/components/order-confirmation/order-details"
import { Skeleton } from "@/components/ui/skeleton"

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationSkeleton />}>
      <OrderDetails />
    </Suspense>
  )
}

function OrderConfirmationSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Skeleton className="h-12 w-64 mb-6" />
        <div className="space-y-8">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="flex justify-center space-x-4">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    </div>
  )
}
