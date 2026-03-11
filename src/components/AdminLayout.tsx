/**
 * AdminLayout.tsx
 *
 * The layout wrapper for all admin/backend pages. Shows the sidebar
 * on the left and renders the current page content on the right.
 *
 * This is the "control panel" view — only the store owner sees this.
 * Customers see the StoreLayout instead.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 */

import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-page">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
