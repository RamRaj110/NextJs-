"use client";
import '@mdxeditor/editor/style.css'

import dynamic from "next/dynamic";
import React, { KeyboardEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; 
import { Button } from '@/components/ui/button'; 
import { Input } from '@/components/ui/input'; 
import { Badge } from '@/components/ui/badge'; 
import { X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AskQuestionSchema } from '@/lib/validation'; 


const QuestionForm = () => {
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
    },
  });

  const { isSubmitting } = form.formState;

  const handleCreateQuestion = async (values: z.infer<typeof AskQuestionSchema>) => {
    // TODO: Call your Server Action or API here
    console.log("Form Data:", values);
    
    // Example: await createQuestion(values);
  };

  // --- Tag Handling Logic ---
  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>, field: any) => {
    if (e.key === 'Enter' && field.name === 'tags') {
      e.preventDefault();

      const tagInput = e.currentTarget;
      const tagValue = tagInput.value.trim();

      // Basic Validation: Ensure tag isn't empty and not overly long
      if (tagValue !== '') {
        if (tagValue.length > 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag must be less than 15 characters.',
          });
        }

        // Check if tag already exists in the current form values
        if (!field.value.includes(tagValue as never)) {
          // Limit to 3 tags (optional constraint)
        //   if (field.value.length >= 3) {
        //       return form.setError('tags', { type: 'required', message: 'Max 3 tags allowed' })
        //   }
          
          form.setValue('tags', [...field.value, tagValue]);
          tagInput.value = '';
          form.clearErrors('tags');
        } else {
             form.trigger('tags'); // Trigger validation if duplicate
        }
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue('tags', newTags);
  };

  const Editor = dynamic(
  () => import("@/components/editor/MDXeditor"),
  { ssr: false }
);


  const [content, setContent] = useState("# Hello MDX");

  return (

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateQuestion)}
        className="flex w-full flex-col gap-10"
      >
        {/* --- Title Field --- */}
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
                Be specific and imagine you&apos;re asking a question to another person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* --- Content / Description Field --- */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-foreground">
                Detailed Explanation of your problem <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
              <Editor
                  value={field.value}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-muted-foreground">
                Include all the information someone would need to answer your question.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* --- Tags Field --- */}
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

                  {/* Render Tags as Badges */}
                  {field.value.length > 0 && (
                    <div className="flex justify-start mt-2.5 gap-2.5 flex-wrap">
                      {field.value.map((tag: string) => (
                        <Badge 
                            key={tag} 
                            className="subtle-medium bg-secondary text-secondary-foreground flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                            onClick={() => handleTagRemove(tag, field)}
                        >
                          {tag}
                          <X size={12} className="cursor-pointer object-contain invert-0 dark:invert" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-muted-foreground">
                Add up to 3 tags to describe what your question is about. Start typing to see suggestions.
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
          {isSubmitting ? (
            <>Posting...</>
          ) : (
            <>Ask a Question</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;