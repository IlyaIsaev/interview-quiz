import { useBoolean, useEvent } from "@reactuses/core";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { deleteQuestion, getRandomQuestion, isNoQuestionsFoundError } from "@/server/questions";
import { getActionErrorMessage } from "@/shared/auth";
import { toast } from "@/shared/ui-kit/components/ui/toast";

type UseDeleteQuestionParams = {
  id: number;
  after?: "nextQuestion" | "refreshQuestions";
  onDeleted?: () => void;
};

type UseDeleteQuestionResult = {
  isPending: boolean;
  isNoQuestionsLeft: boolean;
  onDelete: () => Promise<void>;
};

export function useDeleteQuestion({
  id,
  after = "nextQuestion",
  onDeleted,
}: UseDeleteQuestionParams): UseDeleteQuestionResult {
  const navigate = useNavigate();
  const router = useRouter();
  const { value: isPending, setTrue: setIsPendingTrue, setFalse: setIsPendingFalse } = useBoolean();
  const { value: isNoQuestionsLeft, setTrue: setIsNoQuestionsLeftTrue } = useBoolean();
  const notifyDeleted = useEvent(() => {
    onDeleted?.();
  });

  const onDelete = useEvent(async () => {
    if (isPending) return;

    setIsPendingTrue();

    try {
      await deleteQuestion({ data: id });
    } catch (error) {
      setIsPendingFalse();

      toast.add({ title: getActionErrorMessage(error), type: "error" });

      return;
    }

    toast.add({ title: "Deleted" });
    notifyDeleted();

    if (after === "refreshQuestions") {
      try {
        await router.invalidate();
      } finally {
        setIsPendingFalse();
      }
    }

    if (after !== "refreshQuestions") {
      try {
        const question = await getRandomQuestion();

        await navigate({
          to: "/questions/$id",
          params: { id: String(question.id) },
          replace: true,
        });

        setIsPendingFalse();
      } catch (error) {
        setIsPendingFalse();

        const isNoQuestionsFound = isNoQuestionsFoundError(error);

        if (isNoQuestionsFound) setIsNoQuestionsLeftTrue();

        if (!isNoQuestionsFound) toast.add({ title: getActionErrorMessage(error), type: "error" });
      }
    }
  });

  return {
    isPending,
    isNoQuestionsLeft,
    onDelete,
  };
}
