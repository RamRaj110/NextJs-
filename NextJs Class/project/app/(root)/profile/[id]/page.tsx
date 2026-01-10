import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import ProfileLink from "@/components/user/ProfileLink";
import UserAvatar from "@/components/UserAvtar";
import { getUser } from "@/lib/actions/user.action";
import { RouteParams } from "@/Types/global";
import { CalendarDays, Link as LinkIcon, MapPin, Trophy } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { Badge } from "@/components/ui/badge";

const Profile = async ({ params }: RouteParams) => {
  const { id } = await params;
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

  const { user, totalQuestions, totalAnswers } = data;
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

      {/* --- STATS SECTION --- */}
      <div className="mt-10">
        <h3 className="h3-bold text-xl font-bold mb-5">Stats</h3>

        <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
          {/* Reputation Card */}
          <div className="card-wrapper flex flex-wrap items-center justify-evenly gap-4 rounded-[10px] border border-border p-6 shadow-sm bg-card">
            <div>
              <p className="paragraph-semibold text-foreground font-bold">
                {reputation}
              </p>
              <p className="body-medium text-muted-foreground">Reputation</p>
            </div>
            <div>
              <Trophy className="text-yellow-500" size={40} />
            </div>
          </div>

          {/* Questions Card */}
          <div className="card-wrapper flex flex-wrap items-center justify-start gap-4 rounded-[10px] border border-border p-6 shadow-sm bg-card">
            <div className="rounded-md bg-blue-500/10 p-3">
              <span className="text-blue-500 font-bold text-xl">
                {totalQuestions}
              </span>
            </div>
            <div>
              <p className="body-medium text-foreground font-semibold">
                Questions
              </p>
              <p className="small-regular text-muted-foreground">asked</p>
            </div>
          </div>

          {/* Answers Card */}
          <div className="card-wrapper flex flex-wrap items-center justify-start gap-4 rounded-[10px] border border-border p-6 shadow-sm bg-card">
            <div className="rounded-md bg-green-500/10 p-3">
              <span className="text-green-500 font-bold text-xl">
                {totalAnswers}
              </span>
            </div>
            <div>
              <p className="body-medium text-foreground font-semibold">
                Answers
              </p>
              <p className="small-regular text-muted-foreground">submitted</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT TABS (Placeholder for future) --- */}
      <div className="mt-10 flex gap-4 border-b border-border pb-4">
        <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer px-6 py-2">
          Top Posts
        </Badge>
        <Badge
          variant="outline"
          className="text-muted-foreground hover:bg-secondary cursor-pointer px-6 py-2 border-border"
        >
          Answers
        </Badge>
      </div>

      <div className="mt-5 w-full">
        <div className="flex w-full flex-col items-center justify-center gap-4 py-10 bg-secondary/10 rounded-lg border border-dashed border-border text-center">
          <p className="text-muted-foreground">
            User hasn't posted any questions yet.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
