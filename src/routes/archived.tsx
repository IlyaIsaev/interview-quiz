import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEvent } from "@reactuses/core";
import { EllipsisVertical } from "lucide-react";
import type { ReactNode } from "react";
import { DeleteQuestion } from "@/features/delete-question";
import { QuestionSearch } from "@/features/question-search";
import { RestoreQuestion } from "@/features/restore-question";
import { getArchivedQuestions, type Question } from "@/server/questions";
import { readQuestionQuery } from "@/shared/api/list-questions";
import { highlightMarkdownCode } from "@/shared/ui/highlight-markdown";
import { VirtualList } from "@/shared/ui/virtual-list";
import { Button } from "@/shared/ui-kit/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/ui-kit/components/ui/dropdown-menu";
import { Separator } from "@/shared/ui-kit/components/ui/separator";

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

function questionKey(question: Question): number {
  return question.id;
}

function QuestionListActions({ children }: { children: ReactNode }): ReactNode {
  return <div className="question-actions-hover absolute top-6 right-0">{children}</div>;
}

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
      <div className="flex h-[70svh] w-[70vw] max-w-[1200px] flex-col">
        {questions.length === 0 ? (
          <p className="text-muted-foreground">
            {q ? "No matching questions." : "No archived questions."}
          </p>
        ) : (
          <VirtualList items={questions} getItemKey={questionKey}>
            {(question, index) => (
              <>
                {index > 0 ? <Separator /> : null}
                <article className="group relative py-6">
                  <QuestionListActions>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon-sm" aria-label="Question actions" />
                        }
                      >
                        <EllipsisVertical data-icon="inline-start" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <RestoreQuestion id={question.id} />
                          <DeleteQuestion id={question.id} after="refreshQuestions" />
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </QuestionListActions>
                  <div className="question prose prose-xl max-w-none pr-10">
                    <Markdown highlighter={highlightMarkdownCode}>{question.body}</Markdown>
                  </div>
                </article>
              </>
            )}
          </VirtualList>
        )}
      </div>
    </main>
  );
}
