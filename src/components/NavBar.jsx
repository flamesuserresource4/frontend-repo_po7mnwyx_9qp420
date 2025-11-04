import React from "react";
import { Home, ShoppingCart, User, Search } from "lucide-react";

// Top navigation with logo, desktop search affordance, cart badge, and account menu stub
// Accessible, responsive, and keyboard-friendly.
export default function NavBar({ cartCount = 0, onSearchFocus }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-neutral-900/80 border-b border-neutral-200/60 dark:border-neutral-800">
      <nav
        className="mx-auto max-w-6xl px-4 md:px-6"
        aria-label="Primary"
        role="navigation"
      >
        <div className="flex items-center justify-between h-14">
          <a
            href="#"
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            aria-label="GharKaKhana home"
          >
            <Home className="h-5 w-5 text-emerald-600" aria-hidden />
            <span className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              GharKaKhana
            </span>
          </a>

          {/* Desktop inline search trigger (non-blocking) */}
          <button
            onClick={onSearchFocus}
            className="hidden md:flex items-center gap-2 px-3 py-2 text-sm rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Focus search"
          >
            <Search className="h-4 w-4" aria-hidden />
            <span className="sr-only md:not-sr-only">Search dishes, chefs, cuisines</span>
          </button>

          <div className="flex items-center gap-3">
            <a
              href="#cart"
              className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label={`Cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              <ShoppingCart className="h-5 w-5" aria-hidden />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 min-w-[1.25rem] px-1 rounded-full bg-emerald-600 text-white text-xs leading-5 text-center" aria-live="polite">
                  {cartCount}
                </span>
              )}
            </a>
            <button
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Account menu"
            >
              <User className="h-5 w-5" aria-hidden />
              <span className="hidden sm:inline text-sm">Account</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
