import { createFileRoute } from "@tanstack/react-router";
import { useEvent } from "@reactuses/core";
import { QuestionList } from "@/entities/question";
import { DeleteQuestion } from "@/features/delete-question";
import { QuestionSearch } from "@/features/question-search";
import { RestoreQuestion } from "@/features/restore-question";
import { getArchivedQuestions } from "@/server/questions";
import { readQuestionQuery } from "@/shared/api/list-questions";

type ArchivedSearch = {
  q?: string;
};

function validateArchivedSearch(search: Record<string, unknown>): ArchivedSearch {
  const q = readQuestionQuery(search);

  return q === undefined ? {} : { q };
}

export const Route = createFileRoute("/archived")({
  ssr: true,
  validateSearch: validateArchivedSearch,
  loaderDeps: ({ search }) => ({
    query: search.q ?? "",
  }),
  loader: async ({ deps }) => {
    const questions = await getArchivedQuestions({ data: { query: deps.query } });

    return { questions };
  },
  head: () => ({
    meta: [{ title: "Archived questions" }],
  }),
  component: ArchivedPage,
});

function ArchivedPage() {
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
          <p className="text-muted-foreground">
            {q ? "No matching questions." : "No archived questions."}
          </p>
        }
        slots={{
          actions: (question) => (
            <>
              <RestoreQuestion id={question.id} />
              <DeleteQuestion id={question.id} after="refreshQuestions" />
            </>
          ),
        }}
      />
    </main>
  );
}
