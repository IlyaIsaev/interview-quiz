import { useEventListener } from "@reactuses/core";
import { useForm } from "@tanstack/react-form";
import { Check, X } from "lucide-react";
import type { ReactNode } from "react";
import { useUpdateQuestion } from "../model/use-update-question";
import { updateQuestionFormSchema } from "@/shared/api/update-question";
import { Button } from "@/shared/ui-kit/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/shared/ui-kit/components/ui/field";
import { Spinner } from "@/shared/ui-kit/components/ui/spinner";
import { Textarea } from "@/shared/ui-kit/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui-kit/components/ui/tooltip";

type UpdateQuestionProps = {
  id: number;
  body: string;
};

export function UpdateQuestion({ id, body }: UpdateQuestionProps): ReactNode {
  const { question, onSave, onCancel } = useUpdateQuestion({ id, body });
  const form = useForm({
    defaultValues: {
      body: question.body,
    },
    validators: {
      onChange: updateQuestionFormSchema,
      onSubmit: updateQuestionFormSchema,
    },
    onSubmit: async ({ value }) => {
      await onSave(value.body);
    },
  });

  useEventListener("keydown", (event) => {
    const shouldIgnoreEscape =
      event.key !== "Escape" || event.repeat || event.isComposing || event.defaultPrevented;

    if (shouldIgnoreEscape) return;

    if (form.state.isSubmitting) return;

    event.preventDefault();

    onCancel();
  });

  return (
    <form
      className="flex h-full flex-col"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
        {([canSubmit, isSubmitting]) => (
          <>
            <div className="absolute inset-x-0 bottom-full z-10 flex justify-end gap-2 pb-2">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <span className="inline-flex">
                      <Button
                        type="submit"
                        variant="outline"
                        size="icon-sm"
                        aria-label="Accept"
                        disabled={!canSubmit || isSubmitting}
                      >
                        {isSubmitting ? (
                          <Spinner data-icon="inline-start" />
                        ) : (
                          <Check data-icon="inline-start" />
                        )}
                      </Button>
                    </span>
                  }
                />
                <TooltipContent side="bottom">Save the question</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <span className="inline-flex">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label="Cancel"
                        disabled={isSubmitting}
                        onClick={onCancel}
                      >
                        <X data-icon="inline-start" />
                      </Button>
                    </span>
                  }
                />
                <TooltipContent side="bottom">Discard changes</TooltipContent>
              </Tooltip>
            </div>
            <FieldGroup className="h-full min-h-0 gap-2">
              <form.Field name="body">
                {(field) => (
                  <Field className="h-full min-h-0" data-disabled={isSubmitting || undefined}>
                    <FieldLabel htmlFor={field.name} className="sr-only">
                      Question
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      autoFocus
                      disabled={isSubmitting}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                      }}
                      className="h-full min-h-0 resize-none text-xl md:text-xl"
                    />
                  </Field>
                )}
              </form.Field>
            </FieldGroup>
          </>
        )}
      </form.Subscribe>
    </form>
  );
}
