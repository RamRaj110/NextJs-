import UserCard from "@/components/cards/UserCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constant/route";
import { EMPTY_USER } from "@/constant/state";
import { getUsers } from "@/lib/actions/user.action";
import { RouteParams } from "@/Types/global";

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
    <div>
      <h1>All Users</h1>
      <div>
        <LocalSearch
          route={ROUTES.COMMUNITY}
          placeholder="Search users..."
          otherClasses="flex-1"
        />
      </div>
      <DataRenderer
        success={success}
        data={users}
        error={error}
        empty={EMPTY_USER}
        render={(data) => (
          <div>
            {data.map((user) => (
              <UserCard key={user._id} {...user} />
            ))}
          </div>
        )}
      />
    </div>
  );
}

export default Community;
