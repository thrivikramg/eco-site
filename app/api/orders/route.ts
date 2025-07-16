import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/mongodb'
import { Order } from '@/models/order'

// GET /api/orders?userId=xxx
export async function GET(req: NextRequest) {
  try {
    await db()  // ✅ CALL the db function

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, orders }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST logic (already added before)
export async function POST(req: NextRequest) {
  try {
    await db()  // ✅ CALL the db function

    const body = await req.json()
    const {
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod
    } = body

    if (!userId || !items?.length || !totalAmount || !shippingAddress || !paymentMethod) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
    }

    const newOrder = await Order.create({
      userId,
      items,
      totalAmount,
      status: 'Pending',
      shippingAddress,
      paymentMethod
    })

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 })

  } catch (error: any) {
    console.error('Error placing order:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
