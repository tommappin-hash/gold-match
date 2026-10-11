import { createFileRoute, redirect } from "@tanstack/react-router";

// Standard tier: enter the register form flow (save the dentist row first, then
// pay the $49 standard fee). Never a bare Payment Link — a bare link would charge
// money with no row created (the orphaned-payment bug).
export const Route = createFileRoute("/join/standard")({
  loader: () => {
    throw redirect({
      to: "/register/dentist",
      search: { tier: "standard" },
      statusCode: 302,
    });
  },
  component: () => null,
});
