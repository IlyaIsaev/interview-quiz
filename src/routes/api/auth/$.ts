import { createFileRoute } from "@tanstack/react-router";

async function authApi({ request }: { request: Request }): Promise<Response> {
  const { createAuth } = await import("@/server/auth");

  return createAuth().handler(request);
}

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: authApi,
      POST: authApi,
    },
  },
});
