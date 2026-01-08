import { User } from "@/Types/global";
import React from "react";
import UserAvatar from "../UserAvtar";
import Link from "next/link";
import ROUTES from "@/constant/route";

const UserCard = ({ _id, name, image, username }: User) => {
  return (
    <div>
      <article>
        <UserAvatar
          id={_id}
          name={name}
          className="w-12 h-12"
          fallbackClassName="w-12 h-12"
        />
        <Link href={ROUTES.PROFILE(_id)}></Link>
      </article>
    </div>
  );
};

export default UserCard;
