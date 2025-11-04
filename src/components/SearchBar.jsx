import React, { forwardRef } from "react";
import { Search, MapPin } from "lucide-react";

// Search input with accessible label and mobile-friendly touch targets
const SearchBar = forwardRef(function SearchBar(
  { value, onChange, onSubmit },
  ref
) {
  return (
    <form
      className="relative max-w-3xl w-full"
      role="search"
      aria-label="Search dishes, chefs, cuisines"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <label htmlFor="search" className="sr-only">
        Search dishes, chefs, cuisines
      </label>
      <div className="flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500">
        <Search className="h-4 w-4 text-neutral-500" aria-hidden />
        <input
          id="search"
          ref={ref}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Search home-cooked meals"
          className="w-full bg-transparent outline-none placeholder:text-neutral-400 text-sm"
          inputMode="search"
          autoComplete="off"
          aria-describedby="search-help"
        />
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Select location"
        >
          <MapPin className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Near me</span>
        </button>
      </div>
      <p id="search-help" className="sr-only">
        Type to filter dishes, chefs, and cuisines.
      </p>
    </form>
  );
});

export default SearchBar;
