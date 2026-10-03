import { useBoolean, useEvent } from "@reactuses/core";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { archiveQuestion, getRandomQuestion, isNoQuestionsFoundError } from "@/server/questions";
import { getActionErrorMessage } from "@/shared/auth";
import { toast } from "@/shared/ui-kit/components/ui/toast";

type UseArchiveQuestionParams = {
  id: number;
  after?: "nextQuestion" | "refreshQuestions";
};

type UseArchiveQuestionResult = {
  isPending: boolean;
  isNoQuestionsLeft: boolean;
  onArchive: () => Promise<void>;
};

export function useArchiveQuestion({
  id,
  after = "nextQuestion",
}: UseArchiveQuestionParams): UseArchiveQuestionResult {
  const navigate = useNavigate();
  const router = useRouter();
  const { value: isPending, setTrue: setIsPendingTrue, setFalse: setIsPendingFalse } = useBoolean();
  const { value: isNoQuestionsLeft, setTrue: setIsNoQuestionsLeftTrue } = useBoolean();

  const onArchive = useEvent(async () => {
    if (isPending) return;

    setIsPendingTrue();

    try {
      await archiveQuestion({ data: id });
    } catch (error) {
      setIsPendingFalse();

      toast.add({ title: getActionErrorMessage(error), type: "error" });

      return;
    }

    toast.add({ title: "Archived" });

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
    onArchive,
  };
}
