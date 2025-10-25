import mongoose, { Schema, Document, Types, Model } from 'mongoose';

export interface IProduct extends Document {
  vendor: Types.ObjectId; // Reference to the Vendor model
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema({
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0,
  },
  images: [{ type: String }],
}, { timestamps: true });

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);