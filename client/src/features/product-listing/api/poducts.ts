import { api } from "../../../services/axios";
import type { GetProductsParams } from "../types/productTypes";

export async function getProducts(params: GetProductsParams) {
  const res = await api.get("/products/search", { params });

  return res.data.data;
}
