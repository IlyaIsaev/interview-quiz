export function parseQuestionPathId(id: string): number | null {
  if (!/^[1-9]\d*$/.test(id)) return null;

  const questionId = Number(id);

  return Number.isSafeInteger(questionId) ? questionId : null;
}
