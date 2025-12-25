import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import db from "@/lib/mongodb"
import { Community } from "@/models/community.model"
import { User } from "@/models/user"

export async function POST(
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

        // Fallback for user ID
        let userObjectId = userId
        if (!userObjectId) {
            const user = await User.findOne({ email: session.user.email })
            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 })
            }
            userObjectId = user._id
        }

        const community = await Community.findById(id)

        if (!community) {
            return NextResponse.json({ error: "Community not found" }, { status: 404 })
        }

        const isMember = community.members.includes(userObjectId)

        if (isMember) {
            // Leave
            community.members = community.members.filter((mid: any) => mid.toString() !== userObjectId.toString())
        } else {
            // Join
            community.members.push(userObjectId)
        }

        await community.save()

        return NextResponse.json(
            {
                message: isMember ? "Left community" : "Joined community",
                isMember: !isMember,
                memberCount: community.members.length
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error toggling membership:", error)
        return NextResponse.json(
            { error: "Failed to toggle membership" },
            { status: 500 }
        )
    }
}
