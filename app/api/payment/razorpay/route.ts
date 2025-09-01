import { NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { amount, currency } = body

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
