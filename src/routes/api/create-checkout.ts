import { createServerFn } from "@tanstack/react-start";

/**
 * Create a Stripe checkout session for the one-time dentist listing fee ($49).
 * Falls back to a mock when STRIPE_SECRET_KEY is not set.
 */
export const createCheckoutSession = createServerFn()
  .validator((data: { practiceName: string; practiceEmail: string }) => data)
  .handler(async ({ data }) => {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (stripeKey) {
      // Real Stripe integration
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(stripeKey);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: data.practiceEmail,
        line_items: [
          {
            price: "price_1TuRaCDeD9R3fEJGSQ6JyLpi",
            quantity: 1,
          },
        ],
        success_url: `${
          process.env.SITE_URL || "http://localhost:3000"
        }/register/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${
          process.env.SITE_URL || "http://localhost:3000"
        }/register/dentist`,
        metadata: {
          practiceName: data.practiceName,
        },
      });

      return {
        url: session.url,
        sessionId: session.id,
        mock: false,
      };
    }

    // Mock fallback — simulates a Stripe checkout
    const mockSessionId = `cs_mock_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    return {
      url: `/register/success?session_id=${mockSessionId}`,
      sessionId: mockSessionId,
      mock: true,
    };
  });
