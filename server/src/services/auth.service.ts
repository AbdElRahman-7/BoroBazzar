import bcrypt from "bcrypt";
import userModel, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendOTPEmail } from "../utils/sendEmail";

// ─── Register ────────────────────────────────────────────────────────────────

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phone?: string
): Promise<IUser> => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  const user = new userModel({
    name,
    email,
    password: hashedPassword,
    phone,
    role: "user",
    otp,
    otpExpires,
    isVerified: false,
  });
  await user.save();

  try {
    await sendOTPEmail(email, otp);
  } catch (error: any) {
    console.error("❌ Email failed to send, but user was created.");
    console.error("SMTP Error:", error.message);
    console.log("🔑 DEVELOPMENT OTP:", otp);
  }

  return user;
};


// ─── Login ───────────────────────────────────────────────────────────────────

export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: IUser; token: string }> => {

  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  // Optional: block login if email not verified yet
  // if (!user.isVerified) throw new Error("Please verify your email first");

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return { user, token };
};

// ─── Verify OTP (registration) ───────────────────────────────────────────────

export const verifyOtp = async (email: string, otp: string) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  if (user.otp !== otp) throw new Error("Invalid OTP");

  if (!user.otpExpires || user.otpExpires < new Date())
    throw new Error("OTP has expired");

  // Mark verified and clear OTP
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return { message: "Email verified successfully" };
};

// ─── Forgot Password ─────────────────────────────────────────────────────────

export const forgotPassword = async (email: string) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("No account found with that email");

  const otp = crypto.randomInt(100000, 999999).toString();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  try {
    await sendOTPEmail(email, otp);
  } catch (error: any) {
    console.error("❌ Forgot Password email failed to send.");
    console.error("SMTP Error:", error.message);
    console.log("🔑 DEVELOPMENT OTP (Forgot Password):", otp);
  }

  return { message: "OTP sent to your email (Check server console if email fails)" };

};

// ─── Verify Forgot-Password OTP ──────────────────────────────────────────────

export const verifyForgotPasswordOtp = async (email: string, otp: string) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  if (user.otp !== otp) throw new Error("Invalid OTP");

  if (!user.otpExpires || user.otpExpires < new Date())
    throw new Error("OTP has expired");

  // Clear OTP — password reset can now proceed
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return { message: "OTP verified" };
};

// ─── Reset Password ──────────────────────────────────────────────────────────

export const resetPassword = async (email: string, newPassword: string) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { message: "Password reset successfully" };
};