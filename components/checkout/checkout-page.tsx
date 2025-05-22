"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, CreditCard, Landmark, Truck, Wallet } from "lucide-react"
import AuthModal from "@/components/auth-modal"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPageClient() {
  const router = useRouter()
  const { cart, clearCart, totalPrice } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isClient, setIsClient] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  // Add debug info
  const addDebug = (message: string) => {
    console.log(message)
    setDebugInfo((prev) => [...prev, message])
  }

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true)
    addDebug("Component mounted, isClient set to true")
    addDebug(`Cart has ${cart?.length || 0} items`)
    addDebug(`User is ${user ? "logged in" : "not logged in"}`)
  }, [])

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "home",
    paymentMethod: "cod",
  })

  // Redirect if cart is empty
  useEffect(() => {
    if (isClient && (!cart || cart.length === 0)) {
      addDebug("Cart is empty, redirecting to cart page")
      router.push("/cart")
    }
  }, [cart, router, isClient])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.fullName.trim()) errors.fullName = "Name is required"
    if (!formData.phoneNumber.trim()) errors.phoneNumber = "Phone number is required"
    if (!formData.addressLine1.trim()) errors.addressLine1 = "Address is required"
    if (!formData.city.trim()) errors.city = "City is required"
    if (!formData.state.trim()) errors.state = "State is required"
    if (!formData.pincode.trim()) errors.pincode = "Pincode is required"
    else if (!/^\d{6}$/.test(formData.pincode)) errors.pincode = "Enter a valid 6-digit pincode"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handlePlaceOrder = () => {
    addDebug("Place order button clicked")

    // Check if user is logged in
    if (!user) {
      addDebug("User not logged in, showing auth modal")
      setIsAuthModalOpen(true)
      return
    }

    // Validate form
    if (!validateForm()) {
      addDebug("Form validation failed")
      Object.entries(formErrors).forEach(([field, error]) => {
        addDebug(`Validation error: ${field} - ${error}`)
      })

      toast({
        title: "Please check your information",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      })
      return
    }

    try {
      addDebug("Processing order...")
      setIsProcessing(true)

      // Check if cart is available
      if (!cart || cart.length === 0) {
        addDebug("Cart is empty, cannot place order")
        toast({
          title: "Your cart is empty",
          description: "Please add items to your cart before placing an order.",
          variant: "destructive",
        })
        setIsProcessing(false)
        return
      }

      // Create order object
      const orderId = `ECO-${Math.floor(100000 + Math.random() * 900000)}`
      addDebug(`Generated order ID: ${orderId}`)

      const order = {
        id: orderId,
        date: new Date().toISOString(),
        items: cart,
        totalAmount: totalPrice(),
        shippingAddress: {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          addressType: formData.addressType,
        },
        paymentMethod: formData.paymentMethod,
        status: "confirmed",
      }

      addDebug("Order object created")

      // Save order to localStorage (in a real app, this would be an API call)
      if (typeof window !== "undefined") {
        try {
          addDebug("Saving order to localStorage")
          const existingOrders = JSON.parse(localStorage.getItem("ecoGrowOrders") || "[]")
          localStorage.setItem("ecoGrowOrders", JSON.stringify([order, ...existingOrders]))
          addDebug("Order saved to localStorage successfully")
        } catch (storageError) {
          console.error("Error saving to localStorage:", storageError)
          addDebug(`Error saving to localStorage: ${storageError}`)
          toast({
            title: "Error saving order",
            description: "There was a problem saving your order. Please try again.",
            variant: "destructive",
          })
          setIsProcessing(false)
          return
        }
      }

      // Clear cart
      addDebug("Clearing cart")
      clearCart()
      addDebug("Cart cleared successfully")

      // Show success toast
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      })

      // Redirect to order confirmation page
      addDebug(`Redirecting to order confirmation page with orderId: ${orderId}`)
      setTimeout(() => {
        router.push(`/order-confirmation?orderId=${orderId}`)
      }, 1000)
    } catch (error) {
      console.error("Error placing order:", error)
      addDebug(`Error placing order: ${error}`)
      toast({
        title: "Error placing order",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "cod":
        return "Cash on Delivery"
      case "card":
        return "Credit/Debit Card"
      case "upi":
        return "UPI"
      case "netbanking":
        return "Net Banking"
      default:
        return method
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "cod":
        return <Wallet className="h-4 w-4" />
      case "card":
        return <CreditCard className="h-4 w-4" />
      case "upi":
        return <Wallet className="h-4 w-4" />
      case "netbanking":
        return <Landmark className="h-4 w-4" />
      default:
        return <Wallet className="h-4 w-4" />
    }
  }

  // Don't render anything on the server
  if (!isClient) {
    return null
  }

  return (
    <div className="container px-4 py-10 mx-auto">
      <div className="mb-6">
        <Link href="/cart" className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={formErrors.fullName ? "border-red-500" : ""}
                />
                {formErrors.fullName && <p className="text-red-500 text-sm">{formErrors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={formErrors.phoneNumber ? "border-red-500" : ""}
                />
                {formErrors.phoneNumber && <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="addressLine1">
                  Address Line 1 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className={formErrors.addressLine1 ? "border-red-500" : ""}
                />
                {formErrors.addressLine1 && <p className="text-red-500 text-sm">{formErrors.addressLine1}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={formErrors.city ? "border-red-500" : ""}
                />
                {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">
                  State <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={formErrors.state ? "border-red-500" : ""}
                />
                {formErrors.state && <p className="text-red-500 text-sm">{formErrors.state}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">
                  Pincode <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className={formErrors.pincode ? "border-red-500" : ""}
                />
                {formErrors.pincode && <p className="text-red-500 text-sm">{formErrors.pincode}</p>}
              </div>
            </div>

            <div className="mt-4">
              <Label className="mb-2 block">Address Type</Label>
              <RadioGroup
                value={formData.addressType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, addressType: value }))}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="home" id="home" />
                  <Label htmlFor="home" className="cursor-pointer">
                    Home
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="work" id="work" />
                  <Label htmlFor="work" className="cursor-pointer">
                    Work
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="cursor-pointer">
                    Other
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
              className="space-y-3"
            >
              {["cod", "card", "upi", "netbanking"].map((method) => (
                <div
                  key={method}
                  className="flex items-center space-x-3 border rounded-md p-3 cursor-pointer hover:bg-muted/50"
                >
                  <RadioGroupItem value={method} id={`payment-${method}`} />
                  <Label htmlFor={`payment-${method}`} className="flex items-center cursor-pointer w-full">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                      {getPaymentMethodIcon(method)}
                    </div>
                    <span>{getPaymentMethodLabel(method)}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-4">
              {cart && cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="font-medium text-emerald-600">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{totalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>₹{Math.round(totalPrice() * 0.18)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>₹{totalPrice() + Math.round(totalPrice() * 0.18)}</span>
            </div>

            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={isProcessing || !cart || cart.length === 0}
            >
              {isProcessing ? "Processing..." : "PLACE ORDER"}
            </Button>

            <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
              <Truck className="h-4 w-4 mr-2" />
              Free shipping on all orders
            </div>
          </div>
        </div>
      </div>

      {/* Debug info - only visible in development */}
      {process.env.NODE_ENV === "development" && debugInfo.length > 0 && (
        <div className="mt-8 p-4 border border-gray-300 rounded-md bg-gray-50">
          <h3 className="font-bold mb-2">Debug Info:</h3>
          <ul className="text-xs space-y-1">
            {debugInfo.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false)
          // After successful login, try placing order again
          setTimeout(() => handlePlaceOrder(), 500)
        }}
      />
    </div>
  )
}
