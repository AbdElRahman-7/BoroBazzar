import express from "express";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller";

const router = express.Router();

// POST /api/addresses - Add a new address
router.post("/", addAddress);

// GET /api/addresses - Get all addresses (optionally filtered by userId)
router.get("/", getAddresses);

// PUT /api/addresses/:id - Update an address
router.put("/:id", updateAddress);

// DELETE /api/addresses/:id - Delete an address
router.delete("/:id", deleteAddress);

export default router;
