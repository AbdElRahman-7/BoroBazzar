import { api } from "../../../services/axios"
import type { WishlistItemType } from "../types/wishlist.types"

export const getWishlist = async (): Promise<WishlistItemType[]> => {
  const res = await api.get("/wishlist")
  return res.data.products || [];
}

export const toggleWishlist = async (productId: string) => {
  const res = await api.post("/wishlist", { productId });
  return res.data;
}

export const removeWishlist = async (productId: string) => {
  const res = await api.delete(`/wishlist/${productId}`);
  return res.data;
}