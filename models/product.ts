import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  subcategory: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  seller: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot be more than 100"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    subcategory: {
      type: String,
      required: [true, "Subcategory is required"],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A seller is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
