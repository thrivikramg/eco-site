
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import  db from "../../../../lib/dbconnect";
import { Product } from "../../../../models/product.model";
import { User } from "../../../../models/user";
import { Vendor } from "../../../../models/vendor";
import { IUser } from "../../../../models/user";

interface IParams {
  params: { productId: string };
}

export async function GET(req: Request, { params }: IParams) {
  // const session = await getServerSession(authOptions);

  // if (!session || !session.user || (session.user as IUser).role !== "vendor") {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  await db();

  try {
    // TEMP: Use a dummy vendor for development
    let vendor = await Vendor.findOne();
    if (!vendor) {
      const dummyUser = await User.create({
        name: 'Dummy Vendor',
        email: `dummyvendor@example.com`,
        role: 'vendor',
      });
      vendor = await Vendor.create({
        user: dummyUser._id,
        businessName: 'Dummy Store',
      });
    }
    if (!vendor) {
      return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
    }

    const product = await Product.findOne({
      _id: params.productId,
      vendor: vendor._id,
    });

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
  // const session = await getServerSession(authOptions);

  // if (!session || !session.user || (session.user as IUser).role !== "vendor") {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  await db();

  try {
    // TEMP: Use a dummy vendor for development
    let vendor = await Vendor.findOne();
    if (!vendor) {
      const dummyUser = await User.create({
        name: 'Dummy Vendor',
        email: `dummyvendor@example.com`,
        role: 'vendor',
      });
      vendor = await Vendor.create({
        user: dummyUser._id,
        businessName: 'Dummy Store',
      });
    }
    if (!vendor) {
      return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
    }

    const { bankDetails } = vendor;
    if (
      !bankDetails ||
      !bankDetails.accountHolder ||
      !bankDetails.accountNumber ||
      !bankDetails.bankName ||
      !bankDetails.ifsc
    ) {
      return NextResponse.json({ message: 'Please complete your banking information in the store settings before updating products.' }, { status: 403 });
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
  // const session = await getServerSession(authOptions);

  // if (!session || !session.user || (session.user as IUser).role !== "vendor") {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  await db();

  try {
    // TEMP: Use a dummy vendor for development
    let vendor = await Vendor.findOne();
    if (!vendor) {
      const dummyUser = await User.create({
        name: 'Dummy Vendor',
        email: `dummyvendor@example.com`,
        role: 'vendor',
      });
      vendor = await Vendor.create({
        user: dummyUser._id,
        businessName: 'Dummy Store',
      });
    }
    if (!vendor) {
      return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
    }

    const { bankDetails } = vendor;
    if (
      !bankDetails ||
      !bankDetails.accountHolder ||
      !bankDetails.accountNumber ||
      !bankDetails.bankName ||
      !bankDetails.ifsc
    ) {
      return NextResponse.json({ message: 'Please complete your banking information in the store settings before deleting products.' }, { status: 403 });
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
