import React from "react";
import Link from "next/link";
import { getTimestamp } from "@/lib/utils";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import ROUTES from "@/constant/route";
import Preview from "../editor/Preview";
interface Props {
  _id: string;
  author: {
    _id: string;
    name: string;
    image?: string;
  };
  content: string;
  createdAt: Date | string;
  upvotes: number;
  downvotes: number;
}

const AnswerCard = ({
  _id,
  author,
  content,
  createdAt,
  upvotes,
  downvotes,
}: Props) => {
  return (
    <article key={_id} className="py-10 border-b border-border">
      {/* Anchor for linking directly to answer */}
      <span id={JSON.stringify(_id)} className="hidden" />

      {/* --- Header: Author Info --- */}
      <div className="mb-5 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex items-center gap-2 flex-1 sm:items-center">
          {/* Avatar Component (or Image Fallback) */}
          <Link
            href={ROUTES.PROFILE(author?._id)}
            className="flex items-center gap-2"
          >
            {/* Replace with <UserAvatar /> if you have it */}
            <div className="h-6 w-6 rounded-full bg-slate-200 overflow-hidden">
              <img
                src={author?.image || "/default-avatar.png"}
                alt={author?.name}
                className="object-cover w-full h-full"
              />
            </div>

            <p className="body-semibold text-foreground font-semibold text-sm">
              {author?.name}
            </p>
          </Link>

          <span className="hidden sm:inline text-muted-foreground">•</span>

          <p className="small-regular text-muted-foreground text-xs">
            answered {getTimestamp(createdAt)}
          </p>
        </div>
      </div>

      {/* --- Content: Markdown Preview --- */}
      <div className="text-foreground text-sm leading-relaxed">
        <Preview content={content} />
      </div>

      {/* --- Footer: Votes & Actions --- */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          {/* Upvote Button */}
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-secondary/50 p-1.5 rounded transition-colors">
            <ThumbsUp
              size={18}
              className="text-muted-foreground hover:text-primary"
            />
            <span className="subtle-medium text-foreground font-medium">
              {upvotes}
            </span>
          </div>

          {/* Downvote Button */}
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-secondary/50 p-1.5 rounded transition-colors">
            <ThumbsDown
              size={18}
              className="text-muted-foreground hover:text-red-500"
            />
            {downvotes > 0 && (
              <span className="subtle-medium text-foreground font-medium">
                {downvotes}
              </span>
            )}
          </div>
        </div>

        {/* Optional: Add 'Edit' or 'Delete' buttons here if the current user is the author */}
      </div>

      {/* <Separator className="my-5" /> */}
    </article>
  );
};

export default AnswerCard;
