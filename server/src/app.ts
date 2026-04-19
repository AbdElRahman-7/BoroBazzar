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
import addressRoutes from './routes/address.routes';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
const app = express()

/* =====================
   Middlewares
===================== */

app.use(cors(
  {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true
  }
))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

/* =====================
   Health Check Route
===================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running"
  })
})

/* =====================
   Routes
===================== */

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api", productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

/* =====================
   404 Not Found Handler
===================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

// example
// import authRoutes from "./routes/auth.routes"
// app.use("/api/auth", authRoutes)

/* =====================
   Export App
===================== */

export default app