import { useState, useEffect } from "react";
import { profileService } from "../services/profile.service";
import type { UserProfile, FeedbackMessage } from "../types/profile.types";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    dialCode: "+91",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<FeedbackMessage | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfile(data);
      } catch (err: any) {
        setMessage({
          type: "error",
          text: err?.response?.data?.message || "Failed to load profile.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDialCodeChange = (dialCode: string) => {
    setProfile((prev) => ({ ...prev, dialCode }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await profileService.updateProfile({
        name: profile.name,
        phone: profile.phone,
        dialCode: profile.dialCode,
        image: profile.image,
      });
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Update failed.",
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    profile,
    loading,
    saving,
    message,
    handleChange,
    handleDialCodeChange,
    handleSubmit,
  };
}