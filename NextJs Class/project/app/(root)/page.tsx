import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filter/CommonFilter";
import HomeFilter from "@/components/filter/HomeFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constant/filters";
import ROUTES from "@/constant/route";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const Home = async ({ searchParams }: SearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 1,
    query: query || "",
    filter: filter || "",
  });
  const { questions, isNext } = data || {};
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-3xl font-bold max-sm:text-2xl max-sm:text-center">
          All Questions
        </h1>

        <Link
          href={ROUTES.ASK_QUESTION}
          className="flex justify-end max-sm:w-full"
        >
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 w-full sm:w-auto">
            Ask a Question
          </Button>
        </Link>
      </section>

      <section className="mt-11 flex justify-between gap-4 max-sm:flex-col max-sm:items-center">
        <LocalSearch
          route="/"
          placeholder="Search questions..."
          otherClasses="flex-1 max-sm:w-full text-center w-full"
        />

        <CommonFilter
          filters={HomePageFilters}
          otherClasses="max-sm:w-full sm:min-w-32"
          containerClasses="max-sm:w-full"
          // otherClasses="max-sm:w-full min-h-[56px]"
        />
      </section>

      <HomeFilter />
      <DataRenderer
        success={success}
        error={error}
        data={questions}
        render={(quesions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions?.map((question, index) => (
              <QuestionCard key={index} question={question} />
            ))}
          </div>
        )}
      />
      <Pagination page={page} isNext={isNext || false} />
    </>
  );
};

export default Home;
