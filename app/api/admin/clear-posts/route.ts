import { NextResponse } from "next/server";
import db from "@/lib/mongodb";
import { Post } from "@/models/post.model";

export async function GET(req: Request) {
    try {
        await db();

        const { searchParams } = new URL(req.url);
        const all = searchParams.get("all") === "true";

        const query = all ? {} : { community: { $exists: true, $ne: null } };
        const result = await Post.deleteMany(query);

        return NextResponse.json({
            message: `Successfully deleted ${result.deletedCount} ${all ? 'total' : 'community'} posts.`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error("Error clearing posts:", error);
        return NextResponse.json({ error: "Failed to clear posts" }, { status: 500 });
    }
}
