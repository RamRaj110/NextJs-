import UserCard from "@/components/cards/UserCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button"; // Optional: For filters
import ROUTES from "@/constant/route";
import { EMPTY_USER } from "@/constant/state";
import { getUsers } from "@/lib/actions/user.action";
import { RouteParams } from "@/Types/global";
import Link from "next/link";

const CommunityFilters = [
  { name: "New Users", value: "new_users" },
  { name: "Old Users", value: "old_users" },
  { name: "Top Contributors", value: "top_contributors" },
];

async function Community({ searchParams }: RouteParams) {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { users } = data || {};

  return (
    <>
      {/* --- Header Section --- */}
      <h1 className="h1-bold text-dark100_light900 text-3xl font-bold">
        All Users
      </h1>

      {/* --- Search & Filters Section --- */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.COMMUNITY}
          placeholder="Search for amazing minds..."
          otherClasses="flex-1"
        />

        {/* <div className="flex max-sm:w-full">
          <Button
            variant="outline"
            className="hidden min-h-[56px] sm:flex bg-card"
          >
            Select Filter
          </Button>
        </div> */}
      </div>

      {/* --- Inline Filters (Mobile/Tablet Friendly) --- */}
      <div className="mt-10 hidden flex-wrap gap-3 md:flex">
        {CommunityFilters.map((item) => (
          <Link
            key={item.value}
            href={`${ROUTES.COMMUNITY}?filter=${item.value}`}
            scroll={false}
          >
            <Button
              variant="secondary"
              className={`px-6 py-3 capitalize shadow-none rounded-lg ${
                filter === item.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
      <section className="mt-12">
        <DataRenderer
          success={success}
          data={users}
          error={error}
          empty={EMPTY_USER}
          render={(users) => (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {users.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </div>
          )}
        />
      </section>
    </>
  );
}

export default Community;
