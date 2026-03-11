/**
 * Checkout.tsx
 *
 * The checkout page. For now, this is a placeholder that shows the order
 * summary. In Week 10, we'll wire this up to Stripe Checkout to accept
 * real credit card payments.
 *
 * How Stripe Checkout works:
 * 1. Customer clicks "Pay Now"
 * 2. We create a Checkout Session via a Supabase Edge Function
 * 3. Stripe redirects the customer to their secure payment page
 * 4. After payment, Stripe redirects back to our success page
 * 5. A webhook confirms the payment and we update the order in Supabase
 *
 * YouTube Episode: Week 10 — "Stripe Checkout Integration"
 */

import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Lock } from 'lucide-react'
import { useCartStore } from '../../lib/store'
import PageHeader from '../../components/PageHeader'

export default function Checkout() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const getTotal = useCartStore((state) => state.getTotal)

  const subtotal = getTotal()
  const tax = subtotal * 0.0775 // San Diego sales tax
  const total = subtotal + tax

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Checkout"
        subtitle="Review your order"
        action={
          <button
            onClick={() => navigate('/store')}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </button>
        }
      />

      {/* Order summary */}
      <div className="bg-surface-800 border border-surface-600 rounded-xl p-5 mb-6">
        <h2 className="text-white font-semibold mb-4">Order Summary</h2>

        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div
              key={item.product_id}
              className="flex items-center justify-between text-sm"
            >
              <div className="text-gray-300">
                {item.product_name}
                <span className="text-gray-500 ml-2">x{item.quantity}</span>
              </div>
              <span className="text-white font-medium">
                ${(item.unit_price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-surface-600 pt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-white">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Tax (7.75%)</span>
            <span className="text-white">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-bold pt-2 border-t border-surface-600">
            <span className="text-white">Total</span>
            <span className="text-flame-400">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Stripe checkout button (placeholder for Week 10) */}
      <div className="bg-surface-800 border border-surface-600 rounded-xl p-5">
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <Lock className="w-4 h-4" />
          Payments processed securely by Stripe
        </div>
        <button
          onClick={() =>
            alert(
              'Stripe integration coming in Week 10!\n\n' +
                'This will redirect to Stripe\'s secure checkout page.'
            )
          }
          className="w-full flex items-center justify-center gap-2 py-3 bg-flame-500 text-white rounded-lg font-medium hover:bg-flame-400 transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          Pay ${total.toFixed(2)}
        </button>
      </div>
    </div>
  )
}
