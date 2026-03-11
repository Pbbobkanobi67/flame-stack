/**
 * PageHeader.tsx
 *
 * A reusable header component shown at the top of every page.
 * Keeps the UI consistent — every page gets a title, optional subtitle,
 * and an optional action button (like "Add Product").
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 */

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-heading">{title}</h1>
        {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
