/**
 * ProductForm.tsx
 *
 * A form for creating a new product or editing an existing one.
 * When you navigate to /inventory/new, you get a blank form.
 * When you navigate to /inventory/123/edit, it loads product 123's data.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * To customize: Add new fields (like "weight" or "color") by:
 * 1. Adding the field to the Product type in types/index.ts
 * 2. Adding an input below
 * 3. Adding a column in Supabase
 */

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { useAppStore } from '../../lib/store'
import PageHeader from '../../components/PageHeader'

export default function ProductForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  const products = useAppStore((state) => state.products)
  const addProduct = useAppStore((state) => state.addProduct)
  const updateProduct = useAppStore((state) => state.updateProduct)

  // Form state — each field tracks one piece of product data
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [cost, setCost] = useState('')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState('Widgets')
  const [stockQuantity, setStockQuantity] = useState('')
  const [lowStockThreshold, setLowStockThreshold] = useState('5')

  // If editing, load the existing product's data into the form
  useEffect(() => {
    if (id) {
      const product = products.find((p) => p.id === id)
      if (product) {
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price.toString())
        setCost(product.cost.toString())
        setSku(product.sku)
        setCategory(product.category)
        setStockQuantity(product.stock_quantity.toString())
        setLowStockThreshold(product.low_stock_threshold.toString())
      }
    }
  }, [id, products])

  // When the form is submitted, save the product
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const productData = {
      name,
      description,
      price: parseFloat(price) || 0,
      cost: parseFloat(cost) || 0,
      sku,
      category,
      image_url: null,
      stock_quantity: parseInt(stockQuantity) || 0,
      low_stock_threshold: parseInt(lowStockThreshold) || 5,
      is_active: true,
      updated_at: new Date().toISOString(),
    }

    if (isEditing && id) {
      updateProduct(id, productData)
    } else {
      addProduct({
        ...productData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      })
    }

    navigate('/products')
  }

  // Shared CSS for input fields — keeps the form consistent
  const inputClass =
    'w-full px-3 py-2.5 bg-input border border-default rounded-lg text-sm text-heading placeholder:text-faint focus:outline-none focus:border-flame-500 transition-colors'
  const labelClass = 'block text-sm font-medium text-body mb-1.5'

  return (
    <div className="max-w-2xl">
      <PageHeader
        title={isEditing ? 'Edit Product' : 'New Product'}
        subtitle={isEditing ? 'Update product details' : 'Add a new product to your catalog'}
        action={
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted hover:text-heading transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info section */}
        <div className="bg-card border border-default rounded-xl p-5 space-y-4">
          <h2 className="text-heading font-semibold">Basic Information</h2>

          <div>
            <label className={labelClass}>Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Alpine Spa 7oz"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the product — scent notes, materials, what makes it special"
              rows={3}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>SKU</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g., AS-7G2"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                <option value="Widgets">Widgets</option>
                <option value="Gadgets">Gadgets</option>
                <option value="Accessories">Accessories</option>
                <option value="Bundles">Bundles</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing section */}
        <div className="bg-card border border-default rounded-xl p-5 space-y-4">
          <h2 className="text-heading font-semibold">Pricing</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Sale Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="14.00"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Cost to Make ($)</label>
              <input
                type="number"
                step="0.01"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="3.50"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Live margin preview */}
          {price && cost && (
            <div className="bg-card-hover rounded-lg p-3 text-sm">
              <span className="text-muted">Profit margin: </span>
              <span className="text-success-500 font-bold">
                {(
                  ((parseFloat(price) - parseFloat(cost)) / parseFloat(price)) *
                  100
                ).toFixed(1)}
                %
              </span>
              <span className="text-muted ml-3">Profit per unit: </span>
              <span className="text-success-500 font-bold">
                ${(parseFloat(price) - parseFloat(cost)).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Stock section */}
        <div className="bg-card border border-default rounded-xl p-5 space-y-4">
          <h2 className="text-heading font-semibold">Stock</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Current Stock</label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Low Stock Alert At</label>
              <input
                type="number"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(e.target.value)}
                placeholder="5"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-flame-500 text-white rounded-lg font-medium hover:bg-flame-400 transition-colors"
        >
          <Save className="w-4 h-4" />
          {isEditing ? 'Save Changes' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}
