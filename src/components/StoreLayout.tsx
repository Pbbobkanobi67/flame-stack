/**
 * StoreLayout.tsx
 *
 * The layout wrapper for all public-facing store pages. Shows a clean
 * header with logo, cart button, and a simple footer.
 *
 * No admin sidebar — this is what customers see when shopping.
 * The admin sees the AdminLayout with the full sidebar instead.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 */

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import StoreHeader from './StoreHeader'
import Cart from '../modules/store/Cart'

export default function StoreLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <StoreHeader onCartOpen={() => setIsCartOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Store footer */}
      <footer className="bg-card border-t border-default py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-faint">
            Powered by Flame Stack Business Suite — Built with Claude Code
          </p>
        </div>
      </footer>

      {/* Slide-out cart (shared across store pages) */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
