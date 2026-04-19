import { Request, Response } from "express";
import Address from "../models/Address.model";

export const addAddress = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId || (req as any).user?.id;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const { title, address, city, state, zipCode, country, phone, isDefault } = req.body;

    if (!title || !address || !city || !state || !zipCode || !country || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newAddress = await Address.create({
      userId,
      title,
      address,
      city,
      state,
      zipCode,
      country,
      phone,
      isDefault: isDefault || false,
    });

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: newAddress,
    });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({
      success: false,
      message: "Error adding address",
      error,
    });
  }
};

export const getAddresses = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string || req.params.userId || (req as any).user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const addresses = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching addresses",
      error,
    });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, address, city, state, zipCode, country, phone, isDefault } = req.body;

    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { title, address, city, state, zipCode, country, phone, isDefault },
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({
      success: false,
      message: "Error updating address",
      error,
    });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: deletedAddress,
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting address",
      error,
    });
  }
};
