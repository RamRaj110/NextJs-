import UserCard from "@/components/cards/UserCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filter/CommonFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { UserFilters } from "@/constant/filters";
import ROUTES from "@/constant/route";
import { EMPTY_USER } from "@/constant/state";
import { getUsers } from "@/lib/actions/user.action";
import { RouteParams } from "@/Types/global";
import Link from "next/link";

async function Community({ searchParams }: RouteParams) {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { users, isNext } = data || {};

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
        <section>
          <CommonFilter
            filters={UserFilters}
            otherClasses="max-sm:w-full sm:min-w-32"
            containerClasses="max-sm:w-full"
          />
        </section>
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
        <Pagination page={page} isNext={isNext || false} />
      </section>
    </>
  );
}

export default Community;
