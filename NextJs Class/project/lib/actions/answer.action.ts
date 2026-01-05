'use server'

import { CreateAnswerParams } from "@/Types/action";
import { ActionResponse, ErrorResponse } from "@/Types/global";
import { AnswerSeverSchema } from "../validation";
import handleError from "../handlers/errors";
import action from "../handlers/action";
import mongoose from "mongoose";
import Questions from "@/database/question.modules";
import { Answer } from "@/database";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constant/route";


export async function createAnswer(params:CreateAnswerParams):Promise<ActionResponse<IAnswerDoc>>{
    const validationResult = await action({
        params,schema:AnswerSeverSchema,
        authorize:true
    })

    if(validationResult instanceof Error){
        return handleError(validationResult) as ErrorResponse;
    }
    
    const {content,questionId}=validationResult.params!;
    const userId= validationResult?.session?.user?.id;
    
    const session= await mongoose.startSession();
    session.startTransaction();

    try {
        const question=await Questions.findById(questionId);
        if(!question){
            throw new Error("Question not found");
        }
        const [newAnswer]=await Answer.create([{content,author:userId,question:questionId}],{session});
        if(!newAnswer){
            throw new Error("Failed to create answer");
        }
        question.answers +=1;
        await question.save({session})
            await session.commitTransaction();
            revalidatePath(ROUTES.QUESTION(questionId));
            return{
                success:true,
                data:JSON.parse(JSON.stringify({id:newAnswer.id,...newAnswer.toObject()}))
            }
        
    } catch (error) {
        await session.abortTransaction();
        return handleError(error as Error) as ErrorResponse;
    }finally{
        await session.endSession();
    }

}