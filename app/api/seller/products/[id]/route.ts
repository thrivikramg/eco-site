import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/mongoose';
import { Product } from '@/models/product';
import { Seller } from '@/models/seller';
import { User } from '@/models/user';

async function authorizeSeller(session: any) {
  if (!session?.user || (session.user as any).role !== 'seller') {
    return { error: 'Unauthorized', status: 401 };
  }

  await connectToDatabase();

  const user = await User.findById(session.user.id);
  const seller = await Seller.findOne({ user: user._id });

  if (!seller) {
    return { error: 'Seller not found', status: 404 };
  }

  return { seller };
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { error, status, seller } = await authorizeSeller(session);
  if (error) {
    return NextResponse.json({ message: error }, { status });
  }

  try {
    const body = await request.json();
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: params.id, seller: seller._id },
      body,
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(`Product ${params.id} update error:`, error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { error, status, seller } = await authorizeSeller(session);
  if (error) {
    return NextResponse.json({ message: error }, { status });
  }

  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: params.id, seller: seller._id });

    if (!deletedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(`Product ${params.id} delete error:`, error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { error, status, seller } = await authorizeSeller(session);
  if (error) {
    return NextResponse.json({ message: error }, { status });
  }

  try {
    const product = await Product.findOne({ _id: params.id, seller: seller._id });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(`Product ${params.id} fetch error:`, error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
