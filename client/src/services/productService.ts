import type { IProduct } from "@/types/product";
import { api } from "./axios"

export const getFProducts = async () => {
  try {
  const res = await api.get(`/products/featured`)
    
    if (typeof res.data === "string") {
      
      return [];
    }
    
    return res.data;
  } catch (error) {
    throw error;
  }
}

// services/productService.ts
export const getPopularProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await api.get("/products/popular");
    
    if (typeof response.data === "string") {
      return [];
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

