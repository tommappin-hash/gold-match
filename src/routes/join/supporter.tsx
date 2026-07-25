import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/join/supporter")({
  loader: () => {
    throw redirect({
      href: "https://buy.stripe.com/4gM00j01e4OtfE7bxu93y02",
      statusCode: 302,
    });
  },
  component: () => null,
});
