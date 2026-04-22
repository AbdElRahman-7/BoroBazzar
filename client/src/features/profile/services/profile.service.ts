import { api } from "../../../services/axios";
import type { UpdateProfilePayload, ChangePasswordPayload, UserProfile } from "../types/profile.types";

// ─── Profile Endpoints ────────────────────────────────────────────
export const profileService = {
  /**
   * Fetch the current authenticated user's profile.
   */
  getProfile: async (): Promise<UserProfile> => {
    const res = await api.get("/users/profile");
    const data = res.data.data;
    return {
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      dialCode: data.dialCode || "+91",
      image: data.image || "",
    };
  },

  /**
   * Update mutable profile fields (name, phone, avatar).
   */
  updateProfile: async (payload: UpdateProfilePayload): Promise<void> => {
    await api.put("/users/profile", payload);
  },

  /**
   * Change the authenticated user's password.
   */
  changePassword: async (payload: ChangePasswordPayload): Promise<void> => {
    await api.put("/users/change-password", payload);
  },
};