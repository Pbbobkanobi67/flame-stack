/**
 * ProductCard.tsx
 *
 * A single product card shown on the public storefront. Displays the product
 * image (or a placeholder), name, description, price, and an "Add to Cart" button.
 *
 * This is what your customers see when browsing your store.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * To customize: Change the card layout, add a "Quick View" modal,
 * or show variant options (size, scent, etc.).
 */

import { ShoppingCart, Package } from 'lucide-react'
import type { Product } from '../../types'
import { useCartStore } from '../../lib/store'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const isOutOfStock = product.stock_quantity === 0

  return (
    <div className="bg-card border border-default rounded-xl overflow-hidden group hover:border-flame-500/50 transition-all">
      {/* Product image area */}
      <div className="aspect-square bg-card-hover flex items-center justify-center relative overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          // Placeholder when no image is uploaded
          <div className="flex flex-col items-center text-faint">
            <Package className="w-12 h-12 mb-2" />
            <span className="text-xs">No image</span>
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-danger-500 font-bold text-sm uppercase tracking-wide">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product details */}
      <div className="p-4">
        <h3 className="text-heading font-semibold text-sm">{product.name}</h3>
        <p className="text-muted text-xs mt-1 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-flame-400 font-bold text-lg">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={() => addToCart(product)}
            disabled={isOutOfStock}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isOutOfStock
                ? 'bg-badge text-faint cursor-not-allowed'
                : 'bg-flame-500 text-white hover:bg-flame-400'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
