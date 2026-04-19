import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import AuthLayout from "../../../components/auth/customer/AuthLayout";
import InputField from "../../../components/auth/customer/InputField";
import { resetPassword } from "../../../hooks/UseAuthApi";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email: string = (location.state as any)?.email || "";

  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setSuccessMsg("Password reset successfully! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1500);
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || "Something went wrong.";
      setServerError(msg);
    },
  });

  const onSubmit = (values: ResetPasswordSchema) => {
    if (!email) {
      setServerError("Session expired. Please restart the forgot-password flow.");
      return;
    }
    setServerError("");
    setSuccessMsg("");
    mutate({ email, newPassword: values.newPassword });
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-7 shadow-lg">
        {/* Lock icon */}
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
            <rect x="12" y="36" width="44" height="32" rx="5" fill="#02B290" />
            <rect x="12" y="36" width="44" height="17" rx="5" fill="#019e7e" />
            <path d="M22 36V26a12 12 0 0124 0v10" stroke="#019e7e" strokeWidth="5" strokeLinecap="round" fill="none"/>
            <circle cx="34" cy="52" r="5" fill="white" />
            <rect x="32" y="52" width="4" height="7" rx="2" fill="white" />
          </svg>
        </div>

        {/* Header */}
        <div className="mb-1 text-center">
          <h1 className="text-lg font-semibold text-gray-800">Reset Password</h1>
        </div>
        <p className="text-center text-xs text-gray-500 mb-5 leading-relaxed">
          Enter your new password for{" "}
          <span className="text-CustomGreen font-medium">{email}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3" noValidate>
          <InputField
            showPasswordToggle
            placeholder="New Password"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <InputField
            showPasswordToggle
            placeholder="Confirm New Password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {serverError && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {serverError}
            </p>
          )}
          {successMsg && (
            <p className="text-xs text-CustomGreen bg-CustomGreen/5 border border-[#02B290]/20 rounded-lg px-3 py-2">
              {successMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-CustomGreen hover:bg-CustomGreenHover disabled:opacity-60 text-white font-semibold py-2.5 rounded-md transition text-sm tracking-wide mt-1"
          >
            {isPending ? "Resetting…" : "RESET PASSWORD"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
