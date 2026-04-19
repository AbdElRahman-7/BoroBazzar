import { api } from "../../../services/axios"
import type { WishlistItemType } from "../types/wishlist.types"


export const getWishlist = async (): Promise<WishlistItemType[]> => {
  const res = await api.get("/wishlist")
  return res.data
}

export const addWishlist = async (id:number)=>{
  return api.post(`/wishlist`, { id })
}

// GET /wishlist
// POST /wishlist