'use server';

import { ActionResponse, ErrorResponse } from "@/Types/global";
import action from "../handlers/action";
import { AskQuestionSchema } from "../validation";
import handleError from "../handlers/errors";
import monngoose from "mongoose";
import Question from "@/database/question.modules";
import Tag from "@/database/tag.modules";


export async function createQuestion(params: CreateQuestionParams):Promise<ActionResponse> {
    const validationResult = await action({
        params,
        schema:AskQuestionSchema,
        authorize:true,
    });

    if(validationResult instanceof Error){
        return handleError(validationResult) as  ErrorResponse;
    }
    const {title,content,tags} = validationResult.params;
    const userId = validationResult?.session?.user?.id;


    const session = await monngoose.startSession();
    session.startTransaction();
    try {
        const [question] = await Question.create([{ title,content,author:userId} ], { session });

        if(!question){
            throw new Error('Failed to create question');
        }
        const tagIds: monngoose.Types.ObjectId[] = [];
        const tagQustionDocuments = [];

        for(const tag of tags){
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
                {$setOnInsert: { name: tag } ,$inc: { questionCount: 1 }},
                { new: true, upsert: true, session }
            );
        tagIds.push(existingTag.id);
        tagQustionDocuments.push({
            question: question.id,
            tag: existingTag.id,
        });
        }
        await TagQuestion.insertMany(tagQustionDocuments, { session });
        await Question.findByIdAndUpdate(
            question.id,
            {$push: { tags: { $each: tagIds } } },
            { session }
        )
        await session.commitTransaction();
        return {
            success:true,
            message:'Question created successfully',
            data:question,
        };
    } catch (error) {
        await session.abortTransaction();
        return handleError(error as Error) as ErrorResponse;
    }finally{
        session.endSession();
    }
}