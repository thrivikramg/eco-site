import { NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"
import { z } from "zod"

const paymentSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().length(3, "Currency must be 3 characters"),
})

export async function POST(req: NextRequest) {
  const body = await req.json()

  const validationResult = paymentSchema.safeParse(body)
  if (!validationResult.success) {
    return NextResponse.json({ message: "Validation Error", errors: validationResult.error.format() }, { status: 400 })
  }

  const { amount, currency } = validationResult.data

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    const payment = await razorpay.orders.create({
      amount: amount * 100, // ₹ to paise
      currency,
      receipt: `receipt_${Math.random()}`,
    })

    return NextResponse.json(payment)
  } catch (error) {
    console.error("Razorpay error:", error)
    return new NextResponse("Failed to create Razorpay order", { status: 500 })
  }
}
