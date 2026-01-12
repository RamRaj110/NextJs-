import React, { Suspense } from "react";
import Link from "next/link";
import { cn, getTimestamp } from "@/lib/utils";
import ROUTES from "@/constant/route";
import Preview from "../editor/Preview";
import Votes from "../votes/Votes";
import { hasVoted } from "@/lib/actions/vote.action";
import { Answers } from "@/Types/global";
import EditDeleteAction from "../user/EditDeleteAction";
import Image from "next/image";

interface Props extends Answers {
  containerClass?: string;
  showMore?: boolean;
  showActionBtns?: boolean;
}

const AnswerCard = ({
  _id,
  author,
  content,
  createdAt,
  upvotes,
  downvotes,
  question,
  containerClass,
  showMore = false,
  showActionBtns = false,
}: Props) => {
  const hasVotedPromise = hasVoted({
    targetId: _id,
    targetType: "answer",
  });

  return (
    <article
      key={_id}
      className={cn(
        "group relative rounded-xl border  bg-card/50 p-4 sm:p-6 transition-all duration-200 hover:bg-card hover:shadow-sm mb-4",
        containerClass
      )}
    >
      <span id={`answer-${_id}`} className="absolute -top-20" />

      {/* Edit/Delete Actions */}
      {showActionBtns && (
        <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
          <EditDeleteAction id={_id} type="answer" />
        </div>
      )}

      {/* Author Info Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.PROFILE(author?._id)}
            className="flex items-center gap-3 group/author"
          >
            {/* Avatar */}
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-secondary ring-2 ring-border transition-all group-hover/author:ring-primary/50">
              {author?.image ? (
                <Image
                  src={author.image}
                  alt={author.name || "User"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-bold text-primary">
                  {author?.name?.[0]?.toUpperCase() || "?"}
                </div>
              )}
            </div>

            {/* Name and Time */}
            <div className="flex flex-col">
              <p className="font-semibold text-foreground text-sm sm:text-base transition-colors group-hover/author:text-primary">
                {author?.name || "Anonymous"}
              </p>
              <p className="text-xs text-muted-foreground">
                answered {getTimestamp(createdAt)}
              </p>
            </div>
          </Link>
        </div>

        {/* Votes - Desktop Position */}
        <div className="hidden sm:block">
          <Suspense
            fallback={
              <div className="h-8 w-24 animate-pulse rounded-md bg-secondary" />
            }
          >
            <Votes
              targetId={_id}
              targetType="answer"
              upvotes={upvotes}
              downvotes={downvotes}
              hasVotePromise={hasVotedPromise}
            />
          </Suspense>
        </div>
      </div>

      {/* Answer Content */}
      <div className="mt-4 text-foreground text-sm sm:text-base leading-relaxed prose prose-sm dark:prose-invert max-w-none">
        <Preview content={content} />
      </div>

      {/* Read More Link */}
      {showMore && question && (
        <Link
          href={`/question/${question}#answer-${_id}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Read full answer →
        </Link>
      )}

      {/* Votes - Mobile Position */}
      <div className="mt-4 flex justify-end sm:hidden">
        <Suspense
          fallback={
            <div className="h-8 w-24 animate-pulse rounded-md bg-secondary" />
          }
        >
          <Votes
            targetId={_id}
            targetType="answer"
            upvotes={upvotes}
            downvotes={downvotes}
            hasVotePromise={hasVotedPromise}
          />
        </Suspense>
      </div>
    </article>
  );
};

export default AnswerCard;
