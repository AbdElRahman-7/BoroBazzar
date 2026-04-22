import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  verifyForgotPasswordOtp,
  resetPassword,
} from "../services/auth.service";

// ─── Register ────────────────────────────────────────────────────────────────

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    const user = await registerUser(name, email, password, phone);
    res.status(201).json({
      success: true,
      message: "User registered successfully. OTP sent to your email.",
      data: { name: user.name, email: user.email, _id: user._id },
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── Login ───────────────────────────────────────────────────────────────────

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
      data: result.user,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── Verify OTP (registration) ───────────────────────────────────────────────

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const result = await verifyOtp(email, otp);
    res.status(200).json({ success: true, message: result.message });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── Forgot Password ─────────────────────────────────────────────────────────

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await forgotPassword(email);
    res.status(200).json({ success: true, message: result.message });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── Verify Forgot-Password OTP ──────────────────────────────────────────────

export const verifyForgotPasswordOtpController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, otp } = req.body;
    const result = await verifyForgotPasswordOtp(email, otp);
    res.status(200).json({ success: true, message: result.message });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ─── Reset Password ──────────────────────────────────────────────────────────

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    const result = await resetPassword(email, newPassword);
    res.status(200).json({ success: true, message: result.message });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};