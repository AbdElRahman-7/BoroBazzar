import { Request, Response } from "express";
import mongoose from "mongoose";
import Address from "../models/Address.model";

// ✅ Safely extract userId from auth middleware only (never from req.body / query / params)
const getUserId = (req: Request): string | null => {
  return (
    (req as any).user?.userId ||
    (req as any).user?._id?.toString() ||
    (req as any).user?.id ||
    null
  );
};

// ✅ Validate a string is a non-empty valid ObjectId
const isValidObjectId = (id: unknown): id is string =>
  typeof id === "string" && mongoose.Types.ObjectId.isValid(id);

// ➕ Add Address
export const addAddress = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = getUserId(req);

    if (!isValidObjectId(userId)) {
      await session.abortTransaction();
      return res.status(401).json({
        success: false,
        message: "Unauthorized: invalid or missing user",
      });
    }

    const { title, address, city, state, zipCode, country, phone, isDefault } =
      req.body;

    if (
      !title ||
      !address ||
      !city ||
      !state ||
      !zipCode ||
      !country ||
      !phone
    ) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Atomic: unset previous default before setting new one
    if (isDefault) {
      await Address.updateMany(
        { userId: new mongoose.Types.ObjectId(userId) },
        { isDefault: false },
        { session }
      );
    }

    const [newAddress] = await Address.create(
      [
        {
          userId: new mongoose.Types.ObjectId(userId),
          title,
          address,
          city,
          state,
          zipCode,
          country,
          phone,
          isDefault: isDefault ?? false,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: newAddress,
    });
  } catch (error: any) {
    await session.abortTransaction();
    console.error("Error adding address:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding address",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};

// 📥 Get Addresses
export const getAddresses = async (req: Request, res: Response) => {
  try {
    // ✅ userId comes exclusively from auth middleware — never from query/params
    const userId = getUserId(req);

    if (!isValidObjectId(userId)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: invalid or missing user",
      });
    }

    const addresses = await Address.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error: any) {
    console.error("Error fetching addresses:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching addresses",
      error: error.message,
    });
  }
};

// ✏️ Update Address
export const updateAddress = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const userId = getUserId(req);

    if (!isValidObjectId(userId)) {
      await session.abortTransaction();
      return res.status(401).json({
        success: false,
        message: "Unauthorized: invalid or missing user",
      });
    }

    if (!isValidObjectId(id)) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Invalid Address ID",
      });
    }

    const { title, address, city, state, zipCode, country, phone, isDefault } =
      req.body;

    // ✅ Atomic default handling
    if (isDefault) {
      await Address.updateMany(
        { userId: new mongoose.Types.ObjectId(userId) },
        { isDefault: false },
        { session }
      );
    }

    const updatedAddress = await Address.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
        userId: new mongoose.Types.ObjectId(userId), // 🔐 ownership check
      },
      { title, address, city, state, zipCode, country, phone, isDefault },
      { new: true, runValidators: true, session }
    );

    if (!updatedAddress) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "Address not found or unauthorized",
      });
    }

    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error: any) {
    await session.abortTransaction();
    console.error("Error updating address:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating address",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};

// ❌ Delete Address
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = getUserId(req);

    if (!isValidObjectId(userId)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: invalid or missing user",
      });
    }

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Address ID",
      });
    }

    const deletedAddress = await Address.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      userId: new mongoose.Types.ObjectId(userId), // 🔐 ownership check
    });

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: deletedAddress,
    });
  } catch (error: any) {
    console.error("Error deleting address:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting address",
      error: error.message,
    });
  }
};