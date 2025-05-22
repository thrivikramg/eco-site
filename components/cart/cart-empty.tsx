import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CartEmpty() {
  return (
    <div className="container py-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <ShoppingCart className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love!
      </p>
      <Button asChild size="lg">
        <Link href="/shop">Browse Products</Link>
      </Button>
    </div>
  )
}
