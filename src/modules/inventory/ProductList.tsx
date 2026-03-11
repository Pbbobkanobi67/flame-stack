/**
 * ProductList.tsx
 *
 * The Products page — your product catalog. Focused on what you sell:
 * name, category, price, cost, profit margin, and active status.
 * Use this to manage your catalog — add, edit, and delete products.
 *
 * The Inventory page (InventoryList.tsx) focuses on stock levels instead.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * To customize: Change the columns in the table, or add filtering/sorting.
 */

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  Search,
  DollarSign,
  TrendingUp,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { useAppStore } from '../../lib/store'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'
import type { Product } from '../../types'

// Which column is being sorted, and in which direction
type SortKey = 'name' | 'category' | 'price' | 'cost' | 'margin'
type SortDir = 'asc' | 'desc'

// Helper to get the margin value for sorting
function getMargin(p: Product) {
  return p.price > 0 ? ((p.price - p.cost) / p.price) * 100 : 0
}

export default function ProductList() {
  const products = useAppStore((state) => state.products)
  const deleteProduct = useAppStore((state) => state.deleteProduct)

  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  // Toggle sort: click same column flips direction, click new column sorts asc
  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  // Sort icon for column headers
  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column) return <ArrowUpDown className="w-3 h-3 opacity-30" />
    return sortDir === 'asc'
      ? <ArrowUp className="w-3 h-3 text-flame-400" />
      : <ArrowDown className="w-3 h-3 text-flame-400" />
  }

  // Filter then sort
  const filtered = useMemo(() => {
    let result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )

    result.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'name': cmp = a.name.localeCompare(b.name); break
        case 'category': cmp = a.category.localeCompare(b.category); break
        case 'price': cmp = a.price - b.price; break
        case 'cost': cmp = a.cost - b.cost; break
        case 'margin': cmp = getMargin(a) - getMargin(b); break
      }
      return sortDir === 'desc' ? -cmp : cmp
    })

    return result
  }, [products, search, sortKey, sortDir])

  // Summary stats
  const totalProducts = products.length
  const avgPrice = totalProducts > 0
    ? products.reduce((sum, p) => sum + p.price, 0) / totalProducts
    : 0
  const avgMargin = totalProducts > 0
    ? products.reduce((sum, p) => sum + getMargin(p), 0) / totalProducts
    : 0
  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.stock_quantity, 0)

  function handleDelete(id: string, name: string) {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteProduct(id)
    }
  }

  const thClass = 'px-4 py-3 font-medium cursor-pointer select-none hover:text-heading transition-colors'

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle="Manage your product catalog"
        action={
          <Link
            to="/products/new"
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-flame-500 text-white hover:bg-flame-400 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Products" value={totalProducts} icon={Package} />
        <StatCard label="Avg Price" value={`$${avgPrice.toFixed(2)}`} icon={DollarSign} />
        <StatCard label="Avg Margin" value={`${avgMargin.toFixed(0)}%`} icon={TrendingUp} trend="up" />
        <StatCard label="Revenue Potential" value={`$${totalRevenue.toFixed(0)}`} icon={DollarSign} trend="up" />
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search by name, SKU, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-input border border-default rounded-lg text-sm text-heading placeholder:text-faint focus:outline-none focus:border-flame-500 transition-colors"
        />
      </div>

      {/* Product table with sortable columns */}
      <div className="bg-card border border-default rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted bg-table-header">
                <th className={thClass} onClick={() => handleSort('name')}>
                  <span className="inline-flex items-center gap-1">Product <SortIcon column="name" /></span>
                </th>
                <th className={thClass} onClick={() => handleSort('category')}>
                  <span className="inline-flex items-center gap-1">Category <SortIcon column="category" /></span>
                </th>
                <th className={`${thClass} text-right`} onClick={() => handleSort('price')}>
                  <span className="inline-flex items-center gap-1 justify-end">Price <SortIcon column="price" /></span>
                </th>
                <th className={`${thClass} text-right`} onClick={() => handleSort('cost')}>
                  <span className="inline-flex items-center gap-1 justify-end">Cost <SortIcon column="cost" /></span>
                </th>
                <th className={`${thClass} text-right`} onClick={() => handleSort('margin')}>
                  <span className="inline-flex items-center gap-1 justify-end">Margin <SortIcon column="margin" /></span>
                </th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const margin = getMargin(product).toFixed(0)
                return (
                  <tr
                    key={product.id}
                    className="border-b border-subtle hover:bg-card-hover transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="text-heading font-medium">{product.name}</div>
                      <div className="text-faint text-xs mt-0.5">{product.sku}</div>
                    </td>
                    <td className="px-4 py-3 text-muted">{product.category}</td>
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
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/products/${product.id}/edit`}
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
                  <td colSpan={6} className="px-4 py-12 text-center text-faint">
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
