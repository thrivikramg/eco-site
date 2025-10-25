import mongoose, { Schema, Document, Types } from "mongoose"

/**
 * Interface for a vendor's address
 */
export interface IVendorAddress {
  required: false
  street: string
  city: string
  state: string
  pincode: string
  country: string
}

export interface IPayoutDetails {
  bankName: string
  accountNumber: string
  accountHolderName: string
  ifscCode: string
}

/**
 * Vendor Application Status
 */
export type VendorStatus = "pending" | "approved" | "rejected" | "suspended"

/**
 * Main Vendor interface
 */
export interface IVendor extends Document {
  user: Types.ObjectId // Reference to the User model
  businessName: string
  businessEmail: string
  businessPhone?: string
  businessAddress: IVendorAddress
  description?: string
  status: VendorStatus
  products: Types.ObjectId[] // Product references
  payoutDetails?: IPayoutDetails
  createdAt: Date
  updatedAt: Date
}

/**
 * Vendor schema
 */

const AddressSchema: Schema<IVendorAddress> = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, required: true, default: 'India' },
}, { _id: false });


const VendorSchema: Schema<IVendor> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
    },
    businessEmail: {
      type: String,
      required: [true, "Business email is required"],
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address.'],
    },
    businessPhone: {
      type: String,
      trim: true
    },
    businessAddress: {
      type: AddressSchema,
      required: [true, "Business address is required"]
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "pending",
    },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
)

export const Vendor =
  mongoose.models.Vendor || mongoose.model<IVendor>("Vendor", VendorSchema)