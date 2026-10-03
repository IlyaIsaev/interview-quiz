import { useRouteContext } from "@tanstack/react-router";
import type { AuthSession } from "./auth-client";

export function useAuthSession(): AuthSession {
  return useRouteContext({ from: "__root__" }).session;
}
