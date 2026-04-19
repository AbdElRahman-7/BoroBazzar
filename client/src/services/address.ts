import { api } from "./axios";
import type { IAddress, AddressFormData } from "../types/address";

const BASE = "/addresses";

export const addressService = {
  getAll: async (userId?: string): Promise<IAddress[]> => {
    const res = await api.get(BASE, {
      params: userId ? { userId } : undefined
    });
    return res.data.data || res.data;
  },

  add: async (data: AddressFormData): Promise<IAddress> => {
    const userId = localStorage.getItem("userId");
    const res = await api.post(BASE, { ...data, userId });
    return res.data.data;
  },

  update: async (id: string, data: AddressFormData): Promise<IAddress> => {
    const res = await api.put(`${BASE}/${id}`, data);
    return res.data.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`${BASE}/${id}`);
  },
};