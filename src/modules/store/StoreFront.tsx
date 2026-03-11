/**
 * StoreFront.tsx
 *
 * The public-facing product catalog — what your customers see when they
 * visit your store. Shows a grid of product cards with category filters,
 * a search bar, and the slide-out shopping cart.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * To customize: Add a hero banner, featured products section,
 * or sort options (price, newest, bestselling).
 */

import { useState } from 'react'
import { Search } from 'lucide-react'
import { useAppStore } from '../../lib/store'
import ProductCard from './ProductCard'
import Cart from './Cart'

export default function StoreFront() {
  const products = useAppStore((state) => state.products)

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Only show active products on the storefront
  const activeProducts = products.filter((p) => p.is_active)

  // Get unique categories for the filter buttons
  const categories = ['All', ...new Set(activeProducts.map((p) => p.category))]

  // Apply search and category filters
  const filtered = activeProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      {/* Search + category filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-input border border-default rounded-lg text-sm text-heading placeholder:text-faint focus:outline-none focus:border-flame-500 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-flame-500 text-white font-medium'
                  : 'bg-card text-muted border border-default hover:text-heading'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-faint">
          <p>No products found{search ? ` for "${search}"` : ''}.</p>
        </div>
      )}

      {/* Slide-out cart panel */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
