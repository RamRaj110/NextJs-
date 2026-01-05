import TagCard from "@/components/cards/TagCard";
import Preview from "@/components/editor/Preview";
import Metric from "@/components/Matric";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constant/route";
import { getQuestion, increamentView } from "@/lib/actions/question.action";
import { formatNumber } from "@/lib/utils";
import {
  Clock,
  Eye,
  MessageCircle,
  Share2,
  Star,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React from "react";

const QuestionDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { success, data: question } = await getQuestion({ questionId: [id] });
  after(async()=>{
    await increamentView({questionId: id})
  })


  if (!success || !question) {
    redirect("/404");
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        {/* --- HEADER: Author & Actions --- */}
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          {question.author ? (
            <Link
              href={ROUTES.PROFILE(question.author._id)}
              className="flex items-center justify-start gap-1"
            >
              <div className="h-[22px] w-[22px] rounded-full bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600">
                {question.author.name[0]}
              </div>
              <p className="paragraph-semibold text-foreground font-semibold">
                {question.author.name}
              </p>
            </Link>
          ) : (
            <div className="flex items-center justify-start gap-1">
              <div className="h-[22px] w-[22px] rounded-full bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600">
                ?
              </div>
              <p className="paragraph-semibold text-muted-foreground font-semibold">
                Unknown Author
              </p>
            </div>
          )}

          <div className="flex justify-end">
            {/* Voting / Saving (Mock UI) */}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
              >
                <Star size={18} className="mr-1" /> Save
              </Button>
            </div>
          </div>
        </div>

        {/* --- TITLE --- */}
        <h2 className="h2-semibold text-foreground mt-3.5 w-full text-left text-3xl font-bold">
          {question.title}
        </h2>

        {/* --- METRICS ROW --- */}
        <div className="mb-8 mt-5 flex flex-wrap gap-4 border-b border-border pb-8">
          <Metric
            icon={Clock}
            value={`asked ${new Date(question.createdAt).toLocaleDateString()}`}
            title=""
            textStyles="small-medium text-muted-foreground"
          />
          <Metric
            icon={MessageCircle}
            value={question.answers}
            title="Answers"
            textStyles="small-medium text-primary"
          />
          <Metric
            icon={Eye}
            value={formatNumber(question.views)}
            title="Views"
            textStyles="small-medium text-muted-foreground"
          />
        </div>
      </div>

      <Preview content={question.content} />

      {/* --- TAGS --- */}
      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <TagCard key={tag._id} id={tag._id} name={tag.name} compact={true} />
        ))}
      </div>

      {/* --- ACTIONS ROW (Share/Report) --- */}
      <div className="mt-8 flex items-center gap-4 border-b border-border pb-8">
        <Button
          variant="ghost"
          className="text-muted-foreground gap-2 pl-0 hover:bg-transparent hover:text-primary"
        >
          <Share2 size={18} /> Share
        </Button>
        {/* Add more actions like Report here if needed */}
      </div>

      {/* --- ANSWERS SECTION (Placeholder) --- */}
      <div className="mt-8">
        <h3 className="h3-bold text-xl font-bold">
          {question.answers} Answers
        </h3>
        {/* You would render your <DataRenderer /> for answers here later */}
        <div className="mt-5 py-10 text-center text-muted-foreground border border-dashed border-border rounded-lg">
          Answers will be listed here...
        </div>
      </div>
    </>
  );
};
export default QuestionDetails;
