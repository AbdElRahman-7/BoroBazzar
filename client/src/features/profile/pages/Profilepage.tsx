// import MyProfile from "../components/Myprofile";
// import ChangePassword from "../components/Changepassword";
// import AccountSidebar from "../../../components/account/AccountSidebar";

// export default function ProfilePage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 py-10">
//         <div className="flex gap-6">

//           {/* ── Sidebar ── */}
//           <div className="col-span-12 lg:col-span-4 sticky top-6">
//             <AccountSidebar />
//           </div>

//           {/* ── Main content ── */}
//           <div className="flex-1 flex flex-col gap-6">
//             <MyProfile />
//             <ChangePassword />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }




import MyProfile from "../components/MyProfile";
import ChangePassword from "../components/ChangePassword";
import AccountSidebar from "../../../components/account/AccountSidebar";

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