import { useState, useEffect } from "react";
import type { IAddress, AddressFormData } from "../../types/address";

const EMPTY_FORM: AddressFormData = {
  title: "Home",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  phone: "",
  isDefault: false,
};

interface Props {
  existing: IAddress | null;
  onClose: () => void;
  onSubmit: (data: AddressFormData) => Promise<void>;
}

export default function AddressFormModal({ existing, onClose, onSubmit }: Props) {
  const isEdit = !!existing;
  const [form, setForm] = useState<AddressFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(
      existing
        ? { title: existing.title, address: existing.address, city: existing.city,
            state: existing.state || "", zipCode: existing.zipCode,
            country: existing.country, phone: existing.phone, isDefault: existing.isDefault }
        : EMPTY_FORM
    );
  }, [existing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSubmit(form);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-7 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-lg font-semibold text-gray-800 mb-1">{isEdit ? "Edit Address" : "Add New Address"}</h3>
        <p className="text-sm text-gray-400 mb-5">{isEdit ? "Update your address details" : "Fill in your address details"}</p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm font-medium bg-red-50 text-red-600 border border-red-200">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Label</label>
            <div className="flex gap-2 flex-wrap">
              {["Home", "Work", "Office", "Other"].map((t) => (
                <button key={t} type="button" onClick={() => setForm((prev) => ({ ...prev, title: t }))}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                    form.title === t ? "bg-teal-500 text-white border-teal-500" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-teal-300"
                  }`}>{t}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Street Address</label>
            <input name="address" value={form.address} onChange={handleChange} required placeholder="H No, Street, Area"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">City</label>
              <input name="city" value={form.city} onChange={handleChange} required placeholder="City"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">State</label>
              <input name="state" value={form.state} onChange={handleChange} placeholder="State (optional)"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">ZIP Code</label>
              <input name="zipCode" value={form.zipCode} onChange={handleChange} required placeholder="110053"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Country</label>
              <input name="country" value={form.country} onChange={handleChange} required placeholder="India"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} required placeholder="918455885887"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition" />
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" name="isDefault" checked={form.isDefault} onChange={handleChange} className="w-4 h-4 rounded accent-teal-500" />
            <span className="text-sm text-gray-600">Set as default address</span>
          </label>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white text-sm font-semibold rounded-lg transition flex items-center justify-center gap-2">
              {saving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {saving ? "Saving..." : isEdit ? "Update Address" : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}