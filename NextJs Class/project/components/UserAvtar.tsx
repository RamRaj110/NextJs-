"use client";

import ROUTES from "@/constant/route";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  className?: string;
  fallbackClassName?: string;
}

const UserAvatar = ({
  id,
  name,
  imageUrl,
  fallbackClassName,
  className = "h-9 w-9 rounded-full",
}: Props) => {
  const [imgError, setImgError] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={className}>
        {imageUrl && !imgError ? (
          <Image
            src={imageUrl}
            alt={name}
            // width={40}
            // height={40}
            fill
            className="rounded-full object-cover border border-border"
            onError={() => setImgError(true)}
          />
        ) : (
          <AvatarFallback className={cn("text-white ", fallbackClassName)}>
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
