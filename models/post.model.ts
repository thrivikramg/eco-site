import mongoose, { Schema, Document, Types } from "mongoose"

export interface IPost extends Document {
    title: string
    content: string
    image?: string
    author: Types.ObjectId
    type: "discussion" | "question" | "event" | "tip"
    community?: Types.ObjectId
    likes: Types.ObjectId[]
    comments: {
        _id: Types.ObjectId
        content: string
        author: Types.ObjectId
        parentId?: Types.ObjectId
        likes: Types.ObjectId[]
        createdAt: Date
    }[]
    createdAt: Date
    updatedAt: Date
}

const PostSchema: Schema<IPost> = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        image: {
            type: String,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: ["discussion", "question", "event", "tip"],
            default: "discussion",
        },
        community: {
            type: Schema.Types.ObjectId,
            ref: "Community",
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                content: { type: String, required: true },
                author: { type: Schema.Types.ObjectId, ref: "User", required: true },
                parentId: { type: Schema.Types.ObjectId },
                likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    {
        timestamps: true,
    }
)

export const Post =
    mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema)
