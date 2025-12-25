import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/mongodb"
import { Post } from "@/models/post.model"

export async function GET(req: NextRequest) {
    try {
        await db()

        const trendingPosts = await Post.aggregate([
            {
                $addFields: {
                    likesCount: { $size: { $ifNull: ["$likes", []] } },
                },
            },
            {
                $sort: { likesCount: -1 },
            },
            {
                $limit: 5,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author",
                },
            },
            {
                $unwind: "$author",
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    type: 1,
                    likesCount: 1,
                    // views: 0, // We don't have views yet, maybe add later
                },
            },
        ])

        // Map to match the frontend expectation (category -> type)
        const formattedTrending = trendingPosts.map(post => ({
            title: post.title,
            category: post.type.charAt(0).toUpperCase() + post.type.slice(1), // Capitalize
            posts: post.likesCount, // Using likes as a proxy for "posts" count in the UI card for now, or just show likes
            views: post.likesCount * 10 + Math.floor(Math.random() * 100), // Fake views for now
            id: post._id
        }))

        return NextResponse.json({ trendingTopics: formattedTrending })
    } catch (error) {
        console.error("Error fetching trending posts:", error)
        return NextResponse.json(
            { error: "Failed to fetch trending posts" },
            { status: 500 }
        )
    }
}
