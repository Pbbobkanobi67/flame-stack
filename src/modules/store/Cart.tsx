/**
 * Cart.tsx
 *
 * A slide-out shopping cart panel. Shows all items the customer has added,
 * lets them adjust quantities or remove items, and shows the running total.
 *
 * The cart state lives in Zustand (lib/store.ts) so it persists
 * even if the customer navigates between pages.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * To customize: Add a promo code field, shipping calculator, or tax estimate.
 */

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../../lib/store'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const getTotal = useCartStore((state) => state.getTotal)

  const total = getTotal()

  // Handle the "checkout" button — in Week 10, this triggers Stripe
  function handleCheckout() {
    alert(
      `Checkout coming in Week 10!\n\nTotal: $${total.toFixed(2)}\n` +
        `Items: ${items.length}\n\n` +
        `This will integrate with Stripe Checkout.`
    )
  }

  if (!isOpen) return null

  return (
    <>
      {/* Dark overlay behind the cart */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'var(--overlay-bg)' }}
        onClick={onClose}
      />

      {/* Cart panel — slides in from the right */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-default z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-default">
          <h2 className="text-heading font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-flame-500" />
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-heading hover:bg-card-hover transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-faint">
              <ShoppingBag className="w-12 h-12 mb-3" />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product_id}
                  className="flex items-center gap-3 bg-card-hover rounded-lg p-3"
                >
                  {/* Item details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-heading text-sm font-medium truncate">
                      {item.product_name}
                    </p>
                    <p className="text-flame-400 text-sm font-bold mt-0.5">
                      ${(item.unit_price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity controls: minus / number / plus */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                      className="p-1 rounded bg-badge text-muted hover:text-heading transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-heading text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="p-1 rounded bg-badge text-muted hover:text-heading transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.product_id)}
                    className="p-1.5 rounded-lg text-muted hover:text-danger-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with total and checkout */}
        {items.length > 0 && (
          <div className="p-4 border-t border-default space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="text-heading font-bold text-lg">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-flame-500 text-white rounded-lg font-medium hover:bg-flame-400 transition-colors"
            >
              Checkout — ${total.toFixed(2)}
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-sm text-muted hover:text-heading transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
