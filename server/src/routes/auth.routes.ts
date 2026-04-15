import { Router } from "express";
import { register, login/*, forgotPasswordController, verifyOtpController, resetPasswordController*/ } from "../controllers/auth.controller";


const router = Router();

// POST http://localhost:5000/api/auth/register
router.post("/register", register);

// POST http://localhost:5000/api/auth/login
router.post("/login", login);

// POST http://localhost:5000/api/auth/forgot-password
// router.post("/forgot-password", forgotPasswordController);

// POST http://localhost:5000/api/auth/verify-otp
// router.post("/verify-otp", verifyOtpController);

// POST http://localhost:5000/api/auth/reset-password
// router.post("/reset-password", resetPasswordController);
export default router;