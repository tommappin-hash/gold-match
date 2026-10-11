// DEPRECATED — this is NOT the Stripe webhook.
//
// The real Stripe webhook lives at server/stripe-webhook.ts and is wired into the
// Bun production server (serve.ts) as `POST /api/stripe/webhook`. It verifies the
// signature with STRIPE_WEBHOOK_SECRET and marks the bound dentist row paid on
// checkout.session.completed.
//
// This createServerFn stub is not an HTTP route Stripe could POST to, and it is
// not imported anywhere. It is left in place only to avoid touching route
// registration; do NOT wire payment confirmation here.
import { createServerFn } from "@tanstack/react-start";

export const handleStripeWebhook = createServerFn().handler(async () => {
  return { received: true, note: "Deprecated stub — real webhook is server/stripe-webhook.ts" };
});
