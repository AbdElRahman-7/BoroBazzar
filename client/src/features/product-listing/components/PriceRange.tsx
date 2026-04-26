import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PriceRange() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);

  const MIN = 0;
  const MAX = 10000;

  const minPercent = ((min - MIN) / (MAX - MIN)) * 100;
  const maxPercent = ((max - MIN) / (MAX - MIN)) * 100;

  const navigate = useNavigate();
  const location = useLocation();

  const updatePrice = (min: number, max: number) => {
    const params = new URLSearchParams(location.search);

    params.set("minPrice", String(min));
    params.set("maxPrice", String(max));

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  return (
    <div className="w-full">
      <label className="text-zinc-800 select-none">Filter By Price</label>

      <div className="relative mt-6">
        <div className="h-2 bg-gray-200 rounded-full" />

        <div
          className="absolute h-2 bg-CustomGreen rounded-full top-0"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          value={min}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), max - 1000);
            setMin(value);
            updatePrice(value, max);
          }}
          className="absolute w-full top-0 appearance-none bg-transparent pointer-events-none
                     [&::-webkit-slider-thumb]:pointer-events-auto
                     [&::-webkit-slider-thumb]:bg-CustomGreen
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full"
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          value={max}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), min + 1000);
            setMax(value);
            updatePrice(min, value);
          }}
          className="absolute w-full top-0 appearance-none bg-transparent pointer-events-none
                     [&::-webkit-slider-thumb]:pointer-events-auto
                     [&::-webkit-slider-thumb]:bg-CustomGreen
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full"
        />

        <div className="flex justify-between mt-3 text-sm">
          <span>{min}$</span>
          <span>{max}$</span>
        </div>
      </div>
    </div>
  );
}

export default PriceRange;
