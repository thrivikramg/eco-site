import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/mongodb"
import { Post } from "@/models/post.model"


export async function GET(req: NextRequest) {
    try {
        await db()

        const activeMembers = await Post.aggregate([
            {
                $group: {
                    _id: "$author",
                    postCount: { $sum: 1 },
                },
            },
            {
                $sort: { postCount: -1 },
            },
            {
                $limit: 5,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user",
            },
            {
                $project: {
                    _id: "$user._id",
                    name: "$user.name",
                    avatar: "$user.image",
                    expertise: "$user.role", // Using role as expertise for now, or add a field to User model
                    postCount: 1,
                },
            },
        ])

        return NextResponse.json({ activeMembers })
    } catch (error) {
        console.error("Error fetching active members:", error)
        return NextResponse.json(
            { error: "Failed to fetch active members" },
            { status: 500 }
        )
    }
}
