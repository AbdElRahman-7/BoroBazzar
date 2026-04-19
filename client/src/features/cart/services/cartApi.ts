import { api } from "../../../services/axios"
import type { CartItemType } from './../types/cart.types';


export const getCart = async (): Promise<CartItemType[]> => {
  const res = await api.get("/cart")
  return res.data
}

export const removeItem = async (id:number)=>{
  return api.delete(`/cart/${id}`)
}

export const updateQuantity = async (id:number,quantity:number)=>{
  return api.patch(`/cart/${id}`,{quantity})
}

// GET /cart
// POST /cart
// DELETE /cart/:id

// GET /wishlist
// POST /wishlist