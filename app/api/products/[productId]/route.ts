
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "../../../../lib/mongodb";
import { Product } from "@/models/product.model";
import { Vendor } from "../../../../models/vendor";

interface IParams {
  params: { productId: string };
}

export async function GET(req: Request, { params }: IParams) {
  await db();

  try {
    // This endpoint is public for customers to view product details.
    // We find the product directly by its ID.
    const product = await Product.findById(params.productId);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: IParams) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || (session.user as any).role !== "vendor") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await db();

  try {
    const vendor = await Vendor.findOne({ user: session.user.id });
    if (!vendor) {
      return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
    }

    const body = await req.json();
    const { name, description, price, category, stock, images } = body;

    const product = await Product.findOneAndUpdate(
      { _id: params.productId, vendor: vendor._id },
      { name, description, price, category, stock, images },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: IParams) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || (session.user as any).role !== "vendor") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await db();

  try {
    const vendor = await Vendor.findOne({ user: session.user.id });
    if (!vendor) {
      return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
    }

    const product = await Product.findOneAndDelete({
      _id: params.productId,
      vendor: vendor._id,
    });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    await Vendor.updateOne(
      { _id: vendor._id },
      { $pull: { products: product._id } }
    );

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
