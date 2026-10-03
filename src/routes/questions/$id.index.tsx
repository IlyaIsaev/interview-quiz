import { Markdown } from "@tanstack/markdown/react";
import { createFileRoute } from "@tanstack/react-router";
import { EllipsisVertical } from "lucide-react";
import { ArchiveQuestion } from "@/features/archive-question";
import { CopyQuestion } from "@/features/copy-question";
import { DeleteQuestion } from "@/features/delete-question";
import { UpdateQuestionTrigger } from "@/features/update-question";
import { highlightMarkdownCode } from "@/shared/ui/highlight-markdown";
import { Button } from "@/shared/ui-kit/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/ui-kit/components/ui/dropdown-menu";
import { Route as QuestionIdRoute } from "./$id";

export const Route = createFileRoute("/questions/$id/")({
  component: QuestionPage,
});

function QuestionPage() {
  const { question } = QuestionIdRoute.useLoaderData();

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6">
      <div className="group relative h-[70svh] w-[70vw] max-w-[1200px] [--question-actions-hover-delay:0ms]">
        <div className="question-actions-hover absolute top-0 left-full pl-1">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon-sm" aria-label="Question actions" />}
            >
              <EllipsisVertical data-icon="inline-start" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <CopyQuestion body={question.body} />
                <UpdateQuestionTrigger id={question.id} />
                <ArchiveQuestion id={question.id} />
                <DeleteQuestion id={question.id} />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <article className="question prose prose-xl max-w-none h-full w-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <Markdown highlighter={highlightMarkdownCode}>{question.body}</Markdown>
        </article>
      </div>
    </main>
  );
}
