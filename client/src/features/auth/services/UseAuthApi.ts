// import api from "../../../features/auth/lib/Validations";
import { api } from "../../../services/axios";
import type {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  AuthResponse,
} from "../types/Auth";

export const loginUser = async (
  data: Omit<LoginFormData, "rememberMe">
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/login", data);
  return res.data;
};

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    _id: string;
  };
}

export const registerUser = async (
  data: Omit<RegisterFormData, "rememberMe" | "confirmPassword">
): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/auth/register", data);
  return res.data;
};

export const forgotPassword = async (
  data: ForgotPasswordFormData
): Promise<{ message: string }> => {
  const res = await api.post<{ message: string }>("/auth/forgot-password", data);
  return res.data;
};

// Used after registration
export const verifyOTP = async (data: {
  email: string;
  otp: string;
}): Promise<{ message: string }> => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};

// Used after forgot-password — verifies OTP before allowing reset
export const verifyForgotPasswordOTP = async (data: {
  email: string;
  otp: string;
}): Promise<{ message: string }> => {
  const res = await api.post("/auth/verify-forgot-otp", data);
  return res.data;
};

// Sets the new password
export const resetPassword = async (data: {
  email: string;
  newPassword: string;
}): Promise<{ message: string }> => {
  const res = await api.post("/auth/reset-password", data);
  return res.data;
};