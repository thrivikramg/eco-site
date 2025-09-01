import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/mongodb"
import { Order } from "@/models/order"

export async function GET(req: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    await db()

    const order = await Order.findById(params.orderId)

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, order })
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
