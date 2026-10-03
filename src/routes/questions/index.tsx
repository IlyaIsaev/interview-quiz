import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { useEvent } from "@reactuses/core";
import { QuestionList } from "@/entities/question";
import { ArchiveQuestion } from "@/features/archive-question";
import { CopyQuestionPath } from "@/features/copy-question";
import { DeleteQuestion } from "@/features/delete-question";
import { QuestionSearch } from "@/features/question-search";
import { UpdateQuestionTrigger } from "@/features/update-question";
import { getQuestions } from "@/server/questions";
import { readQuestionQuery } from "@/shared/api/list-questions";
import { parseQuestionPathId } from "@/shared/api/question";

type QuestionsSearch = {
  id?: number | string;
  q?: string;
};

function validateQuestionSearch(search: Record<string, unknown>): QuestionsSearch {
  const q = readQuestionQuery(search);
  const query = q === undefined ? {} : { q };

  if (!Object.hasOwn(search, "id")) return query;

  const { id } = search;

  if (typeof id === "number" && Number.isSafeInteger(id)) return { id, ...query };

  if (typeof id === "string") return { id, ...query };

  return { id: "", ...query };
}

function parseQuestionSearchId(id: number | string): number | null {
  if (typeof id === "number" && Number.isSafeInteger(id) && id >= 1) return id;

  if (typeof id === "number") return null;

  return parseQuestionPathId(id);
}

export const Route = createFileRoute("/questions/")({
  ssr: true,
  validateSearch: validateQuestionSearch,
  beforeLoad: ({ search }) => {
    if (search.id === undefined) return;

    const id = parseQuestionSearchId(search.id);

    if (id === null) throw notFound();

    throw redirect({
      to: "/questions/$id",
      params: { id: String(id) },
    });
  },
  loaderDeps: ({ search }) => ({
    query: search.q ?? "",
  }),
  loader: async ({ deps }) => {
    const questions = await getQuestions({ data: { query: deps.query } });

    return { questions };
  },
  head: () => ({
    meta: [{ title: "Questions" }],
  }),
  component: QuestionsPage,
  notFoundComponent: QuestionNotFound,
});

function QuestionsPage() {
  const { questions } = Route.useLoaderData();
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();

  const changeQuery = useEvent((query: string) => {
    void navigate({
      search: (prev) => ({
        ...prev,
        q: query.length > 0 ? query : undefined,
      }),
      replace: true,
    });
  });

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6">
      <QuestionSearch query={q ?? ""} onQueryChange={changeQuery} />
      <QuestionList
        questions={questions}
        empty={
          <p className="text-muted-foreground">{q ? "No matching questions." : "No questions."}</p>
        }
        slots={{
          actions: (question) => (
            <>
              <CopyQuestionPath id={question.id} />
              <UpdateQuestionTrigger id={question.id} />
              <ArchiveQuestion id={question.id} after="refreshQuestions" />
              <DeleteQuestion id={question.id} after="refreshQuestions" />
            </>
          ),
          body: (question, content) => (
            <Link to="/questions/$id" params={{ id: String(question.id) }} className="block">
              {content}
            </Link>
          ),
        }}
      />
    </main>
  );
}

function QuestionNotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <p>Question not found.</p>
    </main>
  );
}
