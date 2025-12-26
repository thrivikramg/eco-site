import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import db from "../../../../lib/mongodb";
import { Vendor } from "../../../../models/vendor";
import { User } from "../../../../models/user"; // Assuming User model might be needed

export async function GET(req: Request) {
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

    return NextResponse.json(vendor);
  } catch (error) {
    console.error("Error fetching store settings:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

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

    const body = await req.json();

    // Update vendor document with the new data
    await Vendor.updateOne({ _id: vendor._id }, { $set: body });

    return NextResponse.json({ message: "Store settings updated successfully." }, { status: 200 });

  } catch (error) {
    console.error("Error updating store settings:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
