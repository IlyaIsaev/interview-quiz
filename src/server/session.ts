import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createAuth } from "@/server/auth";
import { FORBIDDEN_ACTION_MESSAGE } from "@/shared/auth/action-error";

export const getSession = createServerFn({ method: "GET" }).handler(async () => {
  const { headers } = getRequest();

  return createAuth().api.getSession({ headers });
});

export const ensureSession = createServerFn({ method: "GET" }).handler(async () => {
  const { headers } = getRequest();
  const session = await createAuth().api.getSession({ headers });

  if (!session) throw new Error(FORBIDDEN_ACTION_MESSAGE);

  return session;
});
