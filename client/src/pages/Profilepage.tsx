// ProfilePage.tsx
// Drop this into your pages/ folder. It composes the sidebar you already have
// with the two new components: MyProfile and ChangePassword.

import MyProfile from "../components/profile/Myprofile";
import ChangePassword from "../components/profile/Changepassword";
// import AccountSidebar from "@/components/AccountSidebar"; // ← your existing sidebar
import AccountSidebar from "../components/account/AccountSidebar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-6">

          {/* ── Sidebar ── */}
          <div className="col-span-12 lg:col-span-4 sticky top-6">
            <AccountSidebar />
          </div>

          {/* ── Main content ── */}
          <div className="flex-1 flex flex-col gap-6">
            <MyProfile />
            <ChangePassword />
          </div>

        </div>
      </div>
    </div>
  );
}