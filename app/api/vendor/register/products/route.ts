import { NextResponse } from "next/server"
import db from "@/lib/mongodb"
import { Product } from "@/models/product.model"
import { Types } from "mongoose"

const DUMMY_VENDOR_ID = "671b4ac9a74f4a2354a616e3"

export async function GET() {
  try {
    await db()
    const products = await Product.find({ vendor: new Types.ObjectId(DUMMY_VENDOR_ID) })
    return NextResponse.json(products || [])
  } catch (error) {
    console.error("Error fetching vendor products:", error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await db()
    const body = await request.json()
    const { name, description, price, category, stock, images } = body

    if (!name || !description || !price || !category)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })

    const product = await Product.create({
      vendor: new Types.ObjectId(DUMMY_VENDOR_ID),
      name,
      description,
      price,
      category,
      stock,
      images: images || [],
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
