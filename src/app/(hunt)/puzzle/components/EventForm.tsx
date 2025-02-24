"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { insertAnswerToken } from "../actions";

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
    // form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center space-x-4"
      >
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="w-2/3">
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    form.setValue(
                      "answer",
                      e.target.value.toUpperCase().replace(/[^A-Z ]/g, ""),
                    );
                    setError(null);
                  }}
                  className="bg-secondary-bg text-secondary-accent"
                />
              </FormControl>
              <FormMessage className="text-error">{error}</FormMessage>
            </FormItem>
          )}
        />
        <Button
          className="hover:bg-otherblue"
          type="submit"
          disabled={!form.watch("answer")}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
