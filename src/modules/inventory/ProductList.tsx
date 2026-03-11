/**
 * ProductList.tsx
 *
 * The main inventory page. Shows all your products in a table with:
 * - Name, SKU, price, cost, profit margin, and stock level
 * - Color-coded stock warnings (amber = low, red = out of stock)
 * - Buttons to add, edit, and delete products
 * - Quick link to the recipe builder and cost calculator
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * To customize: Change the columns in the table, or add filtering/sorting.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  Calculator,
  Search,
  DollarSign,
  AlertTriangle,
  Archive,
} from 'lucide-react'
import { useAppStore } from '../../lib/store'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'

export default function ProductList() {
  const products = useAppStore((state) => state.products)
  const deleteProduct = useAppStore((state) => state.deleteProduct)

  // Search filter — lets you type to find products by name or SKU
  const [search, setSearch] = useState('')
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  )

  // Calculate summary stats
  const totalUnits = products.reduce((sum, p) => sum + p.stock_quantity, 0)
  const inventoryValue = products.reduce((sum, p) => sum + p.price * p.stock_quantity, 0)
  const lowStockCount = products.filter(
    (p) => p.stock_quantity <= p.low_stock_threshold
  ).length

  // Confirm before deleting a product
  function handleDelete(id: string, name: string) {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteProduct(id)
    }
  }

  return (
    <div>
      <PageHeader
        title="Inventory"
        subtitle="Manage your products and stock levels"
        action={
          <div className="flex gap-2">
            <Link
              to="/inventory/costs"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-card-hover text-body hover:bg-badge transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Cost Calculator
            </Link>
            <Link
              to="/inventory/new"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-flame-500 text-white hover:bg-flame-400 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Link>
          </div>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Products" value={products.length} icon={Package} />
        <StatCard label="Total Units" value={totalUnits} icon={Archive} trend="up" />
        <StatCard
          label="Inventory Value"
          value={`$${inventoryValue.toFixed(2)}`}
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          label="Low Stock"
          value={lowStockCount}
          icon={AlertTriangle}
          trend={lowStockCount > 0 ? 'warning' : 'neutral'}
        />
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search products by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-input border border-default rounded-lg text-sm text-heading placeholder:text-faint focus:outline-none focus:border-flame-500 transition-colors"
        />
      </div>

      {/* Product table */}
      <div className="bg-card border border-default rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted bg-table-header">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium text-right">Price</th>
                <th className="px-4 py-3 font-medium text-right">Cost</th>
                <th className="px-4 py-3 font-medium text-right">Margin</th>
                <th className="px-4 py-3 font-medium text-right">Stock</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const margin = (
                  ((product.price - product.cost) / product.price) *
                  100
                ).toFixed(0)

                const isLow = product.stock_quantity <= product.low_stock_threshold
                const isOut = product.stock_quantity === 0

                return (
                  <tr
                    key={product.id}
                    className="border-b border-subtle hover:bg-card-hover transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="text-heading font-medium">{product.name}</div>
                      <div className="text-faint text-xs mt-0.5">{product.category}</div>
                    </td>
                    <td className="px-4 py-3 text-muted font-mono text-xs">
                      {product.sku}
                    </td>
                    <td className="px-4 py-3 text-right text-heading">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-muted">
                      ${product.cost.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-success-500 font-medium">
                      {margin}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                          isOut
                            ? 'bg-danger-500/20 text-danger-500'
                            : isLow
                              ? 'bg-amber-500/20 text-amber-500'
                              : 'bg-success-500/20 text-success-500'
                        }`}
                      >
                        {product.stock_quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/inventory/${product.id}/edit`}
                          className="p-1.5 rounded-lg text-muted hover:text-heading hover:bg-card-hover transition-colors"
                          title="Edit product"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-1.5 rounded-lg text-muted hover:text-danger-500 hover:bg-danger-500/10 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-faint">
                    {search
                      ? `No products match "${search}"`
                      : 'No products yet. Click "Add Product" to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
