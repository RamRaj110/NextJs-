import Link from "next/link";
import React from "react";

interface Props {
  icon: any; // Lucide Icon component
  href?: string;
  title: string;
}

const ProfileLink = ({ icon: Icon, href, title }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <Icon size={20} className="text-muted-foreground" />

      {href ? (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={href}
          className="text-blue-500 hover:underline font-medium"
        >
          {title}
        </Link>
      ) : (
        <span className="text-foreground font-medium">{title}</span>
      )}
    </div>
  );
};

export default ProfileLink;
