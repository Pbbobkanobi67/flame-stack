# Flame Stack Business Suite — Episode Map

Every file in this project corresponds to a YouTube episode.
Use this guide to find the code for any specific video.

## Week 3 — Build a Shopify Alternative With Claude Code

**Module:** Product & Inventory Management + E-Commerce Storefront

| File | What It Does |
|------|-------------|
| `src/App.tsx` | Main app shell, routing, sidebar |
| `src/components/Sidebar.tsx` | Navigation sidebar |
| `src/components/PageHeader.tsx` | Reusable page header |
| `src/components/StatCard.tsx` | Stat display cards |
| `src/lib/supabase.ts` | Supabase database connection |
| `src/lib/stripe.ts` | Stripe payment setup |
| `src/lib/store.ts` | App state management (Zustand) |
| `src/types/index.ts` | All data type definitions |
| `src/modules/inventory/ProductList.tsx` | Product listing with search |
| `src/modules/inventory/ProductForm.tsx` | Add/edit product form |

## Week 6 — Recipe Cost Calculator With Profit Margins

| File | What It Does |
|------|-------------|
| `src/modules/inventory/RecipeBuilder.tsx` | Bill of materials editor |
| `src/modules/inventory/CostCalculator.tsx` | Profitability analysis |

## Week 7 — AI Assistant That Imports Products From URLs

| File | What It Does |
|------|-------------|
| `src/lib/claude.ts` | Claude API wrapper |
| `src/modules/ai/AIAssistant.tsx` | AI chat interface |
| `src/modules/crm/CustomerList.tsx` | Customer management |

## Week 10 — Stripe Checkout Integration

| File | What It Does |
|------|-------------|
| `src/modules/store/StoreFront.tsx` | Public product catalog |
| `src/modules/store/Cart.tsx` | Shopping cart |
| `src/modules/store/Checkout.tsx` | Stripe checkout flow |

## Week 12 — Real-Time Inventory Tracking With Supabase

| File | What It Does |
|------|-------------|
| `src/modules/dashboard/Dashboard.tsx` | Business overview dashboard |
