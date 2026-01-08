'use server';

import { CollectionBaseParams } from "@/Types/action";
import { ActionResponse, ErrorResponse } from "@/Types/global";
import action from "../handlers/action";
import { Cpu } from "lucide-react";
import { CollectionBaseSchema } from "../validation";
import handleError from "../handlers/errors";
import { Collection, Question } from "@/database";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constant/route";

export async function toggleSaveQuestion(params:CollectionBaseParams):Promise<ActionResponse<{saved:boolean}>>{
    const validationResult = await action({
        params,
        schema:CollectionBaseSchema,
        authorize:true
    })
    if(validationResult instanceof Error){
        return handleError(validationResult) as ErrorResponse
    }

    const {questionId} = validationResult.params!;
    const userId = validationResult.session?.user?.id
    try {
        const question = await Question.findById(questionId)
        if(!question){
            return handleError(new Error("Question not found")) as ErrorResponse
        }
        const collection = await  Collection.findOne({
            author:userId,
            question:questionId
        })
        if(collection){
            await Collection.findByIdAndDelete(collection._id)
        revalidatePath(ROUTES.QUESTION(questionId))

            return {
                success:true,
                data:{saved:false}
            }
        }
        await Collection.create({
            author:userId,
            question:questionId
        })
        revalidatePath(ROUTES.QUESTION(questionId))

        return {
            success:true,
            data:{saved:true}
        }
    } catch (error) {
        return handleError(error) as ErrorResponse
    }
}

export async function hasSavedQuestion(params:CollectionBaseParams):Promise<ActionResponse<{saved:boolean}>>{
    const validationResult = await action({
        params,
        schema:CollectionBaseSchema,
        authorize:true
    })
    if(validationResult instanceof Error){
        return handleError(validationResult) as ErrorResponse
    }

    const {questionId} = validationResult.params!;
    const userId = validationResult.session?.user?.id
    try {
       
        const collection = await  Collection.findOne({
            author:userId,
            question:questionId
        })
  


        return {
            success:true,
            data:{saved:!!collection}
        }
    } catch (error) {
        return handleError(error) as ErrorResponse
    }
}