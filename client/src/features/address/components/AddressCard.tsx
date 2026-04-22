import { useState } from "react";
import type { IAddress } from "../../types/address";

interface Props {
  address: IAddress;
  isDeleting: boolean;
  onEdit: (address: IAddress) => void;
  onDelete: (id: string) => void;
}

export default function AddressCard({ address, isDeleting, onEdit, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative border border-gray-200 rounded-xl px-5 py-4 hover:border-teal-300 transition-colors duration-200">
      {/* Title badge */}
      <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full mb-2">
        {address.title}
      </span>

      {/* Three-dot menu button */}
      <button
        onClick={() => setMenuOpen((o) => !o)}
        className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 text-gray-400 transition"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <circle cx="10" cy="4" r="1.5" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="10" cy="16" r="1.5" />
        </svg>
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[5]" onClick={() => setMenuOpen(false)} />
          <div className="absolute top-10 right-4 bg-white border border-gray-200 rounded-xl shadow-lg z-10 min-w-[130px] overflow-hidden">
            <button
              onClick={() => { onEdit(address); setMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              Edit
            </button>
            <button
              onClick={() => { onDelete(address._id); setMenuOpen(false); }}
              disabled={isDeleting}
              className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </>
      )}

      {/* Address info */}
      <p className="text-sm font-semibold text-gray-800">
        {address.address.toUpperCase()}&nbsp;&nbsp;
        <span className="font-normal text-gray-500">+{address.phone}</span>
      </p>
      <p className="text-sm text-gray-500 mt-0.5">
        {[address.address, address.city, address.state, address.country, address.zipCode]
          .filter(Boolean)
          .join(" ")}
      </p>

      {address.isDefault && (
        <span className="mt-2 inline-block text-xs font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
          Default
        </span>
      )}
    </div>
  );
}