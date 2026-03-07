import express from "express"
import cors from "cors"

const app = express()

/* =====================
   Middlewares
===================== */

app.use(cors())

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

// example
// import authRoutes from "./routes/auth.routes"
// app.use("/api/auth", authRoutes)

/* =====================
   Export App
===================== */

export default app