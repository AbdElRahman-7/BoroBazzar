// import { useState } from "react";
// import { useAddresses } from "../components/address/useAddresses";
// import AddressCard from "../components/address/AddressCard";
// import AddressFormModal from "../components/address/AddressFormModal";
// import type { IAddress, AddressFormData } from "../types/address";

// export default function AddressPage() {
//   const { addresses, loading, deleting, message, addAddress, updateAddress, deleteAddress } =
//     useAddresses();

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editTarget, setEditTarget] = useState<IAddress | null>(null);

//   const openAdd = () => { setEditTarget(null); setModalOpen(true); };
//   const openEdit = (addr: IAddress) => { setEditTarget(addr); setModalOpen(true); };
//   const closeModal = () => { setModalOpen(false); setEditTarget(null); };

//   const handleSubmit = async (data: AddressFormData) => {
//     if (editTarget) {
//       await updateAddress(editTarget._id, data);
//     } else {
//       await addAddress(data);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full">
//       {/* Header */}
//       <div className="flex items-start justify-between mb-6">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800">Address</h2>
//           <p className="text-sm text-gray-400 mt-0.5">Manage Your Addresses</p>
//         </div>
//         <button
//           onClick={openAdd}
//           className="px-4 py-2 border border-teal-500 text-teal-600 text-sm font-semibold rounded-lg hover:bg-teal-50 transition-colors duration-200"
//         >
//           Add Address
//         </button>
//       </div>

//       {/* Feedback */}
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

//       {/* List */}
//       {loading ? (
//         <div className="flex items-center justify-center py-16">
//           <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
//         </div>
//       ) : addresses.length === 0 ? (
//         <div className="text-center py-16 text-gray-400 text-sm">
//           No addresses yet. Add one to get started.
//         </div>
//       ) : (
//         <div className="flex flex-col gap-3">
//           {addresses.map((addr) => (
//             <AddressCard
//               key={addr._id}
//               address={addr}
//               isDeleting={deleting === addr._id}
//               onEdit={openEdit}
//               onDelete={deleteAddress}
//             />
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {modalOpen && (
//         <AddressFormModal
//           existing={editTarget}
//           onClose={closeModal}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import { useAddresses } from "../components/address/useAddresses";
import AddressCard from "../components/address/AddressCard";
import AddressFormModal from "../components/address/AddressFormModal";
import AccountSidebar from "../components/account/AccountSidebar";
import type { IAddress, AddressFormData } from "../types/address";

export default function AddressPage() {
  const { addresses, loading, deleting, message, addAddress, updateAddress, deleteAddress } =
    useAddresses();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<IAddress | null>(null);

  const openAdd = () => { setEditTarget(null); setModalOpen(true); };
  const openEdit = (addr: IAddress) => { setEditTarget(addr); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); };

  const handleSubmit = async (data: AddressFormData) => {
    if (editTarget) {
      await updateAddress(editTarget._id, data);
    } else {
      await addAddress(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-6">

          {/* ── Sidebar ── */}
          <div className="col-span-12 lg:col-span-4 sticky top-6">
            <AccountSidebar />
          </div>

          {/* ── Main content ── */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full">

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Address</h2>
                  <p className="text-sm text-gray-400 mt-0.5">Manage Your Addresses</p>
                </div>
                <button
                  onClick={openAdd}
                  className="px-4 py-2 border border-teal-500 text-CustomGreen text-sm font-semibold rounded-lg hover:bg-teal-50 transition-colors duration-200"
                >
                  Add Address
                </button>
              </div>

              {/* Feedback */}
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

              {/* List */}
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-16 text-gray-400 text-sm">
                  No addresses yet. Add one to get started.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {addresses.map((addr) => (
                    <AddressCard
                      key={addr._id}
                      address={addr}
                      isDeleting={deleting === addr._id}
                      onEdit={openEdit}
                      onDelete={deleteAddress}
                    />
                  ))}
                </div>
              )}

              {/* Modal */}
              {modalOpen && (
                <AddressFormModal
                  existing={editTarget}
                  onClose={closeModal}
                  onSubmit={handleSubmit}
                />
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}