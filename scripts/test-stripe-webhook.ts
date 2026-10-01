// End-to-end test for the Stripe webhook → mark-dentist-paid path.
//
// Run from the site dir (which has node_modules + .env):
//   cd /home/team/shared/site
//   STRIPE_WEBHOOK_SECRET=whsec_test_abcdef bun scripts/test-stripe-webhook.ts
//
// What it proves: a signed `checkout.session.completed` event bound to a row via
// client_reference_id flips that row payment_status 'unpaid' → 'paid' (and keeps
// listing_status 'active'), which is the exact "pay → instantly build your page"
// loop the register form now produces. It also proves a forged signature is
// rejected (400). It creates a throwaway row and always deletes it.
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";
import { handleStripeWebhook } from "../server/stripe-webhook";

const TEST_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "whsec_test_1234567890";
const db = neon(process.env.DATABASE_URL!);
const testEmail = `webhook-test-${Date.now()}@example.com`;

async function doTest(): Promise<boolean> {
  // 1. Create a throwaway unpaid row (mirrors saveDentistRegistration's INSERT).
  const ins = await db`
    INSERT INTO dentists (
      practice_name, email, phone, website, address_line1, address_line2,
      city, state, zip_code, bio, services, photos, referrer,
      listing_status, payment_status
    ) VALUES (
      'WEBHOOK TEST — DELETE ME', ${testEmail}, '', '', '1 Test St', '',
      'Testville', 'TX', '00000', '', ${[]}, '[]', '',
      'active', 'unpaid'
    )
    RETURNING id
  `;
  const dentistId = String(ins[0].id);
  console.log("created throwaway row:", dentistId, "(", testEmail, ")");

  // 2. Build a checkout.session.completed event bound to that row.
  const event = {
    id: `evt_test_${Date.now()}`,
    object: "event",
    type: "checkout.session.completed",
    data: {
      object: {
        id: `cs_test_${Date.now()}`,
        object: "checkout.session",
        client_reference_id: dentistId,
        customer_details: { email: testEmail },
        payment_intent: `pi_test_${Date.now()}`,
        payment_status: "paid",
      },
    },
  };
  const payload = JSON.stringify(event);
  // Async variant: Bun's Web Crypto is async-only (the sync generateTestHeaderString
  // throws "SubtleCryptoProvider cannot be used in a synchronous context").
  const header = await Stripe.webhooks.generateTestHeaderStringAsync({
    payload,
    secret: TEST_SECRET,
  });

  // 3. Fire the webhook exactly as Stripe would (raw POST with the signature).
  const res = await handleStripeWebhook(
    new Request("http://localhost/api/stripe/webhook", {
      method: "POST",
      headers: { "stripe-signature": header },
      body: payload,
    })
  );
  console.log("webhook response:", res.status, await res.text());

  // 4. Assert the row flipped to paid (and stayed active).
  const row = await db`SELECT payment_status, listing_status FROM dentists WHERE id = ${dentistId}`;
  const ok = row[0]?.payment_status === "paid" && row[0]?.listing_status === "active";

  // 5. Also prove a BAD signature is rejected (400) — the "no forged payments" guarantee.
  const badRes = await handleStripeWebhook(
    new Request("http://localhost/api/stripe/webhook", {
      method: "POST",
      headers: { "stripe-signature": "t=9999999999,v1=deadbeef" },
      body: payload,
    })
  );
  const rejectOk = badRes.status === 400;
  console.log("bad-signature response (expect 400):", badRes.status);

  console.log(ok ? "✅ PASS: webhook marked row paid" : `❌ FAIL: row = ${JSON.stringify(row[0])}`);
  console.log(rejectOk ? "✅ PASS: forged signature rejected" : "❌ FAIL: forged signature NOT rejected");
  return ok && rejectOk;
}

async function run() {
  let pass = false;
  try {
    pass = await doTest();
  } catch (e) {
    console.error("test failed:", e?.message || e);
  } finally {
    // Guarantee cleanup even on failure.
    try {
      await db`DELETE FROM dentists WHERE email = ${testEmail}`;
      console.log("cleaned up throwaway row");
    } catch {
      console.error("cleanup failed — stray row email =", testEmail);
    }
  }
  process.exit(pass ? 0 : 1);
}

run();
