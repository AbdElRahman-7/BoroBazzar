import express from "express";

import {
    getLatestProducts,
    getFeaturedProducts,
    getPopularProducts,
    getProductsByCategory,
    getProductById,
    createProduct,
    getRelatedProducts,
    searchProducts
} from "../controllers/product.controller";
import upload from "../middlewares/upload";

const router = express.Router();


// POST http://localhost:5000/api/products
router.post("/products", upload.single("image"), createProduct);

// GET http://localhost:5000/api/products
router.get("/products", getLatestProducts);

// GET http://localhost:5000/api/products/featured
router.get("/products/featured", getFeaturedProducts);

// GET http://localhost:5000/api/products/popular
router.get("/products/popular", getPopularProducts);

// GET http://localhost:5000/api/products/category/:categoryId
router.get("/products/category/:categoryId", getProductsByCategory);

// GET http://localhost:5000/api/products/search
router.get("/products/search", searchProducts);

// GET http://localhost:5000/api/products/:id
router.get("/products/:id", getProductById);

// GET http://localhost:5000/api/products/related/:id
router.get("/products/related/:id", getRelatedProducts);

export default router;