import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dbConnect from '@/lib/dbconnect'
import { User } from '@/models/user';
import { Vendor } from '@/models/vendor';

export async function POST(request: NextRequest) {
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      businessName,
      businessEmail,
      street,
      city,
      state,
      pincode,
      country,
    } = body;

    // Validation: Password is not required if the user already exists.
    if (!name || !email || !businessName || !businessEmail || !street || !city || !state || !pincode || !country) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email }).session(session);
    const existingVendorByBusinessEmail = await Vendor.findOne({ businessEmail }).session(session);

    if (existingVendorByBusinessEmail) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ message: 'A vendor with this business email already exists.' }, { status: 409 });
    }

    if (existingUser) {
      // --- SCENARIO 1: EXISTING USER IS UPGRADING ---

      if (existingUser.role === 'vendor') {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json({ message: 'This user is already registered as a vendor.' }, { status: 409 });
      }

      // Update existing user's role to 'vendor'
      existingUser.role = 'vendor';
      await existingUser.save({ session });

      // Create the associated Vendor document
      const newVendor = new Vendor({
        user: existingUser._id,
        businessName,
        businessEmail,
        businessAddress: { street, city, state, pincode, country },
        status: 'pending',
      });
      await newVendor.save({ session });

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json({ message: 'Account successfully upgraded to a vendor account.', userId: existingUser._id }, { status: 201 });
    } else {
      // --- SCENARIO 2: NEW USER IS REGISTERING ---

      if (!password) {
        return NextResponse.json({ message: 'Password is required for new registrations.' }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, password: hashedPassword, role: 'vendor' });
      const savedUser = await newUser.save({ session });

      const newVendor = new Vendor({
        user: savedUser._id,
        businessName,
        businessEmail,
        businessAddress: { street, city, state, pincode, country },
        status: 'pending',
      });
      await newVendor.save({ session });

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json({ message: 'New seller registered successfully.', userId: savedUser._id }, { status: 201 });
    }
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    console.error('Seller Registration Error:', error);
    return NextResponse.json({ message: 'An error occurred during registration.', error: error.message }, { status: 500 });
  }
}