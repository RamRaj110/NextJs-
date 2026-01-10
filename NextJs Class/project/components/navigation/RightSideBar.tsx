import React from "react";
import Link from "next/link";
import ROUTES from "@/constant/route";
import TagCard from "../cards/TagCard";
import { ChevronRight, Divide } from "lucide-react";
import { getHotQuestions } from "@/lib/actions/question.action";
import DataRenderer from "../DataRenderer";
import { getTopTags } from "@/lib/actions/tag.action";

const RightSideBar = async () => {
  // const { success, data: hotQuestions, error } = await getHotQuestions();
  // const {
  //   success: tagSuccess,
  //   data: tags,
  //   error: tagError,
  // } = await getTopTags();

  // Optemize this code
  const [
    { success, data: hotQuestions, error },
    { success: tagSuccess, data: tags, error: tagError },
  ] = await Promise.all([getHotQuestions(), getTopTags()]);

  return (
    <section className="hidden xl:flex h-screen w-[330px] flex-col  border-l border-border bg-background p-6 sticky right-0 top-0 shadow-light-300 dark:shadow-none custom-scrollbar">
      <div className="flex flex-col gap-6">
        <h3 className="h3-bold text-foreground font-bold text-lg">
          Top Questions
        </h3>

        <div className="flex flex-col gap-[30px]">
          <DataRenderer
            data={hotQuestions}
            error={error}
            success={success}
            empty={{
              title: "No Questions Found",
              message: "No questions found",
            }}
            render={(hotQuestions) => (
              <div className="flex flex-col gap-6">
                {hotQuestions.map((question) => (
                  <Link
                    key={question.id}
                    href={ROUTES.QUESTION(question._id)}
                    className="flex cursor-pointer items-center justify-between gap-7 group"
                  >
                    <p className="body-medium text-muted-foreground group-hover:text-primary text-sm font-medium line-clamp-2">
                      {question.title}
                    </p>

                    <ChevronRight
                      size={20}
                      className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                    />
                  </Link>
                ))}
              </div>
            )}
          />
        </div>
      </div>

      {/* --- Popular Tags Section --- */}
      <div className="mt-16 flex flex-col gap-6">
        <h3 className="h3-bold text-foreground font-bold text-lg">
          Popular Tags
        </h3>
        <div className="flex flex-col gap-4">
          <DataRenderer
            data={tags}
            error={tagError}
            success={tagSuccess}
            empty={{
              title: "No Tags Found",
              message: "No tags found",
            }}
            render={(tags) => (
              <div className="flex flex-col gap-6">
                {tags.map((tag) => (
                  <TagCard
                    key={tag._id}
                    id={tag._id!}
                    name={tag.name}
                    questions={tag.questionCount}
                    showCount
                    compact
                  />
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
