/**
 * lib/claude.ts
 *
 * Wrapper for the Anthropic Claude API. This is the AI brain of the app —
 * it can generate product descriptions, analyze costs, and answer business questions.
 *
 * YouTube Episode: Week 7 — "AI Assistant That Imports Products From URLs"
 *
 * IMPORTANT: In production, API calls should go through a backend (Supabase Edge Function)
 * so your API key stays secret. This direct approach is fine for learning and demos.
 *
 * To set up: Get an API key from console.anthropic.com
 */

// For the demo, AI calls will go through a Supabase Edge Function
// This keeps the API key on the server, not in the browser
const AI_FUNCTION_URL = import.meta.env.VITE_AI_FUNCTION_URL || ''

export async function askClaude(prompt: string): Promise<string> {
  if (!AI_FUNCTION_URL) {
    return 'AI features require the VITE_AI_FUNCTION_URL environment variable. See the setup guide.'
  }

  const response = await fetch(AI_FUNCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  if (!response.ok) {
    throw new Error('AI request failed — check your Edge Function logs in Supabase')
  }

  const data = await response.json()
  return data.response
}
