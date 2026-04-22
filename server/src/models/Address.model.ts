import mongoose, { Document, Schema } from "mongoose";

export interface IAddress extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<IAddress>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // ✅ Index for fast lookups by user (was missing — caused full collection scans)
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true, // ✅ Strip accidental whitespace
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
      // ✅ Basic format validation: digits and optional hyphen (e.g. US 5-digit or ZIP+4)
      match: [/^\d{4,10}(-\d{4})?$/, "Invalid zip code format"],
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      // ✅ International-friendly: optional leading +, then 7–15 digits
      match: [/^\+?\d{7,15}$/, "Invalid phone number format"],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Compound index: efficient query for a user's default address
addressSchema.index({ userId: 1, isDefault: 1 });

export default mongoose.model<IAddress>("Address", addressSchema);