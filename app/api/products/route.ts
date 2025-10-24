import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/products";

export async function GET() {
  try {
    return NextResponse.json(mockProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
