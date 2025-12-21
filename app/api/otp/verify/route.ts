import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectToDatabase } from "../../../../lib/mongoose";
import { User } from "../../../../models/user";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { otp } = await req.json();

        const user = await User.findOne({ email: session.user.email }).select('+otp +otpExpires');

        if (!user || !user.otp || !user.otpExpires) {
            return NextResponse.json({ message: "No OTP request found. Please request a new code." }, { status: 400 });
        }

        if (new Date() > new Date(user.otpExpires)) {
            return NextResponse.json({ message: "OTP has expired. Please request a new code." }, { status: 400 });
        }

        if (user.otp !== otp) {
            return NextResponse.json({ message: "Invalid OTP. Please try again." }, { status: 400 });
        }

        // Clear OTP after success and mark email as verified
        await User.updateOne(
            { email: session.user.email },
            {
                $unset: { otp: 1, otpExpires: 1 },
                $set: { isEmailVerified: true }
            }
        );

        return NextResponse.json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("OTP Verify Error:", error);
        return NextResponse.json({ message: "Failed to verify OTP" }, { status: 500 });
    }
}
