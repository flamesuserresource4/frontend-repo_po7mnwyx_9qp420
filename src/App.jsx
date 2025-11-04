import React, { useMemo, useRef, useState } from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import FilterChips from "./components/FilterChips";
import DishCard from "./components/DishCard";

// Minimal, focused landing experience for GharKaKhana using mock data only.
// This scaffold is frontend-only and designed to be expanded into the full app.

const MOCK_DISHES = [
  {
    id: "d1",
    name: "Paneer Tikka",
    chef: "Asha",
    chefId: "c1",
    images: [
      "https://images.unsplash.com/photo-1604908177079-1c99f0c2b5d5?q=80&w=1000&auto=format&fit=crop",
    ],
    cuisine: "North Indian",
    spice: 2,
    veg: true,
    allergens: ["dairy"],
    basePrice: 180,
    extras: [],
    rating: 4.6,
    ratingsCount: 320,
    etaMinutes: 30,
    description: "Smoky cottage cheese with spices.",
  },
  {
    id: "d2",
    name: "Masala Dosa",
    chef: "Ravi",
    chefId: "c2",
    images: [
      "https://images.unsplash.com/photo-1604908554021-6f1a3e6a0eef?q=80&w=1000&auto=format&fit=crop",
    ],
    cuisine: "South Indian",
    spice: 1,
    veg: true,
    allergens: ["gluten"],
    basePrice: 120,
    extras: [],
    rating: 4.4,
    ratingsCount: 210,
    etaMinutes: 25,
    description: "Crispy dosa with spiced potato filling.",
  },
  {
    id: "d3",
    name: "Chicken Curry",
    chef: "Farah",
    chefId: "c3",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
    ],
    cuisine: "North Indian",
    spice: 3,
    veg: false,
    allergens: [],
    basePrice: 240,
    extras: [],
    rating: 4.7,
    ratingsCount: 540,
    etaMinutes: 35,
    description: "Rich, homestyle chicken curry.",
  },
  {
    id: "d4",
    name: "Misal Pav",
    chef: "Meera",
    chefId: "c4",
    images: [
      "https://images.unsplash.com/photo-1635252738442-e0eaefdd0b77?q=80&w=1000&auto=format&fit=crop",
    ],
    cuisine: "Maharashtrian",
    spice: 3,
    veg: true,
    allergens: ["gluten"],
    basePrice: 150,
    extras: [],
    rating: 4.3,
    ratingsCount: 120,
    etaMinutes: 20,
    description: "Sprouted curry with farsan.",
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    veg: undefined, // true | false | undefined
    cuisines: [],
    maxEta: undefined,
    maxPrice: undefined,
  });

  const searchRef = useRef(null);

  const onAdd = (dish) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === dish.id);
      if (exists) return prev.map((i) => (i.id === dish.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id: dish.id, name: dish.name, qty: 1 }];
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_DISHES.filter((d) => {
      if (filters.veg !== undefined && d.veg !== filters.veg) return false;
      if (filters.cuisines.length && !filters.cuisines.includes(d.cuisine)) return false;
      if (filters.maxEta && d.etaMinutes > filters.maxEta) return false;
      if (filters.maxPrice && d.basePrice > filters.maxPrice) return false;
      if (!q) return true;
      return [d.name, d.cuisine, d.chef].some((f) => f.toLowerCase().includes(q));
    });
  }, [query, filters]);

  return (
    <div className="min-h-dvh bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded px-3 py-1">Skip to content</a>
      <NavBar cartCount={cart.reduce((a, i) => a + i.qty, 0)} onSearchFocus={() => searchRef.current?.focus()} />

      <main id="content" className="mx-auto max-w-6xl px-4 md:px-6 pb-24" style={{ paddingBottom: `calc(env(safe-area-inset-bottom) + 5rem)` }}>
        <section className="py-6 md:py-8">
          <div className="text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Home-cooked meals, delivered</h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">Discover local home chefs around you. Fresh, authentic, and made with love.</p>
            </div>
            <div className="w-full md:w-auto">
              <SearchBar ref={searchRef} value={query} onChange={setQuery} />
            </div>
          </div>
          <div className="mt-4">
            <FilterChips filters={filters} setFilters={setFilters} />
          </div>
        </section>

        <section aria-labelledby="trending-heading" className="py-2">
          <h2 id="trending-heading" className="sr-only">Trending today</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((dish) => (
              <DishCard key={dish.id} dish={dish} onAdd={onAdd} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-neutral-600 dark:text-neutral-400">No dishes match your filters. Try clearing some filters.</p>
            </div>
          )}
        </section>
      </main>

      {/* Mobile bottom nav stub */}
      <nav
        className="fixed bottom-0 inset-x-0 z-20 bg-white/90 dark:bg-neutral-900/90 backdrop-blur border-t border-neutral-200 dark:border-neutral-800"
        role="navigation"
        aria-label="Bottom"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="mx-auto max-w-6xl px-8 grid grid-cols-3 h-14 items-center text-sm">
          <li className="text-center">
            <a href="#" className="inline-flex flex-col items-center gap-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-2 py-1" aria-current="page">
              <span className="block w-5 h-5 rounded-full bg-emerald-600" aria-hidden></span>
              Home
            </a>
          </li>
          <li className="text-center">
            <a href="#" className="inline-flex flex-col items-center gap-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-2 py-1">
              <span className="block w-5 h-5 rounded-full bg-neutral-300 dark:bg-neutral-700" aria-hidden></span>
              Orders
            </a>
          </li>
          <li className="text-center">
            <a href="#" className="inline-flex flex-col items-center gap-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-2 py-1">
              <span className="block w-5 h-5 rounded-full bg-neutral-300 dark:bg-neutral-700" aria-hidden></span>
              Account
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
