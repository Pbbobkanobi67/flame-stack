/**
 * RecipeBuilder.tsx
 *
 * The recipe/Bill of Materials editor. This is where you define what goes
 * into making one unit of a product — like a candle recipe with wax,
 * fragrance oil, wicks, and containers.
 *
 * This is especially useful for makers (candles, soap, food, etc.) who
 * need to track ingredient costs and calculate per-unit production costs.
 *
 * YouTube Episode: Week 6 — "Recipe Cost Calculator With Profit Margins"
 *
 * To customize: Change the default units or add new material categories.
 */

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, FlaskConical } from 'lucide-react'
import { useAppStore } from '../../lib/store'
import PageHeader from '../../components/PageHeader'
import type { RecipeItem } from '../../types'

export default function RecipeBuilder() {
  const navigate = useNavigate()
  const { id } = useParams()
  const products = useAppStore((state) => state.products)
  const product = products.find((p) => p.id === id)

  // The list of materials in this recipe
  const [items, setItems] = useState<RecipeItem[]>([
    // Example materials — replace these with your real bill of materials
    {
      id: crypto.randomUUID(),
      product_id: id || '',
      material_name: 'Base Material',
      quantity: 3.64,
      unit: 'oz',
      cost_per_unit: 0.15,
    },
    {
      id: crypto.randomUUID(),
      product_id: id || '',
      material_name: 'Additive',
      quantity: 0.36,
      unit: 'oz',
      cost_per_unit: 1.20,
    },
    {
      id: crypto.randomUUID(),
      product_id: id || '',
      material_name: 'Component A',
      quantity: 1,
      unit: 'pcs',
      cost_per_unit: 0.12,
    },
    {
      id: crypto.randomUUID(),
      product_id: id || '',
      material_name: 'Container',
      quantity: 1,
      unit: 'pcs',
      cost_per_unit: 1.50,
    },
  ])

  // Add a blank row for a new material
  function addItem() {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        product_id: id || '',
        material_name: '',
        quantity: 0,
        unit: 'oz',
        cost_per_unit: 0,
      },
    ])
  }

  // Remove a material from the recipe
  function removeItem(itemId: string) {
    setItems(items.filter((item) => item.id !== itemId))
  }

  // Update one field on one recipe item
  function updateItem(itemId: string, field: keyof RecipeItem, value: string | number) {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    )
  }

  // Calculate the total cost to make one unit of this product
  const totalCost = items.reduce(
    (sum, item) => sum + item.quantity * item.cost_per_unit,
    0
  )

  const salePrice = product?.price || 0
  const profit = salePrice - totalCost
  const margin = salePrice > 0 ? (profit / salePrice) * 100 : 0

  const inputClass =
    'w-full px-3 py-2 bg-surface-700 border border-surface-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-flame-500 transition-colors'

  return (
    <div className="max-w-3xl">
      <PageHeader
        title={`Recipe: ${product?.name || 'Unknown'}`}
        subtitle="Bill of Materials — what goes into making one unit"
        action={
          <button
            onClick={() => navigate('/inventory')}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        }
      />

      {/* Cost summary bar */}
      <div className="bg-surface-800 border border-surface-600 rounded-xl p-4 mb-6 flex items-center gap-6">
        <div>
          <span className="text-xs text-gray-400 uppercase">Total Cost</span>
          <p className="text-xl font-bold text-white">${totalCost.toFixed(2)}</p>
        </div>
        <div>
          <span className="text-xs text-gray-400 uppercase">Sale Price</span>
          <p className="text-xl font-bold text-white">${salePrice.toFixed(2)}</p>
        </div>
        <div>
          <span className="text-xs text-gray-400 uppercase">Profit</span>
          <p className="text-xl font-bold text-success-500">${profit.toFixed(2)}</p>
        </div>
        <div>
          <span className="text-xs text-gray-400 uppercase">Margin</span>
          <p
            className={`text-xl font-bold ${
              margin >= 50 ? 'text-success-500' : margin >= 25 ? 'text-amber-500' : 'text-danger-500'
            }`}
          >
            {margin.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Materials table */}
      <div className="bg-surface-800 border border-surface-600 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-flame-500" />
            Materials
          </h2>
          <button
            onClick={addItem}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-surface-700 text-gray-300 rounded-lg hover:bg-surface-600 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Material
          </button>
        </div>

        <div className="space-y-3">
          {/* Column headers */}
          <div className="grid grid-cols-12 gap-3 text-xs text-gray-400 uppercase px-1">
            <div className="col-span-4">Material</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Unit</div>
            <div className="col-span-2">Cost/Unit</div>
            <div className="col-span-1 text-right">Subtotal</div>
            <div className="col-span-1"></div>
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-3 items-center"
            >
              <div className="col-span-4">
                <input
                  type="text"
                  value={item.material_name}
                  onChange={(e) => updateItem(item.id, 'material_name', e.target.value)}
                  placeholder="Material name"
                  className={inputClass}
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  step="0.01"
                  value={item.quantity || ''}
                  onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
              <div className="col-span-2">
                <select
                  value={item.unit}
                  onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                  className={inputClass}
                >
                  <option value="oz">oz</option>
                  <option value="lbs">lbs</option>
                  <option value="g">grams</option>
                  <option value="ml">ml</option>
                  <option value="pcs">pieces</option>
                </select>
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  step="0.01"
                  value={item.cost_per_unit || ''}
                  onChange={(e) =>
                    updateItem(item.id, 'cost_per_unit', parseFloat(e.target.value) || 0)
                  }
                  placeholder="$0.00"
                  className={inputClass}
                />
              </div>
              <div className="col-span-1 text-right text-sm text-gray-300 font-medium">
                ${(item.quantity * item.cost_per_unit).toFixed(2)}
              </div>
              <div className="col-span-1 text-right">
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-danger-500 hover:bg-danger-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
