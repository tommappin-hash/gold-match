// Stripe webhook handler, run inside serve.ts (the Bun production server).
//
// Why this file exists: until now a successful Stripe Payment Link charge never
// auto-marked a dentist row `paid` — reconciliation was manual, and a dentist who
// paid the link without first completing the form left money captured and NO
// listing (Dana Fuhrmann, 2026-09-29). The register form now appends
// `?client_reference_id=<dentistId>&prefilled_email=<email>` to the Payment Link,
// and this handler binds the resulting `checkout.session.completed` event back to
// that row so the dentist gets instant access with zero manual steps.
//
// It is a standalone module (plain node_modules imports, no `~/` aliases) so it
// can be imported both by serve.ts and by the test harness in
// scripts/test-stripe-webhook.ts.
import { neon } from "@neondatabase/serverless";
import Stripe from "stripe";

export async function handleStripeWebhook(req: Request): Promise<Response> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response(
      "Stripe webhook not configured (STRIPE_WEBHOOK_SECRET missing)",
      { status: 503 }
    );
  }
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }
  const rawBody = await req.text();

  let event;
  try {
    // Verify with the signing secret only — no API key required. Use the async
    // variant: Bun's Web Crypto is async-only, so the sync constructEvent throws
    // "SubtleCryptoProvider cannot be used in a synchronous context".
    event = await Stripe.webhooks.constructEventAsync(rawBody, signature, webhookSecret);
  } catch (err: any) {
    return new Response(
      `Webhook signature verification failed: ${err?.message || err}`,
      { status: 400 }
    );
  }

  if (event.type !== "checkout.session.completed") {
    return new Response(JSON.stringify({ received: true, ignored: event.type }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const session = event.data.object as {
    id: string;
    client_reference_id?: string | null;
    customer_details?: { email?: string | null } | null;
    payment_intent?: string | null;
  };
  const dentistId = session.client_reference_id;
  const email = session.customer_details?.email;
  const paymentIntent = session.payment_intent;

  if (!process.env.DATABASE_URL) {
    console.error("[stripe-webhook] DATABASE_URL not set — cannot mark dentist paid");
    return new Response(JSON.stringify({ received: true, error: "no database" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const db = neon(process.env.DATABASE_URL);
    if (dentistId) {
      await db`
        UPDATE dentists
        SET payment_status = 'paid',
            listing_status = 'active',
            stripe_payment_id = ${paymentIntent || null},
            updated_at = now()
        WHERE id = ${dentistId}
      `;
      console.log(
        `[stripe-webhook] marked dentist ${dentistId} paid (pi ${paymentIntent || "?"})`
      );
    } else if (email) {
      await db`
        UPDATE dentists
        SET payment_status = 'paid',
            listing_status = 'active',
            stripe_payment_id = ${paymentIntent || null},
            updated_at = now()
        WHERE email = ${email} AND payment_status <> 'paid'
      `;
      console.log(`[stripe-webhook] marked dentist ${email} paid via email fallback`);
    } else {
      console.error(
        `[stripe-webhook] checkout.session.completed with no client_reference_id and no email — orphan payment ${session.id}`
      );
    }
  } catch (dbErr: any) {
    console.error(`[stripe-webhook] DB update failed: ${dbErr?.message || dbErr}`);
    // Return 200 so Stripe won't endlessly retry a non-retryable DB error; the
    // error is logged for manual reconciliation.
    return new Response(JSON.stringify({ received: true, error: "db update failed" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
