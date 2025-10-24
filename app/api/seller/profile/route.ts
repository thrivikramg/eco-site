import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/mongoose';
import { Seller } from '@/models/seller';
import { User } from '@/models/user';

async function authorizeSeller(session: any) {
  if (!session?.user || (session.user as any).role !== 'vendor') {
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

export async function GET() {
  const session = await getServerSession(authOptions);
  const { error, status, seller } = await authorizeSeller(session);
  if (error) {
    return NextResponse.json({ message: error }, { status });
  }

  return NextResponse.json(seller);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  const { error, status, seller }_await authorizeSeller(session);
  if (error) {
    return NextResponse.json({ message: error }, { status });
  }

  try {
    const body = await request.json();
    const updatedSeller = await Seller.findByIdAndUpdate(seller._id, body, { new: true });

    return NextResponse.json(updatedSeller);
  } catch (error) {
    console.error('Seller profile update error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
