/**
 * App.tsx
 *
 * The root of the entire application. Sets up two layout zones:
 *
 * 1. Admin routes (/) — wrapped in AdminLayout with sidebar navigation
 * 2. Store routes (/store) — wrapped in StoreLayout with store header/footer
 *
 * This separation means the admin backend and the public storefront
 * have completely different layouts, just like Shopify.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * To add a new admin page: Import the component, add a <Route> inside AdminLayout.
 * To add a new store page: Import the component, add a <Route> inside StoreLayout.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import StoreLayout from './components/StoreLayout'
import Dashboard from './modules/dashboard/Dashboard'
import ProductList from './modules/inventory/ProductList'
import InventoryList from './modules/inventory/InventoryList'
import ProductForm from './modules/inventory/ProductForm'
import RecipeBuilder from './modules/inventory/RecipeBuilder'
import CostCalculator from './modules/inventory/CostCalculator'
import StoreFront from './modules/store/StoreFront'
import StoreManager from './modules/store/StoreManager'
import Checkout from './modules/store/Checkout'
import ComingSoon from './components/ComingSoon'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---- Admin routes — sidebar layout ---- */}
        <Route element={<AdminLayout />}>
          {/* Dashboard — the home page */}
          <Route path="/" element={<Dashboard />} />

          {/* Analytics — Week 12 */}
          <Route path="/analytics" element={<ComingSoon module="Analytics" episode={12} />} />

          {/* Orders — Week 10 */}
          <Route path="/orders" element={<ComingSoon module="Orders" episode={10} />} />

          {/* Quick Sale / POS — Week 4 */}
          <Route path="/pos" element={<ComingSoon module="Quick Sale" episode={4} />} />

          {/* Shipping — Week 10 */}
          <Route path="/shipping" element={<ComingSoon module="Ship Order" episode={10} />} />

          {/* Products — catalog management (BUILT) */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id/edit" element={<ProductForm />} />

          {/* Inventory — stock levels and supply (BUILT) */}
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/:id/recipe" element={<RecipeBuilder />} />
          <Route path="/inventory/costs" element={<CostCalculator />} />

          {/* Discounts — Week 10 */}
          <Route path="/discounts" element={<ComingSoon module="Discounts" episode={10} />} />

          {/* Gift Sets / Bundles — Week 10 */}
          <Route path="/bundles" element={<ComingSoon module="Gift Sets" episode={10} />} />

          {/* Newsletter — Week 9 */}
          <Route path="/newsletter" element={<ComingSoon module="Newsletter" episode={9} />} />

          {/* SMS — Week 9 */}
          <Route path="/sms" element={<ComingSoon module="SMS" episode={9} />} />

          {/* Wholesale — Week 11 */}
          <Route path="/wholesale" element={<ComingSoon module="Wholesale" episode={11} />} />

          {/* Store manager — admin view of the storefront */}
          <Route path="/store-manager" element={<StoreManager />} />

          {/* Customers / CRM — Week 7 */}
          <Route path="/customers" element={<ComingSoon module="Customers" episode={7} />} />

          {/* AI Assistant — Week 7 */}
          <Route path="/ai" element={<ComingSoon module="AI Assistant" episode={7} />} />

          {/* Settings — Week 8 */}
          <Route path="/settings" element={<ComingSoon module="Settings" episode={8} />} />
        </Route>

        {/* ---- Public store routes — store layout ---- */}
        <Route element={<StoreLayout />}>
          <Route path="/store" element={<StoreFront />} />
          <Route path="/store/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
