import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { v2 as cloudinary } from "cloudinary";
import { connectToDatabase } from "../../../lib/mongoose";

// Cloudinary config moved inside handler

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const cloudinaryKeys = Object.keys(process.env).filter(key => key.toUpperCase().includes('CLOUDINARY'));
        console.log("Available Cloudinary Keys:", cloudinaryKeys);

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        if (!cloudName || !apiKey || !apiSecret) {
            const missing = [];
            if (!cloudName) missing.push("CLOUDINARY_CLOUD_NAME");
            if (!apiKey) missing.push("CLOUDINARY_API_KEY");
            if (!apiSecret) missing.push("CLOUDINARY_API_SECRET");

            console.error("Missing Cloudinary Env Vars:", missing);
            return NextResponse.json(
                { message: "Server Configuration Error" },
                { status: 500 }
            );
        }

        // Debugging: Log partial values to check for issues like quotes
        console.log("Cloudinary Config Debug:", {
            cloudName: {
                length: cloudName.length,
                value: `${cloudName.substring(0, 3)}...${cloudName.substring(cloudName.length - 3)}`
            },
            apiKey: {
                length: apiKey.length,
                value: `${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)}`
            },
            apiSecret: {
                length: apiSecret.length,
                // Be careful not to log too much of the secret
                value: `${apiSecret.substring(0, 3)}...${apiSecret.substring(apiSecret.length - 3)}`
            }
        });

        // Check for common mistake: quotes in env vars
        if (cloudName.startsWith('"') || cloudName.startsWith("'") ||
            apiKey.startsWith('"') || apiKey.startsWith("'") ||
            apiSecret.startsWith('"') || apiSecret.startsWith("'")) {
            console.error("WARNING: Environment variables appear to contain quotes. Please remove them from .env.local");
            return NextResponse.json(
                { message: "Configuration Error: Environment variables contain quotes. Please remove them." },
                { status: 500 }
            );
        }

        // Check for truncated secret
        if (apiSecret.length < 20) {
            console.error(`WARNING: Cloudinary API Secret is too short (${apiSecret.length} chars). It should be around 27 characters.`);
            return NextResponse.json(
                { message: `Configuration Error: Cloudinary API Secret is too short (${apiSecret.length} chars). Please copy the full secret from your Cloudinary Dashboard.` },
                { status: 500 }
            );
        }

        // Configure Cloudinary
        cloudinary.config({
            cloud_name: cloudName.replace(/['"]/g, ''), // Strip quotes just in case
            api_key: apiKey.replace(/['"]/g, ''),
            api_secret: apiSecret.replace(/['"]/g, ''),
        });

        // 1. Authentication Check
        const session = await getServerSession(authOptions);
        console.log("Upload API Session:", JSON.stringify(session, null, 2));

        if (!session) {
            console.error("Upload: No session found");
            return NextResponse.json({ message: "Unauthorized: No session" }, { status: 401 });
        }
        if (!session.user || (session.user as any).role !== "vendor") {
            console.error("Upload: User is not a vendor", session.user);
            return NextResponse.json({ message: "Unauthorized: Not a vendor" }, { status: 401 });
        }

        // 2. Parse Form Data
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ message: "No file provided" }, { status: 400 });
        }

        // 5MB limit
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ message: "File too large (max 5MB)" }, { status: 400 });
        }

        // 3. Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 4. Upload to Cloudinary
        const result = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: "eco-site/products", // Optional: organize uploads in a folder
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(buffer);
        });

        // 5. Return the URL
        return NextResponse.json({ url: result.secure_url }, { status: 201 });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Internal Server Error", error },
            { status: 500 }
        );
    }
}
