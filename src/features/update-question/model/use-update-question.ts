import { useEvent } from "@reactuses/core";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { updateQuestion } from "@/server/questions";
import { getActionErrorMessage } from "@/shared/auth";
import { toast } from "@/shared/ui-kit/components/ui/toast";

type UseUpdateQuestionParams = {
  id: number;
  body: string;
};

type UseUpdateQuestionResult = {
  question: UseUpdateQuestionParams;
  onSave: (body: string) => Promise<void>;
  onCancel: () => void;
};

export function useUpdateQuestion({ id, body }: UseUpdateQuestionParams): UseUpdateQuestionResult {
  const navigate = useNavigate();
  const router = useRouter();
  const question = { id, body };

  const onCancel = useEvent(() => {
    router.history.back();
  });

  const onSave = useEvent(async (nextBody: string) => {
    const trimmedBody = nextBody.trim();

    if (trimmedBody === question.body) {
      await navigate({ to: "/questions/$id", params: { id: String(id) } });

      return;
    }

    try {
      await updateQuestion({ data: { id, body: trimmedBody } });
      await router.invalidate();

      toast.add({ title: "Updated" });

      await navigate({ to: "/questions/$id", params: { id: String(id) } });
    } catch (error) {
      toast.add({ title: getActionErrorMessage(error), type: "error" });
    }
  });

  return {
    question,
    onSave,
    onCancel,
  };
}
