// ─── Profile Types ────────────────────────────────────────────────
export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  dialCode: string;
  image?: string;
}

export interface UpdateProfilePayload {
  name: string;
  phone: string;
  dialCode: string;
  image?: string;
}

// ─── Password Types ────────────────────────────────────────────────
export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

// ─── Shared UI Types ──────────────────────────────────────────────
export interface FeedbackMessage {
  type: "success" | "error";
  text: string;
}