"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
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
import { ActionResponse } from "@/Types/global"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { SignInSchema, SignUpSchema } from "@/lib/validation"

type SignInFormData = {
  email: string;
  password: string;
}

type SignUpFormData = {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface BaseAuthFormProps {
  formType: "SIGNIN" | "SIGNUP";
}

interface SignInFormProps extends BaseAuthFormProps {
  formType: "SIGNIN";
  defaultValues: SignInFormData;
  onSubmit: (data: SignInFormData) => Promise<ActionResponse>;
}

interface SignUpFormProps extends BaseAuthFormProps {
  formType: "SIGNUP";
  defaultValues: SignUpFormData;
  onSubmit: (data: SignUpFormData) => Promise<ActionResponse>;
}

type AuthFormProps = SignInFormProps | SignUpFormProps;

const AuthForm = (props: AuthFormProps) => {
  const { defaultValues, formType, onSubmit } = props;
  const router = useRouter()
  
  const schema = formType === "SIGNIN" ? SignInSchema : SignUpSchema;
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit: SubmitHandler<SignInFormData | SignUpFormData> = async (data) => {
    const result = (await onSubmit(data as any)) as ActionResponse;
    if(result?.success){
      toast.success(formType==='SIGNIN'? "Signed in successfully":"Signed up successfully");
      
      if(formType === 'SIGNUP') {
        // Sign in the user after successful signup
        await signIn("credentials", {
          email: (data as SignUpFormData).email,
          password: (data as SignUpFormData).password,
          redirect: false
        });
      }

      if(formType === 'SIGNIN') {
        // Sign in the user after successful validation
        await signIn("credentials", {
          email: (data as SignInFormData).email,
          password: (data as SignInFormData).password,
          redirect: false
        });
      }
      
      router.push(ROUTES.HOME)
    } else {
      toast.error(result?.message || "An error occurred");
    }
  };

  const buttonText = formType === "SIGNIN" ? "Sign In" : "Sign Up";
  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-6">
        
        {(Object.keys(defaultValues) as Array<keyof typeof defaultValues>).map((field) => {
            const fieldName = field;
            const isPassword = fieldName.toString().toLowerCase().includes("password");
            const isEmail = fieldName.toString().toLowerCase().includes("email");
            const inputType = isPassword ? "password" : isEmail ? "email" : "text";

            return (
                <FormField
                    key={fieldName.toString()}
                    control={form.control}
                    name={fieldName.toString() as any}
                    render={({ field }) => (
                    <FormItem>
                        {/* Improved Label: Converts "fullName" -> "Full Name" */}
                        <FormLabel className="capitalize text-foreground font-medium">
                            {fieldName.toString().replace(/([A-Z])/g, ' $1').trim()}
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
            Don&apos;t have an account?{" "}
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