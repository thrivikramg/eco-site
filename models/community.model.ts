import mongoose, { Schema, Document, Types } from "mongoose"

export interface ICommunity extends Document {
    name: string
    slug: string
    description: string
    icon?: string
    creator: Types.ObjectId
    members: Types.ObjectId[]
    createdAt: Date
    updatedAt: Date
}

const CommunitySchema: Schema<ICommunity> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        icon: {
            type: String,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
)

export const Community =
    mongoose.models.Community || mongoose.model<ICommunity>("Community", CommunitySchema)
