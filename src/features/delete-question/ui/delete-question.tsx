import { useBoolean } from "@reactuses/core";
import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useDeleteQuestion } from "../model/use-delete-question";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui-kit/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/shared/ui-kit/components/ui/dropdown-menu";
import { Spinner } from "@/shared/ui-kit/components/ui/spinner";

type DeleteQuestionProps = {
  id: number;
  after?: "nextQuestion" | "refreshQuestions";
};

type DeleteStatusOverlayProps = {
  isPending: boolean;
  isNoQuestionsLeft: boolean;
};

function DeleteStatusOverlay({ isPending, isNoQuestionsLeft }: DeleteStatusOverlayProps) {
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

export function DeleteQuestion({ id, after }: DeleteQuestionProps): ReactNode {
  const {
    value: isConfirmOpen,
    setTrue: setIsConfirmOpenTrue,
    setFalse: setIsConfirmOpenFalse,
  } = useBoolean();
  const { isPending, isNoQuestionsLeft, onDelete } = useDeleteQuestion({
    id,
    after,
    onDeleted: setIsConfirmOpenFalse,
  });
  const staysOnList = after === "refreshQuestions";
  const showOverlay = !staysOnList && (!isConfirmOpen || isNoQuestionsLeft);

  return (
    <>
      {showOverlay ? (
        <DeleteStatusOverlay isPending={isPending} isNoQuestionsLeft={isNoQuestionsLeft} />
      ) : null}
      <DropdownMenuItem
        variant="destructive"
        closeOnClick={false}
        disabled={isPending}
        onClick={setIsConfirmOpenTrue}
      >
        <Trash2 />
        Delete
      </DropdownMenuItem>
      <AlertDialog
        open={isConfirmOpen}
        onOpenChange={(open) => {
          if (isPending) return;

          if (open) {
            setIsConfirmOpenTrue();

            return;
          }

          setIsConfirmOpenFalse();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this question?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isPending}
              onClick={() => {
                void onDelete();
              }}
            >
              {isPending ? <Spinner data-icon="inline-start" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
