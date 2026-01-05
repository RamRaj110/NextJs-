"use client";

import React, { useRef, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { AnswerSchema } from '@/lib/validation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { Button } from '../ui/button';
import { Sparkles, Send } from 'lucide-react'; // Import missing icons

// Load Editor client-side only
const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const AnswerForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAISubmitting, setIsAISubmitting] = useState(false); // Fixed typo

  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);
    try {
      // TODO: Make API call to create answer
      // await createAnswer({ content: values.content });
      console.log(values);
      
      // Reset form on success
      form.reset();
      if (editorRef.current) {
        editorRef.current.setMarkdown("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIAnswer = async () => {
    setIsAISubmitting(true);
    try {
        // Mock AI generation
        // const response = await fetch('/api/chatgpt', ...)
        // const formattedAnswer = response.data...
        // if(editorRef.current) editorRef.current.setMarkdown(formattedAnswer)
    } catch (error) {
        console.log(error);
    } finally {
        setIsAISubmitting(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
            Write your answer here
        </h4>
        
        <Button 
            className="btn-light-800_dark300 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500 bg-secondary/50 hover:bg-secondary"
            onClick={generateAIAnswer}
            disabled={isAISubmitting}
        >
          {isAISubmitting ? (
             <>Generating...</>
          ) : (
            <>
                <Sparkles size={16} className="text-primary" />
                Generate AI Answer
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Editor 
                    editorRef={editorRef} 
                    value={field.value} 
                    fieldChange={field.onChange} 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button 
                type="submit" 
                className="primary-gradient w-fit text-white bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post Answer'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;