/**
 * Sidebar.tsx
 *
 * The navigation sidebar that appears on every admin page. This mirrors the
 * full feature set of a real business management platform — comparable
 * to Shopify but without the $39/month price tag.
 *
 * Items marked with a lock icon are coming in future episodes.
 * This lets viewers see the full vision from day one.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * To customize: Add new NavLink entries below when you build new modules.
 * Icons come from "lucide-react" — browse them at lucide.dev.
 */

import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BarChart3,
  ClipboardList,
  Zap,
  Truck,
  Package,
  Boxes,
  Tag,
  Gift,
  Mail,
  MessageSquare,
  Building2,
  ShoppingCart,
  Settings,
  Bot,
  Users,
  Flame,
  Lock,
} from 'lucide-react'
import ThemeToggle from './ThemeToggle'

// Each nav item: route, icon, label, and whether it's built yet
const navItems = [
  // --- Core (built) ---
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', built: true },
  { to: '/analytics', icon: BarChart3, label: 'Analytics', built: false, episode: 12 },
  { to: '/orders', icon: ClipboardList, label: 'Orders', built: false, episode: 10 },
  { to: '/pos', icon: Zap, label: 'Quick Sale', built: false, episode: 4 },
  { to: '/shipping', icon: Truck, label: 'Ship Order', built: false, episode: 10 },

  // --- Products & Inventory ---
  { to: '/products', icon: Package, label: 'Products', built: true, alias: '/inventory' },
  { to: '/inventory', icon: Boxes, label: 'Inventory', built: true },
  { to: '/discounts', icon: Tag, label: 'Discounts', built: false, episode: 10 },
  { to: '/bundles', icon: Gift, label: 'Gift Sets', built: false, episode: 10 },

  // --- Marketing & Customers ---
  { to: '/newsletter', icon: Mail, label: 'Newsletter', built: false, episode: 9 },
  { to: '/sms', icon: MessageSquare, label: 'SMS', built: false, episode: 9 },
  { to: '/wholesale', icon: Building2, label: 'Wholesale', built: false, episode: 11 },

  // --- Sales Channels ---
  { to: '/store', icon: ShoppingCart, label: 'Store', built: true },

  // --- AI & Admin ---
  { to: '/customers', icon: Users, label: 'Customers', built: false, episode: 7 },
  { to: '/ai', icon: Bot, label: 'AI Assistant', built: false, episode: 7 },
  { to: '/settings', icon: Settings, label: 'Settings', built: false, episode: 8 },
]

export default function Sidebar() {
  return (
    <aside className="w-56 bg-sidebar border-r border-default flex flex-col shrink-0">
      {/* App logo and name */}
      <div className="p-4 border-b border-default flex items-center gap-2">
        <Flame className="w-7 h-7 text-flame-500" />
        <div>
          <h1 className="text-base font-bold text-heading leading-tight">Flame Stack</h1>
          <p className="text-[11px] text-muted leading-tight">Business Suite</p>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          if (!item.built) {
            // Upcoming feature — show as locked with episode reference
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group ${
                    isActive
                      ? 'bg-card-hover text-muted'
                      : 'text-faint hover:text-muted hover:bg-card-hover'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1">{item.label}</span>
                <Lock className="w-3 h-3 opacity-40 group-hover:opacity-70 transition-opacity" />
              </NavLink>
            )
          }

          // Built feature — full interactivity
          return (
            <NavLink
              key={item.to}
              to={item.alias || item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-flame-500/15 text-flame-400 font-medium'
                    : 'text-muted hover:text-heading hover:bg-card-hover'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      {/* Footer with theme toggle */}
      <div className="p-4 border-t border-default space-y-3">
        <ThemeToggle />
        <p className="text-[11px] text-faint text-center">
          Built with Claude Code
        </p>
      </div>
    </aside>
  )
}
