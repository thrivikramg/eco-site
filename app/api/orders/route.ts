import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import mongoose from 'mongoose';
import { authOptions } from '../../../lib/auth';
import db from '../../../lib/dbconnect';
import { Product } from '../../../models/product.model';
import { Order } from '../../../models/order.model';
import { User, IUser } from '../../../models/user';
import { Vendor } from '../../../models/vendor';

interface OrderProduct {
  productId: string;
  quantity: number;
}

interface ShippingAddress {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export async function POST(req: Request) {
  // const session = await getServerSession(authOptions);

  // if (!session || !session.user) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // }

  await db();
  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    // TEMP: Use a dummy user for development
    let user = await User.findOne({ email: 'dummybuyer@example.com' }).session(dbSession);
    if (!user) {
      // Using .save() with session requires creating an instance first
      const dummyUser = new User({
        name: 'Dummy Buyer',
        email: 'dummybuyer@example.com',
        role: 'buyer',
      });
      user = await dummyUser.save({ session: dbSession });
    }

    if (!user) {
      await dbSession.abortTransaction();
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const {
      products: orderProducts,
      shippingAddress,
      paymentMethod
    }: { products: OrderProduct[], shippingAddress: ShippingAddress, paymentMethod: 'COD' | 'Card' | 'UPI' } = await req.json();

    if (!orderProducts || orderProducts.length === 0) {
      await dbSession.abortTransaction();
      return NextResponse.json({ message: 'Order must contain at least one product' }, { status: 400 });
    }

    let totalAmount = 0;
    const orderProductDetails = [];

    for (const item of orderProducts) {
      const product = await Product.findById(item.productId).session(dbSession);

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`);
      }

      product.stock -= item.quantity;
      await product.save({ session: dbSession });

      totalAmount += product.price * item.quantity;
      orderProductDetails.push({
        product: product._id,
        vendor: product.vendor,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const newOrder = new Order({
      user: user._id,
      products: orderProductDetails,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'Pending',
    });

    await newOrder.save({ session: dbSession });

    await dbSession.commitTransaction();
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    await dbSession.abortTransaction();
    console.error('Order creation failed:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  } finally {
    dbSession.endSession();
  }
}

export async function GET(req: Request) {
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // }
  // const sessionUser = session.user as IUser;

  await db();

  try {
    // TEMP: Determine role based on a query parameter for testing
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role') || 'buyer'; // Default to 'buyer'

    if (role === 'buyer') {
      // Logic for BUYER: Fetch their own orders
      let user = await User.findOne({ email: 'dummybuyer@example.com' });
      if (!user) {
        // Create dummy buyer if it doesn't exist, so the page can load
        user = await User.create({
          name: 'Dummy Buyer',
          email: 'dummybuyer@example.com',
          role: 'buyer',
        });
      }
      if (!user) {
        return NextResponse.json({ message: 'Buyer not found' }, { status: 404 });
      }
      const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });
      return NextResponse.json(orders);
    } else if (role === 'vendor') {
      // Logic for VENDOR: Fetch orders containing their products
      let vendor = await Vendor.findOne(); // Find dummy vendor
      if (!vendor) {
        // This logic is for creating a dummy vendor if one doesn't exist, matching other files
        const dummyUser = await User.create({ name: 'Dummy Vendor', email: `dummyvendor@example.com`, role: 'vendor' });
        vendor = await Vendor.create({ user: dummyUser._id, businessName: 'Dummy Store' });
      }
      if (!vendor) {
        return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
      }

      const orders = await Order.find({ 'products.vendor': vendor._id }).sort({ createdAt: -1 });
      return NextResponse.json(orders);
    }

    return NextResponse.json({ message: 'Invalid role' }, { status: 400 });

  } catch (error: any) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}