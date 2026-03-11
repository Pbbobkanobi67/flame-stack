/**
 * Dashboard.tsx
 *
 * The home page of the app. Shows a quick overview of your business:
 * total products, inventory value, low stock alerts, and recent activity.
 *
 * Right now it reads from the local Zustand store (demo data).
 * In Week 12, we'll connect it to Supabase Realtime for live updates.
 *
 * YouTube Episode: Week 12 — "Real-Time Inventory Tracking With Supabase"
 */

import { Package, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react'
import { useAppStore } from '../../lib/store'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'

export default function Dashboard() {
  // Pull the product list from our store
  const products = useAppStore((state) => state.products)

  // Calculate summary stats from the product data
  const totalProducts = products.length
  const totalUnits = products.reduce((sum, p) => sum + p.stock_quantity, 0)
  const inventoryValue = products.reduce((sum, p) => sum + p.price * p.stock_quantity, 0)
  const lowStockItems = products.filter((p) => p.stock_quantity <= p.low_stock_threshold)

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Your business at a glance" />

      {/* Summary stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Products"
          value={totalProducts}
          icon={Package}
          trend="neutral"
        />
        <StatCard
          label="Total Units"
          value={totalUnits}
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          label="Inventory Value"
          value={`$${inventoryValue.toFixed(2)}`}
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          label="Low Stock"
          value={lowStockItems.length}
          icon={AlertTriangle}
          trend={lowStockItems.length > 0 ? 'warning' : 'neutral'}
        />
      </div>

      {/* Low stock alerts */}
      {lowStockItems.length > 0 && (
        <div className="bg-surface-800 border border-surface-600 rounded-xl p-5 mb-8">
          <h2 className="text-lg font-semibold text-amber-500 flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5" />
            Low Stock Alert
            <span className="text-sm font-normal text-gray-400">
              {lowStockItems.length} items
            </span>
          </h2>
          <div className="space-y-2">
            {lowStockItems.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-surface-700"
              >
                <div>
                  <span className="text-white font-medium">{product.name}</span>
                  <span className="text-gray-400 text-sm ml-2">{product.sku}</span>
                </div>
                <span
                  className={`text-sm font-bold ${
                    product.stock_quantity === 0 ? 'text-danger-500' : 'text-amber-500'
                  }`}
                >
                  {product.stock_quantity} / {product.low_stock_threshold}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick product overview table */}
      <div className="bg-surface-800 border border-surface-600 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-white mb-4">Product Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-surface-600">
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">SKU</th>
                <th className="pb-3 font-medium text-right">Price</th>
                <th className="pb-3 font-medium text-right">Cost</th>
                <th className="pb-3 font-medium text-right">Margin</th>
                <th className="pb-3 font-medium text-right">Stock</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {products.map((product) => {
                const margin = ((product.price - product.cost) / product.price * 100).toFixed(0)
                return (
                  <tr key={product.id} className="border-b border-surface-700">
                    <td className="py-3 text-white font-medium">{product.name}</td>
                    <td className="py-3 text-gray-400">{product.sku}</td>
                    <td className="py-3 text-right">${product.price.toFixed(2)}</td>
                    <td className="py-3 text-right">${product.cost.toFixed(2)}</td>
                    <td className="py-3 text-right text-success-500">{margin}%</td>
                    <td className="py-3 text-right">
                      <span
                        className={
                          product.stock_quantity <= product.low_stock_threshold
                            ? product.stock_quantity === 0
                              ? 'text-danger-500 font-bold'
                              : 'text-amber-500 font-bold'
                            : ''
                        }
                      >
                        {product.stock_quantity}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
