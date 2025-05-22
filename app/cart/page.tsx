import type { Metadata } from "next"
import CartPage from "@/components/cart/cart-page"

export const metadata: Metadata = {
  title: "Shopping Cart | EcoGrow",
  description: "View and manage items in your shopping cart",
}

export default function Cart() {
  return <CartPage />
}
