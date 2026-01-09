"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeyformUrlQuery } from "@/lib/url";

interface Props {
  route?: string;
  placeholder?: string;
  otherClasses?: string;
}

function LocalSearch({ route, placeholder, otherClasses }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();
  const searchQuery = searchParam.get("search") || "";

  const [query, setQuery] = useState(searchQuery);

  const searchParamsString = searchParam.toString();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery({
          params: searchParamsString,
          key: "search",
          value: query,
        });
        router.push(newUrl, { scroll: false });
      } else if (pathname === route) {
        const newUrl = removeKeyformUrlQuery({
          params: searchParamsString,
          keyToRemove: ["search"],
        });
        router.push(newUrl, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, pathname, route, router, searchParamsString]);

  return (
    <div className="relative ">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search
          className={`h-5 w-5 text-center text-muted-foreground ${otherClasses}`}
        />
      </div>
      <div>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="block  rounded-full p-2.5 pl-10 text-sm text-foreground border-none placeholder:text-muted-foreground transition-all duration-300"
          placeholder={placeholder || "Search..."}
        />
      </div>
    </div>
  );
}

export default LocalSearch;
