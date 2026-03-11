/**
 * CostCalculator.tsx
 *
 * A bird's-eye view of profitability across all your products.
 * Shows every product's cost, price, profit, and margin in one place
 * so you can quickly spot which products are most (and least) profitable.
 *
 * YouTube Episode: Week 6 — "Recipe Cost Calculator With Profit Margins"
 *
 * The math: profit_margin = (sale_price - total_cost) / sale_price * 100
 * For example: a candle that sells for $14 and costs $3.50 to make
 * has a margin of ($14 - $3.50) / $14 * 100 = 75%
 */

import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { useAppStore } from '../../lib/store'
import PageHeader from '../../components/PageHeader'

export default function CostCalculator() {
  const navigate = useNavigate()
  const products = useAppStore((state) => state.products)

  // Sort products by profit margin (highest first) so the best performers are on top
  const sorted = [...products].sort((a, b) => {
    const marginA = (a.price - a.cost) / a.price
    const marginB = (b.price - b.cost) / b.price
    return marginB - marginA
  })

  // Calculate totals across all products
  const totalRevenuePotential = products.reduce(
    (sum, p) => sum + p.price * p.stock_quantity,
    0
  )
  const totalCostBasis = products.reduce(
    (sum, p) => sum + p.cost * p.stock_quantity,
    0
  )
  const totalProfit = totalRevenuePotential - totalCostBasis
  const avgMargin =
    products.length > 0
      ? products.reduce((sum, p) => sum + ((p.price - p.cost) / p.price) * 100, 0) /
        products.length
      : 0

  return (
    <div>
      <PageHeader
        title="Cost Calculator"
        subtitle="Profitability analysis across all products"
        action={
          <button
            onClick={() => navigate('/inventory')}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted hover:text-heading transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-default rounded-xl p-4">
          <span className="text-xs text-muted uppercase">Revenue Potential</span>
          <p className="text-2xl font-bold text-heading mt-1">
            ${totalRevenuePotential.toFixed(2)}
          </p>
          <p className="text-xs text-faint mt-1">If all current stock sells</p>
        </div>
        <div className="bg-card border border-default rounded-xl p-4">
          <span className="text-xs text-muted uppercase">Cost Basis</span>
          <p className="text-2xl font-bold text-body mt-1">
            ${totalCostBasis.toFixed(2)}
          </p>
          <p className="text-xs text-faint mt-1">Total invested in inventory</p>
        </div>
        <div className="bg-card border border-default rounded-xl p-4">
          <span className="text-xs text-muted uppercase">Total Profit</span>
          <p className="text-2xl font-bold text-success-500 mt-1">
            ${totalProfit.toFixed(2)}
          </p>
          <p className="text-xs text-faint mt-1">If all current stock sells</p>
        </div>
        <div className="bg-card border border-default rounded-xl p-4">
          <span className="text-xs text-muted uppercase">Avg Margin</span>
          <p className="text-2xl font-bold text-flame-400 mt-1">
            {avgMargin.toFixed(1)}%
          </p>
          <p className="text-xs text-faint mt-1">Across all products</p>
        </div>
      </div>

      {/* Product profitability table */}
      <div className="bg-card border border-default rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted bg-table-header">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium text-right">Price</th>
                <th className="px-4 py-3 font-medium text-right">Cost</th>
                <th className="px-4 py-3 font-medium text-right">Profit/Unit</th>
                <th className="px-4 py-3 font-medium text-right">Margin</th>
                <th className="px-4 py-3 font-medium text-right">Stock</th>
                <th className="px-4 py-3 font-medium text-right">Total Profit</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((product) => {
                const profitPerUnit = product.price - product.cost
                const margin = (profitPerUnit / product.price) * 100
                const totalProductProfit = profitPerUnit * product.stock_quantity

                return (
                  <tr
                    key={product.id}
                    className="border-b border-subtle hover:bg-card-hover transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="text-heading font-medium">{product.name}</div>
                      <div className="text-faint text-xs">{product.sku}</div>
                    </td>
                    <td className="px-4 py-3 text-right text-heading">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-muted">
                      ${product.cost.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-success-500 font-medium">
                      ${profitPerUnit.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {margin >= 50 ? (
                          <TrendingUp className="w-3.5 h-3.5 text-success-500" />
                        ) : margin >= 25 ? (
                          <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5 text-danger-500" />
                        )}
                        <span
                          className={`font-bold ${
                            margin >= 50
                              ? 'text-success-500'
                              : margin >= 25
                                ? 'text-amber-500'
                                : 'text-danger-500'
                          }`}
                        >
                          {margin.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-body">
                      {product.stock_quantity}
                    </td>
                    <td className="px-4 py-3 text-right text-success-500 font-bold">
                      ${totalProductProfit.toFixed(2)}
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
