import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import ProfileLink from "@/components/user/ProfileLink";
import UserAvatar from "@/components/UserAvtar";
import {
  getUser,
  getUserAnswers,
  getUserQuestions,
  getUserTags,
} from "@/lib/actions/user.action";
import { RouteParams } from "@/Types/global";
import { CalendarDays, Link as LinkIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stats from "@/components/user/Stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EMPTY_ANSWER, EMPTY_QUESTION, EMPTY_TAGS } from "@/constant/state";
import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/Pagination";
import AnswerCard from "@/components/cards/AnswerCard";
import TagCard from "@/components/cards/TagCard";

const Profile = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize } = await searchParams;
  if (!id) notFound();

  const session = await auth();
  const { success, data, error } = await getUser({ userId: id });

  if (!success)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-destructive font-bold text-lg">
          {error?.message}
        </div>
      </div>
    );

  const { user, totalQuestions, totalAnswers } = data!;
  const {
    success: userQuestionSuccess,
    data: userQuestions,
    error: userQuestionError,
  } = await getUserQuestions({
    userId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });
  const {
    success: userAnswerSuccess,
    data: userAnswers,
    error: userAnswerError,
  } = await getUserAnswers({
    userId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });
  const {
    success: userTagSuccess,
    data: userTags,
    error: userTagError,
  } = await getUserTags({
    userId: id,
  });

  const { questions, isNext, hasMoreQuestion } = userQuestions!;
  const { answers, isNext: isNextAnswer, hasMoreAnswer } = userAnswers!;
  const { tags } = userTags!;

  const {
    _id,
    name,
    username,
    bio,
    location,
    portfolio,
    reputation,
    image,
    joinedAt,
  } = user;

  return (
    <section className="w-full">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          {/* Avatar */}
          <UserAvatar
            id={_id}
            name={name}
            imageUrl={image}
            className="h-32 w-32 border-4 border-background shadow-md"
            fallbackClassName="text-4xl font-bold bg-secondary text-secondary-foreground"
          />

          {/* User Info */}
          <div className="mt-3 text-start">
            <h1 className="h1-bold text-3xl font-bold text-foreground">
              {name}
            </h1>
            <p className="body-regular text-muted-foreground text-lg">
              @{username}
            </p>

            {/* Profile Links & Metadata */}
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5 text-sm">
              {portfolio && (
                <ProfileLink
                  icon={LinkIcon}
                  href={portfolio}
                  title="Portfolio"
                />
              )}
              {location && <ProfileLink icon={MapPin} title={location} />}
              {/* Join Date (Optional if your DB has it) */}
              {joinedAt && (
                <ProfileLink
                  icon={CalendarDays}
                  title={`Joined ${new Date(joinedAt).toLocaleDateString()}`}
                />
              )}
            </div>

            {/* Bio */}
            {bio && (
              <p className="paragraph-regular text-foreground mt-8 max-w-lg leading-relaxed">
                {bio}
              </p>
            )}
          </div>
        </div>

        {/* Edit Profile Button (Only for logged in user) */}
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          {session?.user?.id === id && (
            <Link href={`/profile/${id}/edit`}>
              <Button
                variant="outline"
                className="min-h-[46px] min-w-[175px] px-4 py-3 border-primary/20 bg-secondary/10 hover:bg-secondary/30"
              >
                Edit Profile
              </Button>
            </Link>
          )}
        </div>
      </div>
      <Stats
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
        badges={{
          GOLD: 0,
          SILVER: 0,
          BRONZE: 0,
        }}
      />

      {/* --- MAIN CONTENT AREA --- */}
      <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:gap-10">
        {/* LEFT: Tabs for Posts & Answers */}
        <div className="flex-1 lg:flex-2">
          <Tabs defaultValue="top-posts" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2 gap-2 bg-secondary/30 p-1 rounded-lg">
              <TabsTrigger
                value="top-posts"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
              >
                Top Posts
              </TabsTrigger>
              <TabsTrigger
                value="answers"
                className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
              >
                Answers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="top-posts" className="mt-0">
              <DataRenderer
                data={questions}
                error={userQuestionError}
                success={userQuestionSuccess}
                empty={EMPTY_QUESTION}
                render={(hotQuestion) => (
                  <div className="flex flex-col gap-4">
                    {hotQuestion.map((question) => (
                      <QuestionCard
                        key={question._id}
                        question={question}
                        showActionBtns={
                          session?.user?.id === String(question.author._id)
                        }
                      />
                    ))}
                  </div>
                )}
              />
              <div className="mt-6">
                <Pagination page={page} isNext={hasMoreQuestion} />
              </div>
            </TabsContent>

            <TabsContent value="answers" className="mt-0">
              <DataRenderer
                data={answers}
                error={userAnswerError}
                success={userAnswerSuccess}
                empty={EMPTY_ANSWER}
                render={(hotAnswer) => (
                  <div className="flex flex-col gap-4">
                    {hotAnswer.map((answer) => (
                      <AnswerCard
                        key={answer._id}
                        {...answer}
                        content={answer.content.slice(0, 100)}
                        containerClass="rounded-lg bg-card border border-border/50 p-6 hover:shadow-md transition-shadow"
                        showMore
                        showActionBtns={
                          session?.user?.id === String(answer.author._id)
                        }
                      />
                    ))}
                  </div>
                )}
              />
              <div className="mt-6">
                <Pagination page={page} isNext={hasMoreAnswer} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* RIGHT: Top Tags Sidebar */}
        <aside className="w-full lg:w-[280px] lg:min-w-[200px] shrink-0">
          <div className="rounded-xl bg-card border border-border/50 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              Top Tags
            </h3>
            <DataRenderer
              data={tags}
              error={userTagError}
              success={userTagSuccess}
              empty={EMPTY_TAGS}
              render={(hotTag) => (
                <div className="flex flex-col gap-3">
                  {hotTag.map((tag) => (
                    <TagCard
                      key={tag._id}
                      id={tag._id}
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
        </aside>
      </div>
    </section>
  );
};

export default Profile;
