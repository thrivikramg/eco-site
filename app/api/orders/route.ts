import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import db from "../../../lib/mongodb";
import { Order } from "../../../models/order.model";
import { Vendor } from "../../../models/vendor";

/**
 * GET /api/orders
 * Gets all orders for the currently authenticated vendor.
 */
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || (session.user as any).role !== "vendor") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await db();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const vendor = await Vendor.findOne({ user: session.user.id }).select('products');

    if (!vendor) {
      return NextResponse.json({ message: "Vendor profile not found for this user." }, { status: 404 });
    }

    const orderFilter = { 'items.product': { $in: vendor.products } };

    // Find orders that contain at least one product from this vendor
    const orders = await Order.find(orderFilter)
      .populate('user', 'name email')
      .populate('items.product', 'name price images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments(orderFilter);
    const totalPages = Math.ceil(totalOrders / limit);

    return NextResponse.json({
      orders,
      pagination: {
        currentPage: page,
        totalPages,
        totalOrders,
        limit,
      },
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}