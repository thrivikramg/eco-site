import { NextResponse } from "next/server"
import db from "@/lib/mongodb"
import { Product } from "@/models/product.model"
import { Types } from "mongoose"

const DUMMY_VENDOR_ID = "671b4ac9a74f4a2354a616e3"

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    await db()
    const { id } = context.params

    const product = await Product.findOne({
      _id: new Types.ObjectId(id),
      vendor: new Types.ObjectId(DUMMY_VENDOR_ID),
    })

    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    await db()
    const { id } = context.params
    const updates = await req.json()

    const updated = await Product.findOneAndUpdate(
      { _id: new Types.ObjectId(id), vendor: new Types.ObjectId(DUMMY_VENDOR_ID) },
      { $set: updates },
      { new: true }
    )

    if (!updated) return NextResponse.json({ error: "Product not found" }, { status: 404 })
    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    await db()
    const { id } = context.params

    const deleted = await Product.findOneAndDelete({
      _id: new Types.ObjectId(id),
      vendor: new Types.ObjectId(DUMMY_VENDOR_ID),
    })

    if (!deleted) return NextResponse.json({ error: "Product not found" }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
