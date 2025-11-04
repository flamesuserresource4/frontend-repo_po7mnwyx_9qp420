import React from "react";

// Simple chip component used for filtering; keyboard and screen reader friendly
function Chip({ label, active, onClick, ariaLabel }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm border focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors ${
        active
          ? "bg-emerald-600 text-white border-emerald-600"
          : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
      }`}
      aria-pressed={active}
      aria-label={ariaLabel || label}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default function FilterChips({ filters, setFilters }) {
  const toggle = (key, value) => {
    setFilters((prev) => {
      if (Array.isArray(prev[key])) {
        const exists = prev[key].includes(value);
        return {
          ...prev,
          [key]: exists ? prev[key].filter((v) => v !== value) : [...prev[key], value],
        };
      }
      if (typeof prev[key] === "boolean") {
        return { ...prev, [key]: !prev[key] };
      }
      return { ...prev, [key]: value };
    });
  };

  const cuisines = ["North Indian", "South Indian", "Bengali", "Maharashtrian"];

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filters">
      <Chip
        label="Veg"
        active={filters.veg === true}
        onClick={() => toggle("veg", true)}
        ariaLabel="Veg only"
      />
      <Chip
        label="Non-Veg"
        active={filters.veg === false}
        onClick={() => toggle("veg", false)}
        ariaLabel="Non-veg only"
      />
      {cuisines.map((c) => (
        <Chip
          key={c}
          label={c}
          active={filters.cuisines.includes(c)}
          onClick={() => toggle("cuisines", c)}
        />
      ))}
      <Chip
        label="ETA ≤ 30m"
        active={filters.maxEta === 30}
        onClick={() => toggle("maxEta", 30)}
      />
      <Chip
        label="₹ Budget"
        active={filters.maxPrice === 200}
        onClick={() => toggle("maxPrice", 200)}
      />
    </div>
  );
}
