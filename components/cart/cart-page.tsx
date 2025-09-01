'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Loader2, ShoppingBag, Trash2, ShieldCheck } from "lucide-react"
import CartEmpty from "./cart-empty"
import AuthModal from "@/components/auth-modal"

export default function CartPage() {
  const router = useRouter()
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const { toast } = useToast()
  const { isAuthenticated, user } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [showAuthModalState, setShowAuthModalState] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartItems = mounted ? cart || [] : []
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = couponApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 0 ? (subtotal > 1000 ? 0 : 100) : 0
  const tax = (subtotal - discount) * 0.05
  const total = subtotal - discount + shipping + tax

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    if (newQuantity > 10) {
      toast({
        title: "Maximum quantity reached",
        description: "You can only order up to 10 units of each item",
        variant: "destructive",
      })
      return
    }
    updateQuantity(id, newQuantity)
  }

  const handleCouponApply = () => {
    if (couponCode.toLowerCase() === "eco10") {
      setCouponApplied(true)
      toast({
        title: "Coupon applied",
        description: "10% discount has been applied to your order.",
      })
    } else {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired.",
        variant: "destructive",
      })
    }
  }

const handleRazorpayPayment = async () => {
  if (!isAuthenticated || !user) {
    setShowAuthModalState(true)
    return
  }

  setIsProcessing(true)

  try {
    const res = await fetch("/api/payment/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total, // amount in rupees
        currency: "INR",
        userId: user.id,
      }),
    })

    const data = await res.json()

    if (!data || !data.id) {
      throw new Error("Invalid order response")
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: data.amount,
      currency: "INR",
      name: "EcoGrow",
      description: "Order Payment",
      order_id: data.id,
      handler: async function (response: any) {
        // ✅ Create order in DB
        const orderRes = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            items: cartItems.map((item) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image || "",
            })),
            totalAmount: total,
            shippingAddress: user.addresses?.[0] || {
              street: "Unknown",
              city: "Unknown",
              state: "Unknown",
              postalCode: "000000",
              country: "India",
            },
            paymentMethod: "Razorpay",
            razorpayPaymentId: response.razorpay_payment_id,
          }),
        })

        const result = await orderRes.json()

        if (result.success) {
          toast({
            title: "Payment Success!",
            description: "Your order has been placed.",
          })
          clearCart()
          router.push("/profile")
        } else {
          throw new Error("Order creation failed")
        }
      },
      prefill: {
        name: user.name || "",
        email: user.email || "",
        contact: user.phone || "",
      },
      theme: {
        color: "#34d399",
      },
    }

    const razor = new (window as any).Razorpay(options)
    razor.open()
  } catch (error) {
    console.error("Payment error:", error)
    toast({
      title: "Payment Failed",
      description: "Something went wrong during payment.",
      variant: "destructive",
    })
  } finally {
    setIsProcessing(false)
  }
}


  if (!mounted) return null
  if (cartItems.length === 0) return <CartEmpty />

  return (
    <div className="container px-4 py-10 mx-auto max-w-7xl">
      {showAuthModalState && (
        <AuthModal
          open={showAuthModalState}
          onOpenChange={(open) => setShowAuthModalState(open)}
          onSuccess={() => {
            setShowAuthModalState(false)
            handleRazorpayPayment()
          }}
        />
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Cart Items */}
        <div className="w-full md:w-3/4">
          <div className="rounded-lg border shadow-sm mb-6">
            <div className="bg-primary text-white p-4 rounded-t-lg">
              <h1 className="text-xl font-bold">My Cart ({cartItems.length})</h1>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-4 border-b">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden border bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex flex-col flex-1 gap-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center">
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                            -
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            max="10"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)
                            }
                            className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                            +
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>

                    <div className="text-right font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" asChild className="gap-2">
                  <Link href="/shop">
                    <ShoppingBag className="h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>

                <Button variant="outline" size="sm" onClick={clearCart} className="text-sm">
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Price Summary */}
        <div className="w-full md:w-1/4">
          <div className="rounded-lg border shadow-sm sticky top-24">
            <div className="bg-muted p-4 rounded-t-lg">
              <h2 className="text-lg font-semibold">Price Details</h2>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              {couponApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className={shipping === 0 ? "text-green-600" : ""}>
                  {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              {couponApplied && (
                <div className="text-green-600 text-sm">
                  You will save ₹{discount.toFixed(2)} on this order
                </div>
              )}

              {/* Coupon input */}
              <div className="mt-4 flex items-center gap-2 mb-4">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                />
                <Button
                  variant="outline"
                  onClick={handleCouponApply}
                  disabled={couponApplied || !couponCode}
                  className="whitespace-nowrap"
                >
                  Apply
                </Button>
              </div>

              {/* PLACE ORDER button */}
              <Button
                onClick={handleRazorpayPayment}
                disabled={isProcessing}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "PLACE ORDER"
                )}
              </Button>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
