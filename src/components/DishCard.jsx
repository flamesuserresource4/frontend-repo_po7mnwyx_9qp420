import React from "react";
import { Star } from "lucide-react";

function formatINR(n) {
  try {
    return new Intl.NumberFormat("en-IN").format(n);
  } catch {
    return n;
  }
}

export default function DishCard({ dish, onAdd }) {
  const vegMarker = dish.veg ? "●" : "■"; // Indian veg/non-veg markers
  const vegColor = dish.veg ? "text-green-600" : "text-red-600";

  return (
    <article
      className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-emerald-500"
      tabIndex={-1}
    >
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={dish.images?.[0]}
          alt={`${dish.name} by ${dish.chef}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100">
              <span className={`${vegColor} mr-1`} aria-hidden>{vegMarker}</span>
              {dish.name}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5" aria-label={`Cuisine ${dish.cuisine}`}>
              {dish.cuisine} • {dish.etaMinutes}m ETA
            </p>
          </div>
          <div className="inline-flex items-center gap-1 text-amber-600" aria-label={`${dish.rating} stars`}>
            <Star className="h-4 w-4 fill-current" aria-hidden />
            <span className="text-sm font-medium">{dish.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-base sm:text-lg font-semibold">₹ {formatINR(dish.basePrice)}</span>
          <button
            onClick={() => onAdd?.(dish)}
            className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label={`Add ${dish.name} to cart`}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
