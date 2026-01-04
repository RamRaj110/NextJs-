import {
  ActionResponse,
  ErrorResponse,
  PaginatedSearchParams,
} from "@/Types/global";
import action from "../handlers/action";
import { PaginatedSearchParamsSchema } from "../validation";
import handleError from "../handlers/errors";
import { Tag } from "@/database";
import type { GetTagQuestionsParams } from "@/Types/action";

export const getTags = async (
  params: PaginatedSearchParams
): Promise<ActionResponse<{ tags: Tag[]; isNext: boolean }>> => {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const {
    page = 1,
    pageSize = 10,
    query = "",
    filter = "recent",
  } = validationResult.params!;

  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize) + 1;
  const filterQuery: Record<string, any> = {};

  if (query) {
    filterQuery.$or = [
      { name: { $regex: new RegExp(query, "i") } },
      { description: { $regex: new RegExp(query, "i") } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "popular":
      sortCriteria = { Questions: -1 };
      break;
    case "recent":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "name":
      sortCriteria = { name: 1 };
      break;
    default:
      break;
  }

  try {
    const totalTags = await Tag.countDocuments(filterQuery);
    const tags = await Tag.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalTags > skip + tags.length;
    return {
      success: true,
      data: { tags: JSON.parse(JSON.stringify(tags)), isNext },
    };
  } catch (error) {
    return handleError(error as Error) as ErrorResponse;
  }
};

export const getTagQuestions = async (
  params: GetTagQuestionsParams
): Promise<ActionResponse<{ questions: Question[]; isNext: boolean }>> => {
  const validationResult = await action({
    params,
    schema: GetTagQuestionsSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const {
    tagId,
    page = 1,
    pageSize = 10,
    query = "",
    filter = "recent",
  } = validationResult.params!;

  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize) + 1;

  try {
    const tag = await Tag.findById(tagId);
    if (!tag) {
      return {
        success: false,
        error: { message: "Tag not found" },
      };
    }
    const filterQuery: Record<string, any> = {
      tags: { $in: [tagId] },
    };

    if (query) {
      filterQuery.title = { $regex: query, $options: 'i' }
    }
    const totalTags = await Question.countDocuments(filterQuery);

    const tags = await Question.find(filterQuery)
      .select('_id title views answers upvotes downvotes author createdAt')
      .populate([{ path: 'author', select: "name image" }, { path: 'tags', select: "name" }])
      .skip(skip)
      .limit(limit);

    const isNext = totalTags > skip + tags.length;
    return {
      success: true,
      data: { tag: JSON.parse(JSON.stringify(tag)), questions: JSON.parse(JSON.stringify(tags)), isNext },
    };
  } catch (error) {
    return handleError(error as Error) as ErrorResponse;
  }
};
