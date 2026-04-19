import { api } from "../../../services/axios";
import type { IProduct } from "../../../types/product";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await api.get<ApiResponse<IProduct[]>>("/products");
  return response.data.data;
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const response = await api.get<ApiResponse<IProduct>>(`/products/${id}`);
  return response.data.data;
};

