import React from "react";
import Link from "next/link";
import ROUTES from "@/constant/route";
import { Eye, MessageCircle, ThumbsUp, } from "lucide-react";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import TagCard from "./TagCard";
import Metric from "../Matric";
import { Question } from "@/Types/global";

interface Props {
  question: Question;
}



// --- Helper Functions ---
const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
};

const QuestionCard = ({ question }: Props) => {
  const { 
    id, 
    title, 
    tags, 
    author, 
    upvotes, 
    views, 
    answers, 
    createdAt,
    description,
    image 
  } = question;

  return (
    <div className="card-wrapper rounded-[10px] bg-background p-9 shadow-sm border border-border/50 hover:shadow-md transition-shadow sm:px-11">
      
      {/* --- Header & Title --- */}
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-muted-foreground line-clamp-1 flex sm:hidden mb-2">
            {getTimestamp(createdAt)}
          </span>
          
          <Link href={ROUTES.QUESTION ? ROUTES.QUESTION(id) : '#'}>
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
        {tags.map((tag,index) => (
          // Using TagCard with compact prop so they sit side-by-side
          <TagCard 
            key={index} 
            id={tag.id} 
            name={tag.name} 
            compact={true} 
          />
        ))}
      </div>

      {/* --- Footer Section (Author + Metrics on same line) --- */}
      <div className="flex items-center justify-between mt-6 w-full flex-wrap gap-3">
        
        {/* Left Side: Author Info */}
        <Link href={ROUTES.PROFILE(author.id)} className="flex items-center gap-2 group">
           {author.image ? (
              <Image
                src={author.image} 
                alt={author.name} 
                width={20}
                height={20}
                className="h-5 w-5 rounded-full object-cover"
              />
           ) : (
             <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                {author?.name?.[0]?? ''}
             </div>
           )}
            
            <p className="body-medium text-foreground group-hover:text-primary transition-colors">
              {author.name}
            </p>
            
            <span className="small-regular text-muted-foreground line-clamp-1 max-sm:hidden">
                • asked {getTimestamp(createdAt)}
            </span>
        </Link>

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
              value={formatNumber(answers.length || 0)} 
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