"use client";
import "@mdxeditor/editor/style.css";

import dynamic from "next/dynamic";
import React, { KeyboardEvent, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AskQuestionSchema } from "@/lib/validation";
import TagCard from "../cards/TagCard";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constant/route";
import { Question } from "@/Types/global";
const Editor = dynamic(() => import("@/components/editor/MDXeditor"), {
  ssr: false,
});
interface Params {
  question?: Question;
  isEdit?: boolean;
}
const QuestionForm = ({ question, isEdit = false }: Params) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags.map((tag) => tag.name) || [],
    },
  });

  const { isSubmitting } = form.formState;

  const handleCreateQuestion = async (
    values: z.infer<typeof AskQuestionSchema>
  ) => {
    startTransition(async () => {
      if (isEdit && question) {
        const result = await editQuestion({
          questionId: question?.id,
          ...values,
        });

        if (result.success) {
          toast.success("Question updated successfully", {
            description: "Your question has been updated successfully",
          });
          if (result.data) {
            router.push(ROUTES.QUESTION(result.data.id));
          }
        } else {
          toast.error(`Error ${result.status}`, {
            description: result.error?.message || "Something went wrong",
          });
        }
        return;
      }
    const result = await createQuestion(values);
    if (result.success) {
      toast.success("Question Created successfully", {
        description: "Your question has been created successfully",
      });
      if (result.data) {
        router.push(ROUTES.QUESTION(result.data.id));
      }
    } else {
      toast.error(`Error ${result.status}`, {
        description: result.error?.message || "Something went wrong",
      });
    }
    });
  };

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.currentTarget;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          if (field.value.length >= 3) {
            return form.setError("tags", {
              type: "required",
              message: "Max 3 tags allowed",
            });
          }
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        } else {
          form.setError("tags", {
            type: "required",
            message: "Tag already exists.",
          });
        }
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateQuestion)}
        className="flex w-full flex-col gap-10"
      >
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-foreground">
                Question Title <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-muted-foreground">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Content Field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-foreground">
                Detailed Explanation of your problem{" "}
                <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Editor value={field.value} fieldChange={field.onChange} />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-muted-foreground">
                Include all the information someone would need to answer your
                question.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Tags Field */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-foreground">
                Tags <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags... (Press Enter to add)"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />

                  {field.value.length > 0 && (
                    <div className="flex justify-start mt-2.5 gap-2.5 flex-wrap">
                      {field.value.map((tag: string) => (
                        <TagCard
                          key={tag}
                          id={0}
                          name={tag}
                          compact
                          showCount={false}
                        >
                          <button
                            type="button"
                            onClick={() => handleTagRemove(tag, field)}
                            className="ml-2 focus:outline-none hover:text-destructive transition-colors"
                            aria-label={`Remove ${tag} tag`}
                          >
                            <X size={12} />
                          </button>
                        </TagCard>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-muted-foreground">
                Add up to 3 tags to describe what your question is about. Start
                typing to see suggestions.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="primary-gradient w-fit text-light-900 font-bold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting..." : isEdit ? "Update Question" : "Ask a Question"}
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
