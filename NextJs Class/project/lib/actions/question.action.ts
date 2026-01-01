"use server";

import {
  ActionResponse,
  ErrorResponse,
  PaginatedSearchParams,
  Question,
} from "@/Types/global";
import {
  CreateQuestionParams,
  EditQuestionParams,
  getQuestionsParams,
  ITagDoc,
} from "@/Types/action";
import action from "../handlers/action";
import {
  AskQuestionSchema,
  EditQuestionSchema,
  GetQuestionsSchema,
  PaginatedSearchParamsSchema,
} from "../validation";
import handleError from "../handlers/errors";
import monngoose from "mongoose";
import Tag from "@/database/tag.modules";
import TagQuestion from "@/database/tagquestion.modules";
import Questions, { IQuestionDoc } from "@/database/question.modules";

export async function createQuestion(
  params: CreateQuestionParams
): Promise<ActionResponse<IQuestionDoc>> {
  const validationResult = await action({
    params,
    schema: AskQuestionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { title, content, tags } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await monngoose.startSession();
  session.startTransaction();
  try {
    const [question] = await Questions.create(
      [{ title, content, author: userId }],
      { session }
    );

    if (!question) {
      throw new Error("Failed to create question");
    }
    const tagIds: monngoose.Types.ObjectId[] = [];
    const tagQustionDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: `^${tag}$`, $optional: "i" } },
        { $setOnInsert: { name: tag }, $inc: { questionCount: 1 } },
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
      { $push: { tags: { $each: tagIds } } },
      { session }
    );
    await session.commitTransaction();
    return {
      success: true,
      data: JSON.parse(
        JSON.stringify({ id: question.id, ...question.toObject() })
      ),
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error as Error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function editQuestion(
  params: EditQuestionParams
): Promise<ActionResponse<Question>> {
  const validationResult = await action({
    params,
    schema: EditQuestionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { title, content, tags, questionId } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  const session = await monngoose.startSession();
  session.startTransaction();
  try {
    const question = await Questions.findById(questionId).populate("tags");
    if (!question) {
      throw new Error("Question not found");
    }
    if (question.author.toString() !== userId) {
      throw new Error("Unauthorized to edit this question");
    }
    if (question.title !== title || question.content !== content) {
      question.title = title;
      question.content = content;
      await question.save({ session });
    }
    const tagToAdd = tags.filter(
      (tag) =>
        !question.tags.some((t: ITagDoc) =>
          t.name.toLocaleLowerCase().includes(tag.toLocaleLowerCase())
        )
    );
    const tagsToRemove = question.tags.filter(
      (tag: ITagDoc) =>
        !tags.some(
          (t) => t.toLocaleLowerCase() === tag.name.toLocaleLowerCase()
        )
    );

    const newTagDocuments = [];
    if (tagToAdd.length > 0) {
      for (const tag of tagToAdd) {
        const existingTag = await Tag.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tag}$`, "i") } },
          { $setOnInsert: { name: tag }, $inc: { questionCount: 1 } },
          { new: true, upsert: true, session }
        );
        if (existingTag) {
          newTagDocuments.push({
            question: question.id,
            tag: existingTag.id,
          });
          question.tags.push(existingTag.id);
        }
      }
    }
    if (tagsToRemove.length > 0) {
      const tagIdsToRemove = tagsToRemove.map((tag: ITagDoc) => tag.id);
      await Tag.updateMany(
        { _id: { $in: tagIdsToRemove } },
        { $inc: { questionCount: -1 } },
        { session }
      );
      await TagQuestion.deleteMany(
        { question: question.id, tag: { $in: tagIdsToRemove } },
        { session }
      );
      question.tags = question.tags.filter(
        (tag: monngoose.Types.ObjectId) =>
          !tagIdsToRemove.some((id: monngoose.Types.ObjectId) =>
            id.equals(tag._id)
          )
      );
    }
    if (newTagDocuments.length > 0) {
      await TagQuestion.insertMany(newTagDocuments, { session });
    }
    await question.save({ session });

    await session.commitTransaction();

    const populatedQuestion = await Questions.findById(question.id).populate(
      "tags"
    );
    return {
      success: true,
      data: JSON.parse(
        JSON.stringify({
          id: populatedQuestion.id,
          ...populatedQuestion.toObject(),
        })
      ),
    };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error as Error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function getQuestion(
  params: getQuestionsParams
): Promise<ActionResponse<Question>> {
  const validationResult = await action({
    params,
    schema: GetQuestionsSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { questionId } = validationResult.params!;
  try {
    const question = await Questions.findById(questionId).populate("tags");
    if (!question) {
      throw new Error("Question not found");
    }
    return {
      success: true,
      data: JSON.parse(
        JSON.stringify({ id: question.id, ...question.toObject() })
      ),
    };
  } catch (error) {
    return handleError(error as Error) as ErrorResponse;
  }
}

export async function getQuestions(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ questions: Question[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { page = 1, pageSize = 10, query, filter, sort } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize) + 1;

  const filterQuery: FilterQuery<typeof Questions> = {};

  if (filter === "recommended") {
    return { success: true, data: { questions: [], isNext: false } };
  }

  if (query) {
    filterQuery.$or = [
      { title: { $regex: new RegExp(query, "i") } },
      { content: { $regex: new RegExp(query, "i") } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "newest":
      sortCriteria = { createdAt: -1 };
      break;
    case "unanswered":
      filterQuery.answers = 0;
      sortCriteria = { createdAt: -1 };
      break;
    case "popular":
      sortCriteria = { upvotes: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
  }

  try {
    const totalQuestions = await Questions.countDocuments(filterQuery);
    const questions = await Questions.find(filterQuery)
      // .populate('tags','name')
      // .populate('author','name image')
      .lean()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + questions.length;
    return {
      success: true,
      data: {
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error as Error) as ErrorResponse;
  }
}
