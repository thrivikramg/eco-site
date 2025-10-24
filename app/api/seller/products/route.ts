import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/mongoose';
import { Product } from '@/models/product';
import { Seller } from '@/models/seller';
import { User } from '@/models/user';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || (session.user as any).role !== 'seller') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, description, price } = await request.json();

    await connectToDatabase();

    const user = await User.findById(session.user.id);
    const seller = await Seller.findOne({ user: user._id });

    if (!seller) {
      return NextResponse.json({ message: 'Seller not found' }, { status: 404 });
    }

    const newProduct = await Product.create({
      seller: seller._id,
      name,
      description,
      price,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user || (session.user as any).role !== 'seller') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const user = await User.findById(session.user.id);
    const seller = await Seller.findOne({ user: user._id });

    if (!seller) {
      return NextResponse.json({ message: 'Seller not found' }, { status: 404 });
    }

    const products = await Product.find({ seller: seller._id });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
