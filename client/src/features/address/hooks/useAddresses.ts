import { useState, useEffect } from "react";
import { addressService } from "../services/address";
import type { IAddress, AddressFormData } from "../types/address";

export function useAddresses() {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  useEffect(() => {
    addressService
      .getAll()
      .then(setAddresses)
      .catch((err) =>
        showMessage("error", err?.response?.data?.message || "Failed to load addresses.")
      )
      .finally(() => setLoading(false));
  }, []);

  const addAddress = async (data: AddressFormData): Promise<IAddress> => {
    const saved = await addressService.add(data);
    setAddresses((prev) => [...prev, saved]);
    showMessage("success", "Address added successfully.");
    return saved;
  };

  const updateAddress = async (id: string, data: AddressFormData): Promise<IAddress> => {
    const saved = await addressService.update(id, data);
    setAddresses((prev) => prev.map((a) => (a._id === id ? saved : a)));
    showMessage("success", "Address updated successfully.");
    return saved;
  };

  const deleteAddress = async (id: string) => {
    setDeleting(id);
    try {
      await addressService.remove(id);
      setAddresses((prev) => prev.filter((a) => a._id !== id));
      showMessage("success", "Address deleted successfully.");
    } catch (err: any) {
      showMessage("error", err?.response?.data?.message || "Delete failed.");
    } finally {
      setDeleting(null);
    }
  };

  return { addresses, loading, deleting, message, addAddress, updateAddress, deleteAddress };
}