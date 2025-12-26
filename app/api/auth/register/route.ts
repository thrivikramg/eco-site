import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import { User } from "@/models/user"
import { hash } from "bcryptjs"

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        await connectToDatabase()

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const hashedPassword = await hash(password, 12)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "buyer",
            isEmailVerified: true, // Auto-verify for now
        })

        return NextResponse.json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error: any) {
        console.error("Registration error:", error)
        return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
    }
}
