import { useState } from "react";
import { api } from "../../services/axios";

export default function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
      await api.put(
        "/user/change-password",
        { oldPassword: form.oldPassword, newPassword: form.newPassword }
      );
      setMessage({ type: "success", text: "Password changed successfully!" });
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Failed to change password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
        <p className="text-sm text-gray-400 mt-0.5">Update Your Password</p>
      </div>

      {/* Feedback Message */}
      {message && (
        <div
          className={`mb-5 px-4 py-3 rounded-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-teal-50 text-teal-700 border border-teal-200"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Old Password + New Password row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              placeholder="Old Password"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="sm:w-1/2 sm:pr-2">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-CustomGreen hover:bg-teal-600 disabled:bg-teal-300 text-white text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
}