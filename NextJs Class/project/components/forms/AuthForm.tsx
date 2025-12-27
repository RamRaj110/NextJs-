"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form"
import { ZodType } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import ROUTES from "@/constant/route"

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T; // Fixed typo: dafaultValues -> defaultValues
  onSubmit: (data: T) => Promise<{ success: boolean; }>;
  formType: "SIGNIN" | "SIGNUP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  // Fixed: Actually pass data to the parent onSubmit prop
  const handleSubmit: SubmitHandler<T> = async (data) => {
     await onSubmit(data);
  };

  const buttonText = formType === "SIGNIN" ? "Sign In" : "Sign Up";
  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-6">
        
        {Object.keys(defaultValues).map((field) => {
            const fieldName = field as Path<T>;
            
            // UI Logic: Auto-detect sensitive fields
            const isPassword = fieldName.toLowerCase().includes("password");
            const isEmail = fieldName.toLowerCase().includes("email");
            const inputType = isPassword ? "password" : isEmail ? "email" : "text";

            return (
                <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                    <FormItem>
                        {/* Improved Label: Converts "fullName" -> "Full Name" */}
                        <FormLabel className="capitalize text-foreground font-medium">
                            {fieldName.replace(/([A-Z])/g, ' $1').trim()}
                        </FormLabel>
                        <FormControl>
                        {/* Theme Matching Input Styles */}
                        <Input 
                            required
                            type={inputType}
                            placeholder={`Enter your ${fieldName}`}
                            className="h-10 bg-secondary/50 border-input focus:ring-2 focus:ring-primary/50 transition-all" 
                            {...field} 
                        />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                    )}
                />
            )
        })}

        {/* Full Width Button with Loading State */}
        <Button 
            disabled={isLoading} 
            className="w-full font-bold shadow-md hover:shadow-lg transition-all"
            type="submit"
        >
          {isLoading ? (
             <>
               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               {formType === "SIGNIN" ? "Signing In..." : "Signing Up..."}
             </>
          ) : (
             buttonText
          )}
        </Button>

        {/* Footer Links */}
        {formType === "SIGNIN" ? (
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href={ROUTES.SIGNUP} className="font-semibold text-primary hover:underline hover:text-primary/80 transition-colors">
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href={ROUTES.SIGNIN} className="font-semibold text-primary hover:underline hover:text-primary/80 transition-colors">
              Sign In
            </Link>
          </p>
        )}

      </form>
    </Form>
  )
}

export default AuthForm