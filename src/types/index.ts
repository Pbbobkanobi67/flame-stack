/**
 * types/index.ts
 *
 * All the data shapes used across the app. Think of these as blueprints —
 * they describe what a Product looks like, what an Order contains, etc.
 * TypeScript uses these to catch mistakes before your code even runs.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * To customize: Add new fields to any type, then update the matching
 * Supabase table to include that column.
 */

// A single product in your catalog (a candle, a soap bar, etc.)
export interface Product {
  id: string
  name: string
  description: string
  price: number
  cost: number
  sku: string
  category: string
  image_url: string | null
  stock_quantity: number
  low_stock_threshold: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// One ingredient or material in a recipe
export interface RecipeItem {
  id: string
  product_id: string
  material_name: string
  quantity: number
  unit: string
  cost_per_unit: number
}

// A customer in your CRM
export interface Customer {
  id: string
  name: string
  email: string
  phone: string | null
  notes: string | null
  tags: string[]
  total_spent: number
  order_count: number
  created_at: string
}

// A single order (online or in-person)
export interface Order {
  id: string
  customer_id: string | null
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  payment_method: 'stripe' | 'cash' | 'card_present'
  source: 'online' | 'pos'
  created_at: string
}

// One line item inside an order
export interface OrderItem {
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
}

// Dashboard summary stats
export interface DashboardStats {
  revenue_today: number
  revenue_week: number
  revenue_month: number
  orders_today: number
  low_stock_count: number
  top_products: { name: string; revenue: number; units: number }[]
}
