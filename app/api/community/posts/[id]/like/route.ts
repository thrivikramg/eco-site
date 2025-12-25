import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import db from "@/lib/mongodb"
import { Post } from "@/models/post.model"
import { User } from "@/models/user"

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await db()

        const { id } = params
        const userId = session.user.id

        // Find user by email to get ObjectId if session.user.id is not available (fallback)
        // Ideally session.user.id should be available if authOptions callbacks are set up correctly
        let userObjectId = userId
        if (!userObjectId) {
            const user = await User.findOne({ email: session.user.email })
            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 })
            }
            userObjectId = user._id
        }

        const post = await Post.findById(id)

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }

        const isLiked = post.likes.includes(userObjectId)

        if (isLiked) {
            // Unlike
            post.likes = post.likes.filter((id: any) => id.toString() !== userObjectId.toString())
        } else {
            // Like
            post.likes.push(userObjectId)
        }

        await post.save()

        return NextResponse.json(
            {
                message: isLiked ? "Post unliked" : "Post liked",
                likes: post.likes.length,
                isLiked: !isLiked
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error toggling like:", error)
        return NextResponse.json(
            { error: "Failed to toggle like" },
            { status: 500 }
        )
    }
}
