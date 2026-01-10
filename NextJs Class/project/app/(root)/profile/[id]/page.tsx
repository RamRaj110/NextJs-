import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import ProfileLink from "@/components/user/ProfileLink";
import UserAvatar from "@/components/UserAvtar";
import { getUser, getUserQuestions } from "@/lib/actions/user.action";
import { RouteParams } from "@/Types/global";
import { CalendarDays, Link as LinkIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stats from "@/components/user/Stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EMPTY_QUESTION } from "@/constant/state";
import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/Pagination";

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

  const { questions, isNext, hasMoreQuestion } = userQuestions!;

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
      <div className="mt-10 flex gap-4 border-b border-border pb-4">
        <Tabs defaultValue="top-post" className="flex-[2]">
          <TabsList className="">
            <TabsTrigger value="account">Top Posts</TabsTrigger>
            <TabsTrigger value="password">Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <DataRenderer
              data={questions}
              error={userQuestionError}
              success={userQuestionSuccess}
              empty={EMPTY_QUESTION}
              render={(hotQuestion) => (
                <div>
                  {hotQuestion.map((question) => (
                    <QuestionCard key={question._id} question={question} />
                  ))}
                </div>
              )}
            />
            <Pagination page={page} isNext={hasMoreQuestion} />
          </TabsContent>
          <TabsContent value="password">List of Answers</TabsContent>
        </Tabs>
        <div>
          <h3>Top Tags</h3>
          <div>List of Tags</div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
