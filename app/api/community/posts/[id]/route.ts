import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import db from "@/lib/mongodb"
import { Post } from "@/models/post.model"

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await db()

        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        const { id } = params

        const post = await Post.findById(id)
            .populate("author", "name image")
            .populate("community", "name slug icon")
            .populate({
                path: "comments.author",
                select: "name image"
            })
            .lean()

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }

        // Format post for frontend
        const formattedPost = {
            _id: post._id,
            title: post.title,
            content: post.content,
            image: post.image,
            author: {
                id: post.author?._id,
                name: post.author?.name || "Unknown User",
                avatar: post.author?.image || "",
            },
            community: post.community ? {
                name: post.community.name,
                slug: post.community.slug,
                icon: post.community.icon
            } : null,
            type: post.type,
            likes: post.likes?.length || 0,
            isLiked: userId ? post.likes?.some((id: any) => id.toString() === userId) : false,
            comments: post.comments?.map((comment: any) => ({
                _id: comment._id,
                content: comment.content,
                author: {
                    name: comment.author?.name || "Unknown User",
                    avatar: comment.author?.image || "",
                },
                createdAt: comment.createdAt,
            })).reverse() || [], // Newest comments first
            createdAt: post.createdAt,
        }

        return NextResponse.json({ post: formattedPost })
    } catch (error) {
        console.error("Error fetching post:", error)
        return NextResponse.json(
            { error: "Failed to fetch post" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await db()

        const { id } = params
        const userId = session.user.id

        const post = await Post.findById(id)

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 })
        }

        // Check if the user is the author
        if (post.author.toString() !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        await Post.findByIdAndDelete(id)

        return NextResponse.json({ message: "Post deleted successfully" })
    } catch (error) {
        console.error("Error deleting post:", error)
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        )
    }
}
