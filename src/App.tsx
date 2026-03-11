/**
 * App.tsx
 *
 * The root of the entire application. This file does two things:
 * 1. Sets up the sidebar navigation (always visible on the left)
 * 2. Defines which URL goes to which page (called "routing")
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * To add a new page: Import the component, then add a <Route> below.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './modules/dashboard/Dashboard'
import ProductList from './modules/inventory/ProductList'
import ProductForm from './modules/inventory/ProductForm'
import RecipeBuilder from './modules/inventory/RecipeBuilder'
import CostCalculator from './modules/inventory/CostCalculator'
import StoreFront from './modules/store/StoreFront'
import Checkout from './modules/store/Checkout'
import ComingSoon from './components/ComingSoon'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-surface-900">
        {/* Sidebar stays visible on every page */}
        <Sidebar />

        {/* Main content area — changes based on the current URL */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
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

            {/* Products & Inventory module — BUILT */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/inventory" element={<ProductList />} />
            <Route path="/inventory/new" element={<ProductForm />} />
            <Route path="/inventory/:id/edit" element={<ProductForm />} />
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

            {/* Store module — BUILT */}
            <Route path="/store" element={<StoreFront />} />
            <Route path="/store/checkout" element={<Checkout />} />

            {/* Customers / CRM — Week 7 */}
            <Route path="/customers" element={<ComingSoon module="Customers" episode={7} />} />

            {/* AI Assistant — Week 7 */}
            <Route path="/ai" element={<ComingSoon module="AI Assistant" episode={7} />} />

            {/* Settings — Week 8 */}
            <Route path="/settings" element={<ComingSoon module="Settings" episode={8} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
