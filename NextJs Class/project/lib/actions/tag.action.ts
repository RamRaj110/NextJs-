import {
  ActionResponse,
  ErrorResponse,
  PaginatedSearchParams,
} from "@/Types/global";
import action from "../handlers/action";
import { PaginatedSearchParamsSchema } from "../validation";
import handleError from "../handlers/errors";
import { Question, Tag } from "@/database";
import Questions from "@/database/question.modules";

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
