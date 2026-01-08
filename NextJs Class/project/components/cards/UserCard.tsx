import React from "react";
import Link from "next/link";
import ROUTES from "@/constant/route";
import { User } from "@/Types/global";
import UserAvatar from "../UserAvtar";
import { Badge } from "@/components/ui/badge";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  const { _id, name, image, username } = user;

  return (
    <Link href={ROUTES.PROFILE(_id)}>
      <article className="bg-card flex w-full flex-col items-center justify-center rounded-2xl border border-border p-8 text-center transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
        {/* --- Avatar --- */}
        <div className="mb-4 rounded-full border-[3px] border-secondary p-1">
          <UserAvatar
            id={_id}
            name={name}
            imageUrl={image}
            className="h-24 w-24" // Made avatar slightly larger
            fallbackClassName="text-[36px] font-bold bg-secondary text-secondary-foreground"
          />
        </div>

        {/* --- Info --- */}
        <div className="mt-2 text-center w-full">
          <h3 className="h3-bold text-foreground line-clamp-1 break-all text-xl font-bold">
            {name}
          </h3>
          <p className="body-regular text-muted-foreground mt-2 text-sm font-medium">
            @{username}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
