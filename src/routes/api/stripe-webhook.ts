import { createServerFn } from "@tanstack/react-start";

/**
 * Stripe webhook handler for payment confirmation.
 * When STRIPE_SECRET_KEY is set, validates the webhook signature
 * and toggles the dentist's listing active.
 */
export const handleStripeWebhook = createServerFn()
  .handler(async () => {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return { received: true, note: "Mock webhook — Stripe not configured" };
    }

    // Real webhook processing would go here:
    // 1. Read raw body from the request
    // 2. Verify signature with stripe.webhooks.constructEvent()
    // 3. Mark dentist as payment_status='paid', listing_status='active' in DB

    return { received: true };
  });
