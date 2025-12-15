"use client";

import { sidebarLinks } from "@/constant"; // Assuming this is where your array is
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils"; // If you don't have this helper, just use template literals
import { SheetClose } from "@/components/ui/sheet";

function NavLink({ isMobileNav = false }: { isMobileNav?: boolean }) {
  const pathname = usePathname();
  const userId = 1

  return (
    <div className="flex flex-col gap-2 w-full">
      {sidebarLinks.map((item) => {
        // specific logic to match exact route or sub-routes
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

          if(item.route==="/profile"){
            if(userId) item.route= `${item.route}/${userId}`;
            else return null;
          }

        const LinkComponent= (
          <Link
            href={item.route}
            key={item.label}
            className={`
              group flex items-center justify-start gap-4 rounded-lg p-3 transition-all duration-200
              ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm font-bold" // Active State
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground font-medium" // Inactive State
              }
            `}
          >
            {/* Icon Wrapper */}
            <span className={`${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary transition-colors"}`}>
              {/* Since your icons are already components <House />, we clone them to enforce size if needed, 
                  otherwise standard text sizing applies via currentColor */}
              {React.cloneElement(item.icon as React.ReactElement, { 
                  size: 20 
              })}
            </span>

            {/* Label */}
            <p className={`${isMobileNav ? "text-base" : "text-sm"} leading-none`}>
              {item.label}
            </p>
          </Link>
        );
        return isMobileNav ? (
            <SheetClose asChild key={item.route}>
                {LinkComponent}
            </SheetClose>
        ):(
            <React.Fragment key={item.route} >
                {LinkComponent}
            </React.Fragment>
        )
      })}
    </div>
  );
}

export default NavLink;