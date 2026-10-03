import { Link2 } from "lucide-react";
import type { ReactNode } from "react";
import { useCopyQuestion } from "../model/use-copy-question";
import { DropdownMenuItem } from "@/shared/ui-kit/components/ui/dropdown-menu";

type CopyQuestionPathProps = {
  id: number;
};

export function CopyQuestionPath({ id }: CopyQuestionPathProps): ReactNode {
  const { onCopy } = useCopyQuestion();

  return (
    <DropdownMenuItem
      onClick={() => {
        void onCopy(new URL(`/questions/${id}`, window.location.origin).href);
      }}
    >
      <Link2 />
      Copy path
    </DropdownMenuItem>
  );
}
