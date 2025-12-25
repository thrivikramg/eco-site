import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import db from "@/lib/mongodb"
import { Community } from "@/models/community.model"
import { User } from "@/models/user"

export async function GET(req: NextRequest) {
    try {
        await db()

        // Fetch all communities for now, sorted by member count (popularity)
        const communities = await Community.aggregate([
            {
                $addFields: {
                    memberCount: { $size: { $ifNull: ["$members", []] } },
                },
            },
            {
                $sort: { memberCount: -1 },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    slug: 1,
                    description: 1,
                    icon: 1,
                    memberCount: 1,
                },
            },
        ])

        return NextResponse.json({ communities })
    } catch (error) {
        console.error("Error fetching communities:", error)
        return NextResponse.json(
            { error: "Failed to fetch communities" },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await db()

        const body = await req.json()
        const { name, description, icon } = body

        if (!name || !description) {
            return NextResponse.json(
                { error: "Name and description are required" },
                { status: 400 }
            )
        }

        // Generate slug from name
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")

        // Check if slug exists
        const existingCommunity = await Community.findOne({ slug })
        if (existingCommunity) {
            return NextResponse.json(
                { error: "Community with this name already exists" },
                { status: 409 }
            )
        }

        const userId = session.user.id
        // Fallback for user ID
        let userObjectId = userId
        if (!userObjectId) {
            const user = await User.findOne({ email: session.user.email })
            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 })
            }
            userObjectId = user._id
        }

        const newCommunity = await Community.create({
            name,
            slug,
            description,
            icon,
            creator: userObjectId,
            members: [userObjectId], // Creator automatically joins
        })

        return NextResponse.json(
            { message: "Community created successfully", community: newCommunity },
            { status: 201 }
        )
    } catch (error) {
        console.error("Error creating community:", error)
        return NextResponse.json(
            { error: "Failed to create community" },
            { status: 500 }
        )
    }
}
