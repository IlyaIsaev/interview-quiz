export const FORBIDDEN_ACTION_MESSAGE = "Please sign in to perform this action.";

const GENERIC_ACTION_ERROR_MESSAGE = "Something went wrong, try again later";

export function getActionErrorMessage(error: unknown): string {
  const isForbiddenAction =
    error instanceof Error && error.message.includes(FORBIDDEN_ACTION_MESSAGE);

  if (isForbiddenAction) return FORBIDDEN_ACTION_MESSAGE;

  return GENERIC_ACTION_ERROR_MESSAGE;
}
