import mongoose, { Schema, Document } from "mongoose"

export interface IOrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface IOrder extends Document {
  userId: string
  items: IOrderItem[]
  totalAmount: number
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
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
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema: Schema<IOrderItem> = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: String,
})

const OrderSchema: Schema<IOrder> = new Schema(
  {
    userId: { type: String, required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    shippingAddress: {
      name: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Card", "UPI"],
      default: "COD",
    },
  },
  { timestamps: true }
)

export const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)
