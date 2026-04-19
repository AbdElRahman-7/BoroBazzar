import express from "express";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller";
import { authMiddleware } from "../middlewares/auth.middleware"; // ✅ Auth middleware added

const router = express.Router();

// ✅ All routes are protected — unauthenticated requests are rejected before reaching controllers
router.use(authMiddleware);

router.post("/", addAddress);
router.get("/", getAddresses);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;