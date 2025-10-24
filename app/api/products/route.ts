import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { Product } from "@/models/product";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sellerId = searchParams.get("sellerId");
  const featured = searchParams.get("featured");
  const category = searchParams.get("category");

  try {
    await connectToDatabase();
    let query: any = {};
    if (sellerId) {
      query.seller = sellerId;
    }
    if (featured) {
      query.isFeatured = true;
    }
    if (category) {
      query.category = category;
    }
    const products = await Product.find(query);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
