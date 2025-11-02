import db from "@/lib/mongodb"
import { Product } from "@/models/product.model"
import { NextResponse } from "next/server"

// GET /api/shop/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Connect to MongoDB
    await db()

    // 2. Extract product ID from the dynamic route
    const { id } = params

    // 3. Fetch the product by ID using the Mongoose model
    const product = await Product.findById(id)

    // 4. Handle if not found
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // 5. Return the product data as JSON
    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    console.error("[PRODUCT_GET_BY_ID]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
