import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDatabase } from '@/lib/mongoose';
import { User } from '@/models/user';
import { Seller } from '@/models/seller';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { storeName, storeDescription } = await request.json();

    await connectToDatabase();

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.role = 'vendor';
    await user.save();

    await Seller.create({
      user: user._id,
      storeName,
      storeDescription,
    });

    return NextResponse.json({ message: 'Seller registration successful' });
  } catch (error) {
    console.error('Seller registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
