/**
 * lib/store.ts
 *
 * This is the app's "brain" for state management using Zustand.
 * State = the data your app is currently holding in memory.
 * For example: the list of products, the shopping cart contents, etc.
 *
 * Zustand is the simplest state manager for React — way easier than Redux.
 * You create a "store" with your data and functions to update it.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * How it works: Any component can read from and write to this store.
 * When the store updates, every component using that data re-renders automatically.
 */

import { create } from 'zustand'
import type { Product, OrderItem } from '../types'

// Demo products — generic widgets so we don't expose any real business data.
// Replace these with your own products once you connect to Supabase.
// Images use picsum.photos (free stock photos) as placeholders.
const DEMO_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Widget Alpha',
    description: 'Our flagship product. Premium materials with a clean, modern finish. Perfect for everyday use.',
    price: 14.00,
    cost: 3.50,
    sku: 'WDG-001',
    category: 'Widgets',
    image_url: 'https://picsum.photos/seed/widget-alpha/400/400',
    stock_quantity: 3,
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Widget Bravo',
    description: 'A customer favorite. Durable, lightweight, and built to last. Available in multiple sizes.',
    price: 14.00,
    cost: 3.40,
    sku: 'WDG-002',
    category: 'Widgets',
    image_url: 'https://picsum.photos/seed/widget-bravo/400/400',
    stock_quantity: 31,
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Widget Charlie',
    description: 'Great value at a lower price point. Same quality construction in a compact package.',
    price: 10.00,
    cost: 3.50,
    sku: 'WDG-003',
    category: 'Widgets',
    image_url: 'https://picsum.photos/seed/widget-charlie/400/400',
    stock_quantity: 7,
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Widget Delta',
    description: 'Our premium limited edition. Handcrafted with extra attention to detail.',
    price: 14.00,
    cost: 3.47,
    sku: 'WDG-004',
    category: 'Widgets',
    image_url: 'https://picsum.photos/seed/widget-delta/400/400',
    stock_quantity: 0,
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Widget Echo',
    description: 'The all-rounder. Versatile enough for any use case and priced to move.',
    price: 14.00,
    cost: 3.30,
    sku: 'WDG-005',
    category: 'Widgets',
    image_url: 'https://picsum.photos/seed/widget-echo/400/400',
    stock_quantity: 21,
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Widget Foxtrot',
    description: 'New addition to the lineup. Fresh design with the same reliable quality.',
    price: 10.00,
    cost: 3.32,
    sku: 'WDG-006',
    category: 'Widgets',
    image_url: 'https://picsum.photos/seed/widget-foxtrot/400/400',
    stock_quantity: 12,
    low_stock_threshold: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// -- PRODUCT STORE --
// The shape of our store — what data it holds and what actions it supports
interface AppStore {
  products: Product[]
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
}

// Create the store — this is the single source of truth for product data
export const useAppStore = create<AppStore>((set) => ({
  products: DEMO_PRODUCTS,

  // Replace the entire product list (used when loading from Supabase)
  setProducts: (products) => set({ products }),

  // Add a new product to the list
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),

  // Update specific fields on one product (e.g., change the price or stock)
  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p
      ),
    })),

  // Remove a product entirely
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
}))

// -- CART STORE --
// A separate store for the shopping cart. Keeping it separate from products
// makes the code cleaner — each store handles one concern.
//
// YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"

interface CartItem extends OrderItem {
  // OrderItem already has product_id, product_name, quantity, unit_price
}

interface CartStore {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  // Add a product to the cart (or increase quantity if already there)
  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product_id === product.id)
      if (existing) {
        // Already in cart — just bump the quantity by 1
        return {
          items: state.items.map((i) =>
            i.product_id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      // New item — add it with quantity 1
      return {
        items: [
          ...state.items,
          {
            product_id: product.id,
            product_name: product.name,
            quantity: 1,
            unit_price: product.price,
          },
        ],
      }
    }),

  // Remove a product from the cart entirely
  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product_id !== productId),
    })),

  // Set a specific quantity for an item (used by the +/- buttons)
  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.product_id !== productId) }
      }
      return {
        items: state.items.map((i) =>
          i.product_id === productId ? { ...i, quantity } : i
        ),
      }
    }),

  // Empty the cart (after successful checkout)
  clearCart: () => set({ items: [] }),

  // Calculate the cart total — price * quantity for each item, added up
  getTotal: () =>
    get().items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0),

  // How many individual items are in the cart
  getItemCount: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),
}))
