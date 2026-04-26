import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/poducts";
import type { UseProductsParams } from "../types/productTypes";

export function useProducts({
  q,
  category,
  subCategory,
  minPrice,
  maxPrice,
  minRating,
  sort,
  page,
  limit,
}: UseProductsParams) {
  return useQuery({
    queryKey: [
      "products",
      {
        q,
        category,
        subCategory,
        minPrice,
        maxPrice,
        minRating,
        sort,
        page,
        limit,
      },
    ],
    queryFn: async () =>
      await getProducts({
        q,
        category,
        subCategory,
        minPrice,
        maxPrice,
        minRating,
        sort,
        page,
        limit,
      }),
  });
}
