// import { useState, useEffect } from "react";
// import { api } from "../../../services/axios";

// interface UserProfile {
//   name: string;
//   email: string;
//   phone: string;
//   avatar?: string;
// }

// export default function MyProfile() {
//   const [profile, setProfile] = useState<UserProfile>({
//     name: "",
//     email: "",
//     phone: "",
//     avatar: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/users/profile");
//         const data = res.data.data;
//         setProfile({
//           name: data.name || "",
//           email: data.email || "",
//           phone: data.phone || "",
//           avatar: data.avatar || "",
//         });
//       } catch (err: any) {
//         setMessage({ type: "error", text: err?.response?.data?.message || "Failed to load profile." });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     setMessage(null);
//     try {
//       await api.put(
//         "/users/profile",
//         { name: profile.name, phone: profile.phone, avatar: profile.avatar }
//       );
//       setMessage({ type: "success", text: "Profile updated successfully!" });
//     } catch (err: any) {
//       setMessage({ type: "error", text: err?.response?.data?.message || "Update failed." });
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-16">
//         <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full">
//       {/* Header */}
//       <div className="flex items-start justify-between mb-6">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800">My Profile</h2>
//           <p className="text-sm text-gray-400 mt-0.5">All your account information in one place</p>
//         </div>
//       </div>

//       {/* Feedback Message */}
//       {message && (
//         <div
//           className={`mb-5 px-4 py-3 rounded-lg text-sm font-medium ${
//             message.type === "success"
//               ? "bg-teal-50 text-teal-700 border border-teal-200"
//               : "bg-red-50 text-red-600 border border-red-200"
//           }`}
//         >
//           {message.text}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Full Name + Email row */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-xs font-medium text-gray-500 mb-1.5">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={profile.name}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={profile.email}
//               disabled
//               placeholder="Email"
//               className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-100 text-gray-400 text-sm cursor-not-allowed"
//             />
//           </div>
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone Number</label>
//           <div className="flex items-center gap-2">
//             <span className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-600 shrink-0">
//               🇮🇳 +91
//             </span>
//             <input
//               type="tel"
//               name="phone"
//               value={profile.phone}
//               onChange={handleChange}
//               placeholder="Phone number"
//               className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
//             />
//           </div>
//         </div>

//         {/* Submit */}
//         <div className="pt-2">
//           <button
//             type="submit"
//             disabled={saving}
//             className="px-8 py-2.5 bg-CustomGreen hover:bg-teal-600 disabled:bg-teal-300 text-white text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
//           >
//             {saving && (
//               <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             )}
//             {saving ? "Saving..." : "Update Profile"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }





import { useProfile } from "../hooks/useProfile";
import CountryCodeSelect from "../ui/CountryCodeSelect";
import FeedbackMessage from "../ui/FeedbackMessage";
import Spinner from "../ui/Spinner";

export default function MyProfile() {
  const {
    profile,
    loading,
    saving,
    message,
    handleChange,
    handleDialCodeChange,
    handleSubmit,
  } = useProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner size="md" className="border-teal-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">My Profile</h2>
          <p className="text-sm text-gray-400 mt-0.5">All your account information in one place</p>
        </div>
      </div>

      {message && <FeedbackMessage message={message} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              placeholder="Email"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-100 text-gray-400 text-sm cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone Number</label>
          <div className="flex items-center gap-2">
            <CountryCodeSelect
              value={profile.dialCode}
              onChange={handleDialCodeChange}
            />
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-2.5 bg-CustomGreen hover:bg-teal-600 disabled:bg-teal-300 text-white text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            {saving && <Spinner />}
            {saving ? "Saving..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}