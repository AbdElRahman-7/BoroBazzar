import { api } from "./axios"

export const getFProducts = async () => {
  const res = await api.get(`/products/featured`)
  return res.data.data || res.data
}

export const getPopularProducts = async () => {
  const res = await api.get(`/products/popular`)
  return res.data.data || res.data
}