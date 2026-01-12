import AllAnswers from "@/components/answers/AllAnswers";
import TagCard from "@/components/cards/TagCard";
import Preview from "@/components/editor/Preview";
import AnswerForm from "@/components/forms/AnswerForm";
import SaveQuestion from "@/components/questions/SaveQuestion";
import { Button } from "@/components/ui/button";
import Votes from "@/components/votes/Votes";
import ROUTES from "@/constant/route";
import { getAnswers } from "@/lib/actions/answer.action";
import { hasSavedQuestion } from "@/lib/actions/collection.action";
import { getQuestion, increamentView } from "@/lib/actions/question.action";
import { hasVoted } from "@/lib/actions/vote.action";
import { formatNumber, getTimestamp } from "@/lib/utils";
import { Clock, Eye, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { after } from "next/server";
import React, { Suspense } from "react";
import { RouteParams } from "@/Types/global";

const QuestionDetails = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize, filter } = await searchParams;

  const {
    success,
    data: question,
    error,
  } = await getQuestion({ questionId: [id] });

  after(async () => {
    await increamentView({ questionId: id });
  });

  if (!success && error?.message === "Unauthorized") {
    redirect(ROUTES.SIGNIN);
  }

  if (!success || !question) {
    notFound();
  }

  const {
    success: areAnswersSuccess,
    data: answersResult,
    error: answersError,
  } = await getAnswers({
    questionId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 5,
    filter,
  });

  const hasVotedPromise = hasVoted({
    targetId: question._id,
    targetType: "question",
  });

  const hasSavedPromise = hasSavedQuestion({
    questionId: question._id,
  });

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Question Card Container */}
      <article className="rounded-2xl border border-border bg-card p-4 sm:p-6 lg:p-8">
        {/* Author & Actions Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Author Info */}
          <Link
            href={ROUTES.PROFILE(question.author?._id || "")}
            className="group flex items-center gap-3"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-secondary ring-2 ring-border transition-all group-hover:ring-primary/50">
              {question.author?.image ? (
                <Image
                  src={question.author.image}
                  alt={question.author.name || "Author"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-lg font-bold text-primary">
                  {question.author?.name?.[0]?.toUpperCase() || "?"}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-foreground transition-colors group-hover:text-primary">
                {question.author?.name || "Anonymous"}
              </p>
              <p className="text-xs text-muted-foreground">
                Asked {getTimestamp(question.createdAt)}
              </p>
            </div>
          </Link>

          {/* Vote & Save Actions */}
          <div className="flex items-center gap-2">
            <Suspense
              fallback={
                <div className="h-9 w-28 animate-pulse rounded-md bg-secondary" />
              }
            >
              <Votes
                upvotes={question.upvotes}
                downvotes={question.downvotes}
                targetId={question._id}
                targetType="question"
                hasVotePromise={hasVotedPromise}
              />
            </Suspense>
            <Suspense
              fallback={
                <div className="h-9 w-9 animate-pulse rounded-md bg-secondary" />
              }
            >
              <SaveQuestion
                questionId={question._id}
                hasSavedPromise={hasSavedPromise}
              />
            </Suspense>
          </div>
        </div>

        {/* Question Title */}
        <h1 className="mt-6 text-xl font-bold leading-tight text-foreground sm:text-2xl lg:text-3xl">
          {question.title}
        </h1>

        {/* Stats Row */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm sm:gap-4">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{formatNumber(question.views)} views</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            <span>
              {formatNumber(question.answers)}{" "}
              {question.answers === 1 ? "answer" : "answers"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <ThumbsUp className="h-4 w-4" />
            <span>{formatNumber(question.upvotes)} votes</span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-border" />

        {/* Question Content */}
        <div className="prose prose-sm dark:prose-invert max-w-none sm:prose-base">
          <Preview content={question.content} />
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <TagCard
              key={tag._id}
              id={tag._id}
              name={tag.name}
              compact={true}
            />
          ))}
        </div>

        {/* Actions Footer */}
        <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-primary"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </article>

      {/* Answer Form Section */}
      <section className="mt-8">
        <AnswerForm
          questionId={question._id}
          questionTitle={question.title}
          questionContent={question.content}
        />
      </section>

      {/* Answers Section */}
      <section className="mt-8">
        <AllAnswers
          page={Number(page) || 1}
          isNext={answersResult?.isNext || false}
          data={answersResult?.answers}
          success={areAnswersSuccess}
          error={answersError}
          totalAnswers={question.answers}
        />
      </section>
    </div>
  );
};

export default QuestionDetails;
