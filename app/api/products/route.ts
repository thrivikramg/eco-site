
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import  db from "../../../lib/dbconnect";
import { Product } from "../../../models/product.model";
import { User } from "../../../models/user";
import { Vendor } from "../../../models/vendor";
import { IUser } from "../../../models/user";

export async function POST(req: Request) {
  // TEMP: Bypass auth for development
  // const session = await getServerSession(authOptions);

  // if (!session || !session.user || (session.user as IUser).role !== "vendor") {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  await db();

  try {
    let vendor = await Vendor.findOne();

    if (!vendor) {
      const dummyUser = await User.create({
        name: 'Dummy Vendor',
        email: `dummyvendor@example.com`,
        password: 'password',
        role: 'vendor',
      });
      vendor = await Vendor.create({
        user: dummyUser._id,
        storeName: 'Dummy Store',
      });
    }

    const { bankDetails } = vendor;
    if (
      !bankDetails ||
      !bankDetails.accountHolder ||
      !bankDetails.accountNumber ||
      !bankDetails.bankName ||
      !bankDetails.ifsc
    ) {
      return NextResponse.json({ message: 'Please complete your banking information in the store settings before adding products.' }, { status: 403 });
    }

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
  // TEMP: Bypass auth for development
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user || (session.user as IUser).role !== "vendor") {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  await db();

  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');

    if (role === 'vendor') {
      let vendor = await Vendor.findOne();
      if (!vendor) {
        // Create dummy vendor if none exists
        const dummyUser = await User.create({ name: 'Dummy Vendor', email: `dummyvendor@example.com`, role: 'vendor' });
        vendor = await Vendor.create({ user: dummyUser._id, businessName: 'Dummy Store' });
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
