/**
 * lib/supabase.ts
 *
 * This file creates the connection to your Supabase database.
 * Supabase is like a Firebase alternative — it gives you a database,
 * user authentication, file storage, and real-time updates, all in one.
 *
 * YouTube Episode: Week 3 — "Build a Shopify Alternative With Claude Code"
 *
 * To set up: Create a free Supabase project at supabase.com,
 * then copy your URL and anon key into the .env file.
 */

import { createClient } from '@supabase/supabase-js'

// These values come from your .env file — never put real keys in code
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// This is the Supabase client — use it everywhere you need to talk to the database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
