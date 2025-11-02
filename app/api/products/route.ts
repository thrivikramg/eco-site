
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import db from "../../../lib/mongodb";
import { Product } from "../../../models/product.model";
import { Vendor } from "../../../models/vendor";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || (session.user as any).role !== "vendor") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await db();

  try {
    const vendor = await Vendor.findOne({ user: session.user.id });

    if (!vendor) {
      return NextResponse.json({ message: "Vendor profile not found for this user." }, { status: 404 });
    }

    // const { payoutDetails } = vendor;
    // if (
    //   !payoutDetails ||
    //   !payoutDetails.accountHolder ||
    //   !payoutDetails.accountNumber ||
    //   !payoutDetails.bankName ||
    //   !payoutDetails.ifscCode
    // ) {
    //   return NextResponse.json({ message: 'Please complete your banking information in the store settings before adding products.' }, { status: 403 });
    // }

    const body = await req.json();
    const { name, description, price, category, stock, images } = body;

    const product = await Product.create({
      vendor: vendor._id,
      name,
      description,
      price,
      category,
      stock,
      images,
    });

    vendor.products.push(product._id);
    await vendor.save();

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  await db();

  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');

    if (role === 'vendor') {
      const session = await getServerSession(authOptions);
      if (!session || !session.user || (session.user as any).role !== "vendor") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const vendor = await Vendor.findOne({ user: session.user.id });
      if (!vendor) {
        return NextResponse.json({ message: "Vendor profile not found for this user." }, { status: 404 });
      }
      const products = await Product.find({ vendor: vendor._id });
      return NextResponse.json(products);
    }

    // Default behavior: return all products for buyer-facing pages
    const products = await Product.find({});

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
