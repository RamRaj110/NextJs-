import { getTags } from "@/lib/actions/tag.action";
import { RouteParams } from "@/Types/global";
import React from "react";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constant/route";
import DataRenderer from "@/components/DataRenderer";
import { EMPTY_TAGS } from "@/constant/state";
import { Tag } from "lucide-react";
import TagCard from "@/components/cards/TagCard";
import CommonFilter from "@/components/filter/CommonFilter";
import { TagFilters } from "@/constant/filters";
import Pagination from "@/components/Pagination";

const Tags = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, search: query, filter } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 2,
    query,
    filter,
  });
  const { tags, isNext } = data!;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Tags</h1>
      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.TAGS}
          placeholder="Search tags..."
          otherClasses="text-muted-foreground width-full"
        />
        <CommonFilter
          filters={TagFilters}
          otherClasses="max-sm:w-full sm:min-w-32"
          containerClasses="max-sm:w-full"
        />
      </section>
      <DataRenderer
        success={success}
        data={tags}
        error={error}
        empty={EMPTY_TAGS}
        render={(tags) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
            {tags.map((tag) => (
              <TagCard
                key={tag._id}
                id={tag._id}
                {...tag}
                questions={tag.questions}
                showCount
              />
            ))}
          </div>
        )}
      />
      <Pagination page={page} isNext={isNext || false} />
    </>
  );
};

export default Tags;
