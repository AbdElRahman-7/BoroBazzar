import AsideFilter from "@/features/product-listing/components/AsideFilter";
import ProductCard from "@/features/products/components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import type { IProduct } from "@/types/product";
import { useSearchParams } from "react-router-dom";

function ProductListing() {
  const [searchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const subCategory = searchParams.get("subCategory") || "";
  const minPrice = parseInt(searchParams.get("minPrice") || "0");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "10000");
  const minRating = parseInt(searchParams.get("minRating") || "");
  const sort = searchParams.get("sort") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const { data, isLoading, isError } = useProducts({
    q,
    category,
    subCategory,
    minPrice,
    maxPrice,
    minRating,
    sort,
    page,
    limit,
  });

  console.log(data);

  const renderProducts = () => {
    if (isLoading)
      return <p className="text-center font-semibold my-10">Loading...</p>;
    if (isError)
      return (
        <p className="text-center font-semibold my-10">
          Error occurred while fetching products.
        </p>
      );
    if (!data || data.length === 0)
      return (
        <p className="text-center font-semibold my-10">No products found.</p>
      );

    return data.map((product: IProduct) => (
      <div key={product._id}>
        <ProductCard product={product} />
      </div>
    ));
  };

  const handleFilterClick = () => {
    const asideFilter = document.querySelector(".search_bar");
    if (asideFilter) {
      asideFilter.classList.toggle("hidden");
    }
  };
  return (
    <section className="px-10 grid grid-cols-1 lg:grid-cols-6 gap-5 mt-5">
      <button
        className="p-3 bg-zinc-300 rounded-xl cursor-pointer
      text-lg font-semibold lg:hidden"
        onClick={handleFilterClick}
      >
        Filter
      </button>
      <div className="search_bar hidden lg:block lg:col-span-1">
        <AsideFilter />
      </div>
      <div className="product-list lg:col-span-5">
        <div className="flex flex-col">
          <div className="filter-by-alphabets w-full flex justify-between items-center px-5 py-2 rounded-md bg-[#F1F1F1] mb-5">
            <p className="text-sm w-full text-zinc-600 hidden md:block">
              There are 25 products.
            </p>
            <div
              className="flex justify-between lg:justify-end 
            w-full gap-3 items-center"
            >
              <p className="text-sm text-zinc-600">Sort By</p>
              <select
                name=""
                id=""
                className="text-sm text-zinc-600 border border-zinc-400 rounded-md py-1"
              >
                <option value="">Name: A to Z</option>
                <option value="">Name: Z to A</option>
                <option value="">Price: Low to High</option>
                <option value="">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="products grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {renderProducts()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductListing;
