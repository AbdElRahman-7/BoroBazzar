import { Router } from "express";
import {
  register,
  login,
  verifyOtpController,
  forgotPasswordController,
  verifyForgotPasswordOtpController,
  resetPasswordController,
} from "../controllers/auth.controller";

const router = Router();

// POST /api/auth/register  — creates account + sends OTP email
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/verify-otp  — used after registration
router.post("/verify-otp", verifyOtpController);

// POST /api/auth/forgot-password  — sends OTP to email
router.post("/forgot-password", forgotPasswordController);

// POST /api/auth/verify-forgot-otp  — verifies OTP before reset
router.post("/verify-forgot-otp", verifyForgotPasswordOtpController);

// POST /api/auth/reset-password  — sets new password
router.post("/reset-password", resetPasswordController);

export default router;