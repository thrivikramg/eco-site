// /app/api/vendor/register/route.ts
import { NextResponse } from "next/server"
import mongoose from "mongoose"
import db from "@/lib/mongodb"
import { Vendor } from "@/models/vendor"

import { User } from "@/models/user"

// Hardcoded ObjectId for testing
const FAKE_USER_ID = new mongoose.Types.ObjectId("60d5ecb8b486d3a9c8e8a8b9")

export async function POST(req: Request) {
  try {
    await db()

    const body = await req.json()

    // Validate required fields
    const requiredFields = ["businessName", "businessEmail", "phoneNumber", "otpVerified"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ message: `${field} is required` }, { status: 400 })
      }
    }

    if (!body.otpVerified) {
      return NextResponse.json({ message: "OTP must be verified" }, { status: 400 })
    }

    // Check if vendor already exists
    const existing = await Vendor.findOne({ user: FAKE_USER_ID })
    if (existing) {
      return NextResponse.json({ message: "Vendor already registered" }, { status: 409 })
    }

    // Create new vendor
    const vendor = new Vendor({
      user: FAKE_USER_ID,
      businessName: body.businessName,
      businessEmail: body.businessEmail,
      businessPhone: body.phoneNumber,
      businessAddress: body.businessAddress || {
        street: "N/A",
        city: "N/A",
        state: "N/A",
        pincode: "000000",
        country: "India"
      },
      status: "pending"
    })

    await vendor.save()

    await User.findByIdAndUpdate(FAKE_USER_ID, { role: 'vendor' })

    return NextResponse.json({ message: "Vendor registered successfully", vendor })
  } catch (err) {
    console.error("Vendor registration error:", err)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
