'use server';

import { ActionResponse, ErrorResponse, Question } from "@/Types/global";
import { CreateQuestionParams, EditQuestionParams, getQuestionsParams, ITagDoc } from "@/Types/action";
import action from "../handlers/action";
import { AskQuestionSchema, EditQuestionSchema, GetQuestionsSchema } from "../validation";
import handleError from "../handlers/errors";
import monngoose from "mongoose";
import Tag from "@/database/tag.modules";
import TagQuestion from "@/database/tagquestion.modules";
import Questions from "@/database/question.modules";


export async function createQuestion(params: CreateQuestionParams):Promise<ActionResponse<Question>> {
    const validationResult = await action({
        params,
        schema:AskQuestionSchema,
        authorize:true,
    });

    if(validationResult instanceof Error){
        return handleError(validationResult) as  ErrorResponse;
    }
    const {title,content,tags} = validationResult.params!;
    const userId = validationResult?.session?.user?.id;


    const session = await monngoose.startSession();
    session.startTransaction();
    try {
        const [question] = await Questions.create([{ title,content,author:userId} ], { session });

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
        await Questions.findByIdAndUpdate(
            question.id,
            {$push: { tags: { $each: tagIds } } },
            { session }
        )
        await session.commitTransaction();
        return {
            success:true,
           data: JSON.parse(JSON.stringify({ id: question.id, ...question.toObject() }))
        };
    } catch (error) {
        await session.abortTransaction();
        return handleError(error as Error) as ErrorResponse;
    }finally{
        session.endSession();
    }
}


export async function editQuestion(params: EditQuestionParams):Promise<ActionResponse<Question>> {
    const validationResult = await action({
        params,
        schema:EditQuestionSchema,
        authorize:true,
    });

    if(validationResult instanceof Error){
        return handleError(validationResult) as  ErrorResponse;
    }
    const {title,content,tags,questionId} = validationResult.params!;
    const userId = validationResult?.session?.user?.id;


    const session = await monngoose.startSession();
    session.startTransaction();
    try {
        const question = await Questions.findById(questionId).populate('tags');
        if(!question){
            throw new Error('Question not found');
        }
        if(question.author.toString() !== userId){
            throw new Error('Unauthorized to edit this question');
        }
        if(question.title !== title || question.content !== content){
            question.title = title;
            question.content = content;
            await question.save({ session });
        }
        const tagToAdd = tags.filter((tag)=> !question.tags.includes(tag.toLocaleLowerCase()))
        const tagsToRemove = question.tags.filter((tag:ITagDoc)=> !tags.includes(tag.name.toLocaleLowerCase()))

        const newTagDocuments = [];
        if(tagToAdd.length > 0){
            for(const tag of tagToAdd){
                const existingTag = await Tag.findOneAndUpdate(
                    { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
                    {$setOnInsert: { name: tag } ,$inc: { questionCount: 1 }},
                    { new: true, upsert: true, session }
                );
                if(existingTag){
                    newTagDocuments.push({
                        question: question.id,
                        tag: existingTag.id,
                    });
                    question.tags.push(existingTag.id);
                }
            }
        }
        if(tagsToRemove.length > 0){
            const tagIdsToRemove = tagsToRemove.map((tag:ITagDoc) => tag.id);
            await Tag.updateMany(

                { _id: { $in: tagIdsToRemove } },
                { $inc: { questionCount: -1 } },
                { session }
            );
            await TagQuestion.deleteMany(
                { question: question.id, tag: { $in: tagIdsToRemove } },
                { session }
            );
            question.tags = question.tags.filter((tagId:monngoose.Types.ObjectId) => !tagIdsToRemove.includes(tagId.toString()));
        }

        if(newTagDocuments.length > 0){
            await TagQuestion.insertMany(newTagDocuments, { session });
        }
        await question.save({ session });

     const populatedQuestion = await Questions.findById(question.id).populate('tags');
return {
    success: true,
    data: JSON.parse(JSON.stringify({ id: populatedQuestion.id, ...populatedQuestion.toObject() }))
};

    } catch (error) {
        await session.abortTransaction();
        return handleError(error as Error) as ErrorResponse;
        
    }finally{
        session.endSession();
    }
}

export async function getQuestion(params: getQuestionsParams):Promise<ActionResponse<Question>> {
    const validationResult = await action({
        params,
        schema:GetQuestionsSchema,
        authorize:true,
    });

    if(validationResult instanceof Error){
        return handleError(validationResult) as  ErrorResponse;
    }
    const {questionId} = validationResult.params!;
    try {
        const question = await Questions.findById(questionId).populate('tags');
        if(!question){
            throw new Error('Question not found');
        }
      return {
    success: true,
   data: JSON.parse(JSON.stringify({ id: question.id, ...question.toObject() }))
};
        
    } catch (error) {
        return handleError(error as Error) as ErrorResponse;
    }
}