import db from "../../../lib/mongodb"; // Your MongoDB connection utility
import { Product } from "../../../models/product.model"; // Your Mongoose Product model
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // 1. Ensure the database connection is established.
    await db();

    // 2. Use the Product model to find all documents in the collection.
    const products = await Product.find({});

    // 3. Return the fetched products as a JSON response.
    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

