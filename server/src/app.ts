import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from './routes/cart.routes';
import wishlistRoutes from './routes/wishlist.routes';
import orderRoutes from './routes/order.routes';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
import addressRoutes from "./routes/address.routes";

const app = express()

/* =====================
   Middlewares
===================== */

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* =====================
   Health Check
===================== */

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" })
})

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

/* =====================
   Routes
===================== */

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/addresses", addressRoutes);   // ✅ single, clean registration
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", productRoutes);

/* =====================
   404 Handler
===================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

export default app