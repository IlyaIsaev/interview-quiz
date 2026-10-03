import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { AuthSession } from "@/shared/auth";

export function getRouter() {
  return createRouter({
    routeTree,
    context: { session: null as AuthSession }, // router default before beforeLoad
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
