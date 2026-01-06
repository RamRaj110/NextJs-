import handleError from "@/lib/handlers/errors";
import { ValidationError } from "@/lib/http-errors";
import { AIAnswerSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/Types/global";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question, content } = await req.json();
  try {
    const validatedData = AIAnswerSchema.safeParse({ question, content });
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Generate a markdown-fomatted response to the following question: ${question}.Base it on the provided content:${content}`,
      system:
        "You are a helpful assistant that provides information responses in markdownn formate. Use appropriate markdown syntax for heading ,list ,code block, and emphasis where necessary. for code blocks, use short-fom smaller case language identifier (e.g.,'js' for JavaScript,'py' for Python,'ts' for TypeScript etc.)",
    });
    return NextResponse.json({ success: true, data: text }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
