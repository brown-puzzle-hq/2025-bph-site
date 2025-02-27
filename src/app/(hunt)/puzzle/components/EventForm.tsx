"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { insertAnswerToken } from "../actions";
import { Check } from "lucide-react";

function sanitizeAnswer(answer: any) {
  return typeof answer === "string"
    ? answer.toUpperCase().replace(/[^A-Z]/g, "")
    : "";
}

const formSchema = z.object({
  answer: z.preprocess(
    sanitizeAnswer,
    z
      .string()
      .min(1, { message: "Required" })
      .max(100, { message: "Max 100 characters" }),
  ),
});

type FormProps = {
  eventId: string;
};

export default function EventForm({ eventId }: FormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      answer: "",
    },
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    const result = await insertAnswerToken(eventId, data.answer);
    if (result && result.error) {
      setError(result.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  {...field}
                  onChange={(e) => {
                    form.setValue(
                      "answer",
                      e.target.value.toUpperCase().replace(/[^A-Z ]/g, ""),
                    );
                    setError(null);
                  }}
                  placeholder="TOKEN"
                  autoComplete="off"
                  className={`bg-main-bg ${error ? "text-incorrect-guess" : "text-main-text"} focus:outline-none`}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <button
          className="rounded-sm px-0.5 hover:bg-footer-bg disabled:opacity-0"
          type="submit"
          disabled={!form.watch("answer")}
        >
          <Check className="h-4 w-4" />
        </button>
      </form>
    </Form>
  );
}
