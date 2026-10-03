import { useEvent } from "@reactuses/core";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { createQuestion } from "@/server/questions";
import { getActionErrorMessage } from "@/shared/auth";
import { toast } from "@/shared/ui-kit/components/ui/toast";

type UseCreateQuestionResult = {
  onSave: (body: string) => Promise<void>;
  onCancel: () => void;
};

export function useCreateQuestion(): UseCreateQuestionResult {
  const navigate = useNavigate();
  const router = useRouter();

  const onCancel = useEvent(() => {
    router.history.back();
  });

  const onSave = useEvent(async (body: string) => {
    try {
      const created = await createQuestion({ data: { body } });

      toast.add({ title: "Created" });

      await navigate({ to: "/questions/$id", params: { id: String(created.id) } });
    } catch (error) {
      toast.add({ title: getActionErrorMessage(error), type: "error" });
    }
  });

  return {
    onSave,
    onCancel,
  };
}
