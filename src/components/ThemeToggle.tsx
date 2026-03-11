/**
 * ThemeToggle.tsx
 *
 * A three-button toggle for switching between light, dark, and system themes.
 * Uses Sun, Moon, and Monitor icons from Lucide.
 *
 * The active theme is stored in Zustand and persisted to localStorage,
 * so it survives page refreshes. "System" follows your OS dark/light preference.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 */

import { Sun, Moon, Monitor } from 'lucide-react'
import { useThemeStore } from '../lib/theme'

const options = [
  { mode: 'light' as const, icon: Sun, label: 'Light' },
  { mode: 'dark' as const, icon: Moon, label: 'Dark' },
  { mode: 'system' as const, icon: Monitor, label: 'System' },
]

export default function ThemeToggle() {
  const mode = useThemeStore((state) => state.mode)
  const setMode = useThemeStore((state) => state.setMode)

  return (
    <div className="flex items-center gap-1 bg-card-hover rounded-lg p-1">
      {options.map(({ mode: m, icon: Icon, label }) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-colors flex-1 justify-center ${
            mode === m
              ? 'bg-card text-heading font-medium shadow-sm'
              : 'text-muted hover:text-heading'
          }`}
          title={label}
        >
          <Icon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}
