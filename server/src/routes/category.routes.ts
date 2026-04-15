import express from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controller";
import upload from "../middlewares/upload";

const router = express.Router();

// POST http://localhost:5000/api/categories
router.post("/", upload.single("image"), createCategory);

// GET http://localhost:5000/api/categories
router.get("/", getAllCategories);

export default router;