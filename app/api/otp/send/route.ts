import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectToDatabase } from "../../../../lib/mongoose";
import { User } from "../../../../models/user";
import nodemailer from "nodemailer";
import twilio from "twilio";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { phoneNumber } = await req.json();

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Save to User
        await User.findOneAndUpdate(
            { email: session.user.email },
            { otp, otpExpires }
        );

        // Always log to console for debugging/backup
        console.log("============================================");
        console.log(`[OTP SERVICE] OTP for User: ${session.user.email}`);
        console.log(`[OTP SERVICE] Phone: ${phoneNumber}`);
        console.log(`[OTP SERVICE] CODE: ${otp}`);
        console.log("============================================");

        let smsSent = false;
        let emailSent = false;

        // --- SMS SENDING WITH TWILIO ---
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

        if (accountSid && authToken && twilioNumber && phoneNumber) {
            try {
                const client = twilio(accountSid, authToken);
                await client.messages.create({
                    body: `Your EcoSaro verification code is: ${otp}. Valid for 10 minutes.`,
                    from: twilioNumber,
                    to: phoneNumber,
                });
                console.log(`[OTP SERVICE] SMS sent to ${phoneNumber}`);
                smsSent = true;
            } catch (smsError) {
                console.error("[OTP SERVICE] Failed to send SMS:", smsError);
            }
        } else {
            if (phoneNumber) {
                console.warn("[OTP SERVICE] Twilio credentials not found or phone number missing. SMS skipped.");
            }
        }

        // --- EMAIL SENDING WITH NODEMAILER ---
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = process.env.SMTP_PORT;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;

        if (smtpHost && smtpUser && smtpPass) {
            try {
                const transporter = nodemailer.createTransport({
                    host: smtpHost,
                    port: Number(smtpPort) || 587,
                    secure: Number(smtpPort) === 465, // true for 465, false for other ports
                    auth: {
                        user: smtpUser,
                        pass: smtpPass,
                    },
                });

                await transporter.sendMail({
                    from: `"EcoSaro Support" <${smtpUser}>`, // sender address
                    to: session.user.email, // list of receivers
                    subject: "Your EcoSaro Verification Code", // Subject line
                    text: `Your verification code is: ${otp}. It expires in 10 minutes.`, // plain text body
                    html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #16a34a;">EcoSaro Verification</h2>
                        <p>Hello,</p>
                        <p>Your verification code is:</p>
                        <h1 style="font-size: 32px; letter-spacing: 5px; color: #333;">${otp}</h1>
                        <p>This code will expire in 10 minutes.</p>
                        <p>If you didn't request this, please ignore this email.</p>
                    </div>
                `, // html body
                });
                console.log(`[OTP SERVICE] Email sent to ${session.user.email}`);
                emailSent = true;
            } catch (emailError) {
                console.error("[OTP SERVICE] Failed to send email:", emailError);
            }
        } else {
            console.warn("[OTP SERVICE] SMTP credentials not found. Email skipped.");
        }

        if (!smsSent && !emailSent) {
            return NextResponse.json({ message: "OTP generated (check console), but failed to send via SMS or Email." });
        }

        return NextResponse.json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("OTP Send Error:", error);
        return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 });
    }
}
