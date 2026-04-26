import { useState, type ChangeEvent } from "react";
import star from "../../../assets/images/star.png";
import PriceRange from "./PriceRange";
import { useLocation, useNavigate } from "react-router-dom";

function AsideFilter() {
  const [filter, setFilter] = useState({
    category: "",
    subCategory: "",
    minRating: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const categoryOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(location.search);
    const prevCategory = filter.category;

    setFilter((prev) => ({
      ...prev,
      category: prev.category === value ? "" : value,
    }));

    if (prevCategory === value) {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    navigate({ pathname: location.pathname, search: params.toString() });
  };

  const minRatingOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(location.search);
    const prevRating = filter.minRating;

    setFilter((prev) => ({
      ...prev,
      minRating: prev.minRating === value ? "" : value,
    }));

    if (prevRating === value) {
      params.delete("minRating");
    } else {
      params.set("minRating", value);
    }

    navigate({ pathname: location.pathname, search: params.toString() });
  };

  return (
    <section className="flex flex-col gap-5 mb-15">
      <div>
        <h3 className="text-zinc-800 mb-4 select-none">Shop by Category</h3>
        <div className="flex justify-between">
          <ul className="flex flex-col gap-3">
            <li className="flex gap-2 items-center">
              <input
                id="fruits"
                type="checkbox"
                className="size-4 accent-CustomGreen"
                value="fruits"
                checked={filter.category === "fruits"}
                onChange={(e) => categoryOnChangeHandler(e)}
              />
              <label
                htmlFor="fruits"
                className="text-sm text-zinc-600 cursor-pointer"
              >
                Fruits & Vegetables
              </label>
            </li>

            <li className="flex gap-2 items-center">
              <input
                id="meats"
                type="checkbox"
                className="size-4 accent-CustomGreen"
                value="meats"
                checked={filter.category === "meats"}
                onChange={(e) => categoryOnChangeHandler(e)}
              />
              <label
                htmlFor="meats"
                className="text-sm text-zinc-600 cursor-pointer"
              >
                Meats & Seafood
              </label>
            </li>

            <li className="flex gap-2 items-center">
              <input
                id="breakfast"
                type="checkbox"
                className="size-4 accent-CustomGreen"
                value="breakfast"
                checked={filter.category === "breakfast"}
                onChange={(e) => categoryOnChangeHandler(e)}
              />
              <label
                htmlFor="breakfast"
                className="text-sm text-zinc-600 cursor-pointer"
              >
                Breakfast & Dairy
              </label>
            </li>

            <li className="flex gap-2 items-center">
              <input
                id="bread"
                type="checkbox"
                className="size-4 accent-CustomGreen"
                value="bread"
                checked={filter.category === "bread"}
                onChange={(e) => categoryOnChangeHandler(e)}
              />
              <label
                htmlFor="bread"
                className="text-sm text-zinc-600 cursor-pointer"
              >
                Breads & Bakery
              </label>
            </li>

            <li className="flex gap-2 items-center">
              <input
                id="beverages"
                type="checkbox"
                className="size-4 accent-CustomGreen"
                value="beverages"
                checked={filter.category === "beverages"}
                onChange={(e) => categoryOnChangeHandler(e)}
              />
              <label
                htmlFor="beverages"
                className="text-sm text-zinc-600 cursor-pointer"
              >
                Beverages
              </label>
            </li>

            <li className="flex gap-2 items-center">
              <input
                id="frozen"
                type="checkbox"
                className="size-4 accent-CustomGreen"
                value="frozen"
                checked={filter.category === "frozen"}
                onChange={(e) => categoryOnChangeHandler(e)}
              />
              <label
                htmlFor="frozen"
                className="text-sm text-zinc-600 cursor-pointer"
              >
                Frozen Foods
              </label>
            </li>

            <li className="flex gap-2 items-center">
              <input
                id="snacks"
                type="checkbox"
                className="size-4 accent-CustomGreen"
                value="snacks"
                checked={filter.category === "snacks"}
                onChange={(e) => categoryOnChangeHandler(e)}
              />
              <label
                htmlFor="snacks"
                className="text-sm text-zinc-600 cursor-pointer"
              >
                Biscuits & Snacks
              </label>
            </li>
          </ul>
          <div className="border border-zinc-400" />
        </div>
      </div>
      <div>
        <PriceRange />
      </div>
      <div>
        <h3 className="select-none">Filter By Rating</h3>
        <ul className="flex flex-col gap-3 mt-3">
          <div className="5-stars flex items-center gap-3">
            <input
              type="checkbox"
              className="size-4 accent-CustomGreen"
              name=""
              id=""
              value="5"
              checked={filter.minRating === "5"}
              onChange={(e) => minRatingOnChangeHandler(e)}
            />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map(() => (
                <img src={star} alt="star" className="inline-block w-4 h-4" />
              ))}
            </div>
          </div>
          <div className="4-stars flex items-center gap-3">
            <input
              type="checkbox"
              className="size-4 accent-CustomGreen"
              name=""
              id=""
              value="4"
              checked={filter.minRating === "4"}
              onChange={(e) => minRatingOnChangeHandler(e)}
            />
            <div className="flex items-center gap-1">
              {Array.from({ length: 4 }).map(() => (
                <img src={star} alt="star" className="inline-block w-4 h-4" />
              ))}
            </div>
          </div>
          <div className="3-stars flex items-center gap-3">
            <input
              type="checkbox"
              className="size-4 accent-CustomGreen"
              name=""
              id=""
              value="3"
              checked={filter.minRating === "3"}
              onChange={(e) => minRatingOnChangeHandler(e)}
            />
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map(() => (
                <img src={star} alt="star" className="inline-block w-4 h-4" />
              ))}
            </div>
          </div>
          <div className="2-stars flex items-center gap-3">
            <input
              type="checkbox"
              className="size-4 accent-CustomGreen"
              name=""
              id=""
              value="2"
              checked={filter.minRating === "2"}
              onChange={(e) => minRatingOnChangeHandler(e)}
            />
            <div className="flex items-center gap-1">
              {Array.from({ length: 2 }).map(() => (
                <img src={star} alt="star" className="inline-block w-4 h-4" />
              ))}
            </div>
          </div>
          <div className="1-stars flex items-center gap-3">
            <input
              type="checkbox"
              className="size-4 accent-CustomGreen"
              name=""
              id=""
              value="1"
              checked={filter.minRating === "1"}
              onChange={(e) => minRatingOnChangeHandler(e)}
            />
            <div className="flex items-center gap-1">
              {Array.from({ length: 1 }).map(() => (
                <img src={star} alt="star" className="inline-block w-4 h-4" />
              ))}
            </div>
          </div>
        </ul>
      </div>
    </section>
  );
}

export default AsideFilter;
