import React from "react";
import DataRenderer from "@/components/DataRenderer";
import { EMPTY_ANSWER } from "@/constant/state";
import AnswerCard from "@/components/cards/AnswerCard";
import { Answers, ActionResponse } from "@/Types/global";
import { formatNumber } from "@/lib/utils";
import CommonFilter from "../filter/CommonFilter";
import { AnswerFilters } from "@/constant/filters";

interface Props extends ActionResponse<Answers[]> {
  totalAnswers: number;
}

const AllAnswers = ({ data, success, error, totalAnswers }: Props) => {
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="h3-bold text-primary-500">
          {formatNumber(totalAnswers)}{" "}
          {totalAnswers === 1 ? "Answer" : "Answers"}
        </h3>
        <div className="flex items-center gap-2">
          <CommonFilter
            filters={AnswerFilters}
            otherClasses="max-sm:w-full sm:min-w-32"
            containerClasses="max-sm:w-full"
          />
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
