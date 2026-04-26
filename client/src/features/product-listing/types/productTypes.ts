export type UseProductsParams = {
  q?: string;
  category?: string;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: string;
  page?: number;
  limit?: number;
};

 
export type GetProductsParams = {
  q?: string;
  category?: string;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: string;
  page?: number;
  limit?: number;
};