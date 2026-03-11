/**
 * lib/stripe.ts
 *
 * Sets up the Stripe payment library for the browser.
 * Stripe handles all the scary credit card stuff so you don't have to.
 * You never touch actual card numbers — Stripe's checkout does that securely.
 *
 * YouTube Episode: Week 10 — "Stripe Checkout Integration"
 *
 * To set up: Create a Stripe account at stripe.com,
 * then copy your publishable key into the .env file.
 */

import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''

// loadStripe returns a promise — it loads Stripe's JavaScript asynchronously
export const stripePromise = loadStripe(stripePublishableKey)
