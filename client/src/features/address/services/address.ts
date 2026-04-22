import { api } from "../../../services/axios";
import type { IAddress, AddressFormData } from "../types/address";

const BASE = "/addresses";

export const addressService = {
  getAll: async (): Promise<IAddress[]> => {
    const res = await api.get(BASE);
    return res.data.data;
  },

  add: async (data: AddressFormData): Promise<IAddress> => {
    const res = await api.post(BASE, data);
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
