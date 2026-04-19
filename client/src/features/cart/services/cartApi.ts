import { api } from "../../../services/axios"
import type { CartItemType } from './../types/cart.types';

export const getCart = async (): Promise<CartItemType[]> => {
  const res = await api.get("/cart")
  // The server returns the whole cart object, we might need to extract items
  return res.data.items || [];
}

export const addToCart = async (productId: string, quantity: number, price: number) => {
  const res = await api.post("/cart", { productId, quantity, price });
  return res.data;
}

export const removeItem = async (productId: string) => {
  return api.delete(`/cart/${productId}`);
}

// Note: Server currently doesn't have a specific updateQuantity route, 
// usually addToCart handles increment or we could add a PUT /cart/:productId
export const updateQuantity = async (productId: string, quantity: number) => {
  return api.post(`/cart`, { productId, quantity }); // Reuse addToCart logic for now or add specific route
}