/**
 * ComingSoon.tsx
 *
 * A placeholder page for modules that haven't been built yet.
 * Shows which YouTube episode will build this feature and gives
 * a preview of what it will include — so viewers see the full
 * scope of the app from day one.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 */

import { Construction, PlayCircle } from 'lucide-react'

// Feature previews for each upcoming module
const MODULE_INFO: Record<string, { description: string; features: string[] }> = {
  Analytics: {
    description: 'Real-time business intelligence and performance tracking.',
    features: [
      'Revenue overview (today, week, month, year)',
      'Top products by revenue and units sold',
      'Sales trends and growth charts',
      'Traffic sources and conversion rates',
    ],
  },
  Orders: {
    description: 'Manage all incoming orders from your store and POS.',
    features: [
      'Order list with status filters (pending, paid, shipped)',
      'Order detail view with line items',
      'Update order status and add tracking',
      'Refund and cancellation handling',
    ],
  },
  'Quick Sale': {
    description: 'Mobile-friendly point-of-sale for in-person sales.',
    features: [
      'Product grid for fast selection',
      'Cart with quantity adjustment',
      'Cash payment with change calculator',
      'Tap-to-pay via Stripe Terminal',
      'Daily sales summary',
    ],
  },
  'Ship Order': {
    description: 'Pack and ship orders with tracking integration.',
    features: [
      'Pick list for pending orders',
      'Packing slip generator',
      'Shipping label integration',
      'Tracking number auto-update',
    ],
  },
  Discounts: {
    description: 'Create and manage discount codes and promotions.',
    features: [
      'Percentage and fixed-amount discounts',
      'Automatic discounts (buy X get Y)',
      'Expiration dates and usage limits',
      'Discount performance tracking',
    ],
  },
  'Gift Sets': {
    description: 'Bundle products together into gift sets and kits.',
    features: [
      'Create bundles from existing products',
      'Bundle pricing (discount vs individual)',
      'Inventory auto-deduction per component',
      'Gift wrapping options',
    ],
  },
  Newsletter: {
    description: 'Email marketing to keep customers coming back.',
    features: [
      'Subscriber list management',
      'Email template builder',
      'Campaign scheduling and send',
      'Open rate and click tracking',
    ],
  },
  SMS: {
    description: 'Text message marketing for flash sales and updates.',
    features: [
      'SMS subscriber opt-in',
      'Broadcast messages',
      'Order status notifications',
      'Abandoned cart reminders',
    ],
  },
  Wholesale: {
    description: 'Separate pricing and ordering for wholesale buyers.',
    features: [
      'Wholesale customer accounts',
      'Tiered pricing by volume',
      'Minimum order quantities',
      'Net-30/60 payment terms',
    ],
  },
  Customers: {
    description: 'CRM — know your customers and their buying patterns.',
    features: [
      'Customer list with purchase history',
      'Lifetime value tracking',
      'Tags and segmentation',
      'Notes per customer',
    ],
  },
  'AI Assistant': {
    description: 'Claude-powered tools to run your business smarter.',
    features: [
      'Product description generator',
      'Cost analysis and pricing advisor',
      'Import products from any URL',
      'Business strategy chat',
    ],
  },
  Settings: {
    description: 'Configure your store, notifications, and integrations.',
    features: [
      'Store name, logo, and branding',
      'Notification preferences',
      'Payment gateway settings',
      'Tax rates and shipping zones',
    ],
  },
}

interface ComingSoonProps {
  module: string
  episode: number
}

export default function ComingSoon({ module, episode }: ComingSoonProps) {
  const info = MODULE_INFO[module]

  return (
    <div className="max-w-2xl mx-auto py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <Construction className="w-12 h-12 text-flame-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">{module}</h1>
        <p className="text-gray-400">
          {info?.description || 'This module is coming soon.'}
        </p>
      </div>

      {/* Episode badge */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-flame-500/10 border border-flame-500/30 rounded-full">
          <PlayCircle className="w-4 h-4 text-flame-400" />
          <span className="text-sm text-flame-400 font-medium">
            Coming in Week {episode}
          </span>
        </div>
      </div>

      {/* Feature preview */}
      {info?.features && (
        <div className="bg-surface-800 border border-surface-600 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">What you'll build:</h2>
          <ul className="space-y-3">
            {info.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-surface-700 border border-surface-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] text-gray-500">{i + 1}</span>
                </div>
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
