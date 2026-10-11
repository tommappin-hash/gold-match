import { createFileRoute, redirect } from "@tanstack/react-router";

// Supporter tier: enter the register form flow (save the dentist row first, then
// pay the $24.50 supporter rate). Never a bare Payment Link — a bare link would
// charge money with no row created (the orphaned-payment bug).
export const Route = createFileRoute("/join/supporter")({
  loader: () => {
    throw redirect({
      to: "/register/dentist",
      search: { tier: "supporter" },
      statusCode: 302,
    });
  },
  component: () => null,
});
