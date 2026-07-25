import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/join/founder")({
  loader: () => {
    throw redirect({
      href: "https://buy.stripe.com/6oUbJ1bJWbcR3VpeJG93y01",
      statusCode: 302,
    });
  },
  component: () => null,
});
