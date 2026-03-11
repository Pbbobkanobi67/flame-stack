/**
 * StatCard.tsx
 *
 * A small card that displays a single metric — like "Total Products: 36"
 * or "Revenue Today: $142.00". Used on the Dashboard and Inventory pages.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 */

import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral' | 'warning'
}

const trendColors = {
  up: 'text-success-500',
  down: 'text-danger-500',
  neutral: 'text-gray-400',
  warning: 'text-amber-500',
}

export default function StatCard({ label, value, icon: Icon, trend = 'neutral' }: StatCardProps) {
  return (
    <div className="bg-surface-800 border border-surface-600 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
        <Icon className={`w-4 h-4 ${trendColors[trend]}`} />
      </div>
      <p className={`text-2xl font-bold ${trendColors[trend]}`}>{value}</p>
    </div>
  )
}
