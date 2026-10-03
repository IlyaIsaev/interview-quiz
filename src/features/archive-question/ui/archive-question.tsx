import { Archive } from "lucide-react";
import type { ReactNode } from "react";
import { useArchiveQuestion } from "../model/use-archive-question";
import { DropdownMenuItem } from "@/shared/ui-kit/components/ui/dropdown-menu";
import { Spinner } from "@/shared/ui-kit/components/ui/spinner";

type ArchiveQuestionProps = {
  id: number;
  after?: "nextQuestion" | "refreshQuestions";
};

type ArchiveStatusOverlayProps = {
  isPending: boolean;
  isNoQuestionsLeft: boolean;
};

function ArchiveStatusOverlay({ isPending, isNoQuestionsLeft }: ArchiveStatusOverlayProps) {
  if (isPending) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-background p-6">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (isNoQuestionsLeft) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-background p-6">
        <p>No questions left.</p>
      </div>
    );
  }

  return null;
}

export function ArchiveQuestion({ id, after }: ArchiveQuestionProps): ReactNode {
  const { isPending, isNoQuestionsLeft, onArchive } = useArchiveQuestion({ id, after });
  const staysOnList = after === "refreshQuestions";

  return (
    <>
      {staysOnList ? null : (
        <ArchiveStatusOverlay isPending={isPending} isNoQuestionsLeft={isNoQuestionsLeft} />
      )}
      <DropdownMenuItem
        disabled={isPending}
        onClick={() => {
          void onArchive();
        }}
      >
        {staysOnList && isPending ? <Spinner /> : <Archive />}
        Archive
      </DropdownMenuItem>
    </>
  );
}
