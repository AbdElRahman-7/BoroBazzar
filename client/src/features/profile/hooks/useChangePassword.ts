import { useState } from "react";
import { profileService } from "../services/profile.service";
import type { FeedbackMessage } from "../types/profile.types";


interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const INITIAL_FORM: PasswordForm = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function useChangePassword() {
  const [form, setForm] = useState<PasswordForm>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<FeedbackMessage | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (form.newPassword !== form.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (form.newPassword.length < 6) {
      setMessage({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }

    setLoading(true);
    try {
      await profileService.changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      setMessage({ type: "success", text: "Password changed successfully!" });
      setForm(INITIAL_FORM);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Failed to change password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, message, handleChange, handleSubmit };
}