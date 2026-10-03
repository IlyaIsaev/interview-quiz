import { createServerFn } from "@tanstack/react-start";
import { and, eq, type SQL, sql } from "drizzle-orm";
import { createDb } from "@/server/db/client";
import { questions } from "@/server/db/schema";
import { pickRandomItem } from "@/server/pick-random-item";
import { ensureSession } from "@/server/session";
import { addQuestionInputSchema } from "@/shared/api/add-question";
import { questionsInputSchema } from "@/shared/api/list-questions";
import { updateQuestionInputSchema } from "@/shared/api/update-question";

export type Question = typeof questions.$inferSelect;

export const NO_QUESTIONS_FOUND_MESSAGE = "No questions found";

export function isNoQuestionsFoundError(error: unknown): boolean {
  return error instanceof Error && error.message.includes(NO_QUESTIONS_FOUND_MESSAGE);
}

function parseQuestionId(id: unknown): number {
  const isQuestionId = typeof id === "number" && Number.isSafeInteger(id) && id >= 1;

  if (!isQuestionId) throw new Error("Invalid question id");

  return id;
}

export const getRandomQuestion = createServerFn({ method: "GET" }).handler(
  async (): Promise<Question> => {
    const db = createDb();
    const ids = await db
      .select({ id: questions.id })
      .from(questions)
      .where(eq(questions.archived, false))
      .all();

    const picked = pickRandomItem(ids);

    if (!picked) throw new Error(NO_QUESTIONS_FOUND_MESSAGE);

    const [question] = await db
      .select()
      .from(questions)
      .where(and(eq(questions.id, picked.id), eq(questions.archived, false)))
      .all();

    if (!question) throw new Error(NO_QUESTIONS_FOUND_MESSAGE);

    return question;
  },
);

export const getQuestion = createServerFn({ method: "GET" })
  .validator((id: unknown): number | null => {
    if (typeof id !== "string" || !/^[1-9]\d*$/.test(id)) return null;

    const questionId = Number(id);

    if (!Number.isSafeInteger(questionId)) return null;

    return questionId;
  })
  .handler(async ({ data: id }): Promise<Question | null> => {
    if (id === null) return null;

    const question = await createDb()
      .select()
      .from(questions)
      .where(and(eq(questions.id, id), eq(questions.archived, false)))
      .get();

    return question ?? null;
  });

function loadQuestions({
  archived,
  query,
}: {
  archived: boolean;
  query: string;
}): Promise<Question[]> {
  const textMatch: SQL | undefined =
    query.length > 0 ? sql`instr(lower(${questions.body}), lower(${query})) > 0` : undefined;

  return createDb()
    .select()
    .from(questions)
    .where(and(eq(questions.archived, archived), textMatch))
    .orderBy(sql`${questions.body} COLLATE NOCASE`)
    .all();
}

export const getQuestions = createServerFn({ method: "GET" })
  .validator(questionsInputSchema)
  .handler(async ({ data: { query } }): Promise<Question[]> => {
    return loadQuestions({ archived: false, query });
  });

export const getArchivedQuestions = createServerFn({ method: "GET" })
  .validator(questionsInputSchema)
  .handler(async ({ data: { query } }): Promise<Question[]> => {
    return loadQuestions({ archived: true, query });
  });

export const archiveQuestion = createServerFn({ method: "POST" })
  .validator(parseQuestionId)
  .handler(async ({ data: id }) => {
    await ensureSession();

    const { meta } = await createDb()
      .update(questions)
      .set({ archived: true })
      .where(and(eq(questions.id, id), eq(questions.archived, false)))
      .run();

    if (meta.changes === 0) throw new Error("Question not found");
  });

export const restoreQuestion = createServerFn({ method: "POST" })
  .validator(parseQuestionId)
  .handler(async ({ data: id }) => {
    await ensureSession();

    const { meta } = await createDb()
      .update(questions)
      .set({ archived: false })
      .where(and(eq(questions.id, id), eq(questions.archived, true)))
      .run();

    if (meta.changes === 0) throw new Error("Question not found");
  });

export const deleteQuestion = createServerFn({ method: "POST" })
  .validator(parseQuestionId)
  .handler(async ({ data: id }) => {
    await ensureSession();

    const { meta } = await createDb().delete(questions).where(eq(questions.id, id)).run();

    if (meta.changes === 0) throw new Error("Question not found");
  });

export const updateQuestion = createServerFn({ method: "POST" })
  .validator(updateQuestionInputSchema)
  .handler(async ({ data: { id, body } }) => {
    await ensureSession();

    const { meta } = await createDb()
      .update(questions)
      .set({ body })
      .where(and(eq(questions.id, id), eq(questions.archived, false)))
      .run();

    if (meta.changes === 0) throw new Error("Question not found");
  });

export const createQuestion = createServerFn({ method: "POST" })
  .validator(addQuestionInputSchema)
  .handler(async ({ data: { body } }): Promise<Question> => {
    await ensureSession();

    const question = await createDb().insert(questions).values({ body }).returning().get();

    if (!question) throw new Error("Failed to create question");

    return question;
  });
