import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import db from "@/lib/mongodb"
import { Community } from "@/models/community.model"

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } } // id can be slug or _id
) {
    try {
        await db()

        const session = await getServerSession(authOptions)
        const userId = session?.user?.id

        const { id } = params

        // Try to find by slug first, then by _id
        let community: any = await Community.findOne({ slug: id }).lean()

        if (!community && id.match(/^[0-9a-fA-F]{24}$/)) {
            community = await Community.findById(id).lean()
        }

        if (!community) {
            return NextResponse.json({ error: "Community not found" }, { status: 404 })
        }

        const isMember = userId ? community.members.some((mid: any) => mid.toString() === userId) : false

        return NextResponse.json({
            community: {
                _id: community._id,
                name: community.name,
                slug: community.slug,
                description: community.description,
                icon: community.icon,
                memberCount: community.members.length,
                isMember,
                createdAt: community.createdAt
            }
        })
    } catch (error) {
        console.error("Error fetching community:", error)
        return NextResponse.json(
            { error: "Failed to fetch community" },
            { status: 500 }
        )
    }
}
