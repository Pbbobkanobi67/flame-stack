/**
 * lib/theme.ts
 *
 * Theme management using Zustand. Supports three modes:
 * - "light" (default) — clean white/gray backgrounds
 * - "dark" — the original deep charcoal theme
 * - "system" — follows your OS preference automatically
 *
 * The theme is saved to localStorage so it persists across browser sessions.
 * It works by setting a `data-theme` attribute on the <html> element,
 * which CSS variables in index.css respond to.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * To customize: Add new themes by defining new [data-theme="..."] blocks in index.css.
 */

import { create } from 'zustand'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeStore {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

// Check what the OS prefers (used when mode is "system")
function getSystemPreference(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

// Apply the theme to the <html> element so CSS variables respond
function applyTheme(mode: ThemeMode) {
  const resolved = mode === 'system' ? getSystemPreference() : mode
  document.documentElement.setAttribute('data-theme', resolved)
}

// Read the saved theme from localStorage (default: "light")
function getSavedMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  const saved = localStorage.getItem('flame-stack-theme')
  if (saved === 'light' || saved === 'dark' || saved === 'system') return saved
  return 'light'
}

// Initialize theme on load
const initialMode = getSavedMode()
applyTheme(initialMode)

export const useThemeStore = create<ThemeStore>((set) => ({
  mode: initialMode,

  setMode: (mode) => {
    localStorage.setItem('flame-stack-theme', mode)
    applyTheme(mode)
    set({ mode })
  },
}))

// Listen for OS theme changes when in "system" mode
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const currentMode = useThemeStore.getState().mode
    if (currentMode === 'system') {
      applyTheme('system')
    }
  })
}
