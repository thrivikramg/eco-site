export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"

export type OrderItem = {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

export type Order = {
  _id?: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  shippingAddress: {
    name: string
    phone: string
    street: string
    city: string
    state: string
    pincode: string
    country: string
  }
  paymentMethod: "COD" | "Card" | "UPI"
  createdAt?: Date
  updatedAt?: Date
}
