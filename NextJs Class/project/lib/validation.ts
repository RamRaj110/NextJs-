
import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(50, { message: "Name must be at most 50 characters long" }),

    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(20, { message: "Username must be at most 20 characters long" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers and underscores",
      }),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/, {
        message: "Password must contain at least one special character",
      }), // [web:5][web:14]

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
    phone: z
      .string()
      .regex(/^[0-9]{10}$/, {
        message: "Phone must be 10 digits",
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .min(5, { message: 'Title must be at least 5 characters' })
    .max(130, { message: 'Title must be less than 130 characters' }),
  
  content: z
    .string()
    .min(1, { message: 'Content is required' })
    .min(20, { message: 'Content must be at least 20 characters' }),
  
  tags: z
    .array(z.string())
    .min(1, { message: 'At least one tag is required' })
    .max(3, { message: 'Maximum 3 tags allowed' }),
});

export type AskQuestionSchemaType = z.infer<typeof AskQuestionSchema>;
