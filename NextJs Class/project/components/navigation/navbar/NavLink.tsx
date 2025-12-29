"use client";

import { sidebarLinks } from "@/constant"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SheetClose } from "@/components/ui/sheet";

function NavLink({ isMobileNav = false,userId }: { isMobileNav?: boolean;userId?:string }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 w-full">
      {sidebarLinks.map((item) => {
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
              group flex items-center gap-4 rounded-lg p-3 transition-all duration-200
              ${
                // If NOT mobile nav: Center icon on Tablet (md), Left align on Desktop (lg)
                !isMobileNav ? "justify-start md:justify-center lg:justify-start" : "justify-start"
              }
              ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm font-bold" // Active State
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground font-medium" // Inactive State
              }
            `}
          >
            <span className={`${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary transition-colors"}`}>
              {React.cloneElement(item.icon as React.ReactElement, { 
                  size: 20 
              })}
            </span>

            {/* Label - Hidden on Tablet (max-lg) unless it's the Mobile Nav */}
            <p className={`
                ${isMobileNav ? "text-base" : "text-sm max-lg:hidden"} 
                leading-none
            `}>
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