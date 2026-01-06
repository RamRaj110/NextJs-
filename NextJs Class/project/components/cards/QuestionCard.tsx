import React from "react";
import Link from "next/link";
import ROUTES from "@/constant/route";
import { Eye, MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { formatNumber, getTimestamp } from "@/lib/utils";
import TagCard from "./TagCard";
import Metric from "../Matric";
import { Question } from "@/Types/global";

interface Props {
  question: Question;
}

const QuestionCard = ({ question }: Props) => {
  const {
    _id,
    title,
    tags,
    author,
    upvotes,
    views,
    answers,
    createdAt,
    description,
  } = question;
  console.log("answers", answers);

  return (
    <div className="card-wrapper  rounded-[10px] dark:bg-gray-900  p-9 shadow-sm border border-border/50 hover:shadow-md transition-shadow sm:px-11">
      {/* --- Header & Title --- */}
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-muted-foreground line-clamp-1 flex sm:hidden mb-2">
            {getTimestamp(createdAt)}
          </span>

          <Link href={ROUTES.QUESTION ? ROUTES.QUESTION(_id) : "#"}>
            {/* INCREASED FONT SIZE HERE */}
            <h3 className="sm:text-2xl text-xl font-bold text-foreground line-clamp-1 flex-1 cursor-pointer">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      {/* --- Description --- */}
      <div className="mt-3.5 w-full">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* --- Tags Section --- */}
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          // Using TagCard with compact prop so they sit side-by-side
          <TagCard key={index} id={tag._id} name={tag.name} compact={true} />
        ))}
      </div>

      {/* --- Footer Section (Author + Metrics on same line) --- */}
      <div className="flex items-center justify-between mt-6 w-full flex-wrap gap-3">
        {/* Left Side: Author Info */}
        {author ? (
          <Link
            href={ROUTES.PROFILE(author._id)}
            className="flex items-center gap-2 group"
          >
            {author.image && author?.image !== "undefined" ? (
              <Image
                src={author.image}
                alt={author.name}
                width={20}
                height={20}
                className="h-5 w-5 rounded-full object-cover"
              />
            ) : (
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                {author.name ? author.name[0].toUpperCase() : "?"}
              </div>
            )}
            <p className="body-medium text-foreground group-hover:text-primary transition-colors">
              {author.name}
            </p>
            <span className="small-regular text-muted-foreground line-clamp-1 max-sm:hidden">
              • asked {getTimestamp(createdAt)}
            </span>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
              ?
            </div>
            <p className="body-medium text-muted-foreground">Unknown Author</p>
            <span className="small-regular text-muted-foreground line-clamp-1 max-sm:hidden">
              • asked {getTimestamp(createdAt)}
            </span>
          </div>
        )}

        {/* Right Side: Metrics */}
        <div className="flex items-center gap-4">
          <Metric
            icon={ThumbsUp}
            value={formatNumber(upvotes)}
            title="Votes"
            textStyles="text-foreground small-medium"
          />
          <Metric
            icon={MessageCircle}
            value={formatNumber(answers)}
            title="Answers"
            textStyles="text-foreground small-medium"
          />
          <Metric
            icon={Eye}
            value={formatNumber(views)}
            title="Views"
            textStyles="text-foreground small-medium"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
