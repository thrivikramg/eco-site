import { NextResponse } from "next/server";
import { mockProducts } from "@/lib/products";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = mockProducts.find((p) => p.id === params.id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
