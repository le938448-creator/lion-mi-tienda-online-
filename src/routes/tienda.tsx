import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/tienda")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
