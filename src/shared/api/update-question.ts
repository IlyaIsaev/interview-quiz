import * as v from "valibot";

export const updateQuestionInputSchema = v.object({
  id: v.pipe(v.number(), v.safeInteger(), v.minValue(1)),
  body: v.pipe(v.string(), v.trim(), v.minLength(1, "Question cannot be empty")),
});

export const updateQuestionFormSchema = v.pick(updateQuestionInputSchema, ["body"]);
