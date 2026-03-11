/**
 * StoreManager.tsx
 *
 * The admin-side view of your store. Shows the same product grid as the
 * public storefront, but inside the admin layout with the sidebar.
 *
 * Use "View Storefront" to open the public customer-facing store at /store.
 * That's what your customers see — no sidebar, clean store header + footer.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 */

import { ExternalLink } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import StoreFront from './StoreFront'

export default function StoreManager() {
  return (
    <div>
      <PageHeader
        title="Store"
        subtitle="Manage your public storefront"
        action={
          <a
            href="/store"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-flame-500 text-white hover:bg-flame-400 transition-colors font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            View Storefront
          </a>
        }
      />

      <StoreFront />
    </div>
  )
}
