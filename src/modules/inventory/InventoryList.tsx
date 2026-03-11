/**
 * InventoryList.tsx
 *
 * The Inventory page — focused on stock levels and supply chain.
 * Shows current stock, low stock threshold, stock status, and links
 * to the recipe builder and cost calculator for each product.
 *
 * The Products page (ProductList.tsx) focuses on catalog/pricing instead.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * To customize: Add batch tracking, reorder points, or supplier info.
 */

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Boxes,
  Calculator,
  FlaskConical,
  Search,
  DollarSign,
  AlertTriangle,
  Archive,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { useAppStore } from '../../lib/store'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'
import type { Product } from '../../types'

type SortKey = 'name' | 'sku' | 'stock' | 'threshold' | 'value'
type SortDir = 'asc' | 'desc'

export default function InventoryList() {
  const products = useAppStore((state) => state.products)

  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all')

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column) return <ArrowUpDown className="w-3 h-3 opacity-30" />
    return sortDir === 'asc'
      ? <ArrowUp className="w-3 h-3 text-flame-400" />
      : <ArrowDown className="w-3 h-3 text-flame-400" />
  }

  // Filter, then sort
  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
      if (!matchesSearch) return false

      if (stockFilter === 'low') return p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold
      if (stockFilter === 'out') return p.stock_quantity === 0
      return true
    })

    result.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'name': cmp = a.name.localeCompare(b.name); break
        case 'sku': cmp = a.sku.localeCompare(b.sku); break
        case 'stock': cmp = a.stock_quantity - b.stock_quantity; break
        case 'threshold': cmp = a.low_stock_threshold - b.low_stock_threshold; break
        case 'value': cmp = (a.cost * a.stock_quantity) - (b.cost * b.stock_quantity); break
      }
      return sortDir === 'desc' ? -cmp : cmp
    })

    return result
  }, [products, search, sortKey, sortDir, stockFilter])

  // Summary stats
  const totalUnits = products.reduce((sum, p) => sum + p.stock_quantity, 0)
  const inventoryValue = products.reduce((sum, p) => sum + p.cost * p.stock_quantity, 0)
  const retailValue = products.reduce((sum, p) => sum + p.price * p.stock_quantity, 0)
  const lowStockCount = products.filter((p) => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold).length
  const outOfStockCount = products.filter((p) => p.stock_quantity === 0).length

  function getStockStatus(p: Product) {
    if (p.stock_quantity === 0) return { label: 'Out', color: 'bg-danger-500/20 text-danger-500' }
    if (p.stock_quantity <= p.low_stock_threshold) return { label: 'Low', color: 'bg-amber-500/20 text-amber-500' }
    return { label: 'In Stock', color: 'bg-success-500/20 text-success-500' }
  }

  const thClass = 'px-4 py-3 font-medium cursor-pointer select-none hover:text-heading transition-colors'
  const filterClass = (active: boolean) =>
    `px-3 py-1.5 text-xs rounded-lg transition-colors ${
      active ? 'bg-flame-500 text-white font-medium' : 'bg-card-hover text-muted hover:text-heading'
    }`

  return (
    <div>
      <PageHeader
        title="Inventory"
        subtitle="Track stock levels and manage supply"
        action={
          <Link
            to="/inventory/costs"
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-card-hover text-body hover:bg-badge transition-colors"
          >
            <Calculator className="w-4 h-4" />
            Cost Calculator
          </Link>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Units" value={totalUnits} icon={Archive} trend="up" />
        <StatCard label="Cost Value" value={`$${inventoryValue.toFixed(2)}`} icon={DollarSign} />
        <StatCard label="Retail Value" value={`$${retailValue.toFixed(2)}`} icon={DollarSign} trend="up" />
        <StatCard
          label="Low / Out"
          value={`${lowStockCount} / ${outOfStockCount}`}
          icon={AlertTriangle}
          trend={lowStockCount + outOfStockCount > 0 ? 'warning' : 'neutral'}
        />
      </div>

      {/* Search + stock filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-input border border-default rounded-lg text-sm text-heading placeholder:text-faint focus:outline-none focus:border-flame-500 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <button className={filterClass(stockFilter === 'all')} onClick={() => setStockFilter('all')}>
            All ({products.length})
          </button>
          <button className={filterClass(stockFilter === 'low')} onClick={() => setStockFilter('low')}>
            Low Stock ({lowStockCount})
          </button>
          <button className={filterClass(stockFilter === 'out')} onClick={() => setStockFilter('out')}>
            Out of Stock ({outOfStockCount})
          </button>
        </div>
      </div>

      {/* Inventory table with sortable columns */}
      <div className="bg-card border border-default rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted bg-table-header">
                <th className={thClass} onClick={() => handleSort('name')}>
                  <span className="inline-flex items-center gap-1">Product <SortIcon column="name" /></span>
                </th>
                <th className={thClass} onClick={() => handleSort('sku')}>
                  <span className="inline-flex items-center gap-1">SKU <SortIcon column="sku" /></span>
                </th>
                <th className={`${thClass} text-right`} onClick={() => handleSort('stock')}>
                  <span className="inline-flex items-center gap-1 justify-end">Stock <SortIcon column="stock" /></span>
                </th>
                <th className={`${thClass} text-right`} onClick={() => handleSort('threshold')}>
                  <span className="inline-flex items-center gap-1 justify-end">Alert At <SortIcon column="threshold" /></span>
                </th>
                <th className="px-4 py-3 font-medium text-center">Status</th>
                <th className={`${thClass} text-right`} onClick={() => handleSort('value')}>
                  <span className="inline-flex items-center gap-1 justify-end">Value <SortIcon column="value" /></span>
                </th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const status = getStockStatus(product)
                const stockValue = product.cost * product.stock_quantity

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
                    <td className="px-4 py-3 text-right text-heading font-bold">
                      {product.stock_quantity}
                    </td>
                    <td className="px-4 py-3 text-right text-muted">
                      {product.low_stock_threshold}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-muted">
                      ${stockValue.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/inventory/${product.id}/recipe`}
                          className="p-1.5 rounded-lg text-muted hover:text-flame-400 hover:bg-flame-500/10 transition-colors"
                          title="View recipe"
                        >
                          <FlaskConical className="w-3.5 h-3.5" />
                        </Link>
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
                      : stockFilter !== 'all'
                        ? 'No products in this category.'
                        : 'No products yet.'}
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
