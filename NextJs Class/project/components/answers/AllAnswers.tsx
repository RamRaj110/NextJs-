import React from "react";
import DataRenderer from "@/components/DataRenderer"; // Ensure path is correct
import { EMPTY_ANSWER } from "@/constant/state";
import AnswerCard from "@/components/cards/AnswerCard";
import { Answers, ActionResponse } from "@/Types/global";

interface Props extends ActionResponse<Answers[]> {
  totalAnswers: number;
}

const AllAnswers = ({ data, success, error, totalAnswers }: Props) => {
  console.log("data", data);
  return (
    <div className="mt-11">
      {/* --- Header: Count & Filter --- */}
      <div className="flex items-center justify-between">
        <h3 className="h3-bold text-primary-500">
          {totalAnswers} {totalAnswers === 1 ? "Answer" : "Answers"}
        </h3>

        {/* Simple Filter Placeholder */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Sort by:
          </span>
          {/* <Select defaultValue="recent">
            <SelectTrigger className="w-[120px] h-8 bg-background">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
      </div>

      {/* --- Answer List --- */}
      <DataRenderer
        data={data}
        success={success}
        error={error}
        empty={EMPTY_ANSWER}
        render={(answers) =>
          answers.map((answer) => <AnswerCard key={answer._id} {...answer} />)
        }
      />
    </div>
  );
};

export default AllAnswers;
