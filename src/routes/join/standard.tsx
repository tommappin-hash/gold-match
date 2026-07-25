import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/join/standard")({
  loader: () => {
    throw redirect({
      href: "https://buy.stripe.com/00w3cvaFS5SxbnRfNK93y00",
      statusCode: 302,
    });
  },
  component: () => null,
});