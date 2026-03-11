/**
 * StoreHeader.tsx
 *
 * The header for the public-facing storefront. Shows the store name,
 * a cart button with item count, and a theme toggle.
 *
 * This is what customers see — clean and simple, no admin clutter.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 */

import { Link } from 'react-router-dom'
import { Flame, ShoppingBag, LayoutDashboard } from 'lucide-react'
import { useCartStore } from '../lib/store'
import ThemeToggle from './ThemeToggle'

interface StoreHeaderProps {
  onCartOpen: () => void
}

export default function StoreHeader({ onCartOpen }: StoreHeaderProps) {
  const getItemCount = useCartStore((state) => state.getItemCount)
  const itemCount = getItemCount()

  return (
    <header className="bg-card border-b border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Store name */}
          <Link to="/store" className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-flame-500" />
            <span className="text-lg font-bold text-heading">Flame Stack</span>
          </Link>

          {/* Right side: admin link + theme toggle + cart */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 rounded-lg text-muted hover:text-heading hover:bg-card-hover transition-colors"
              title="Back to Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
            </Link>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <button
              onClick={onCartOpen}
              className="relative flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-flame-500 text-white hover:bg-flame-400 transition-colors font-medium"
            >
              <ShoppingBag className="w-4 h-4" />
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
