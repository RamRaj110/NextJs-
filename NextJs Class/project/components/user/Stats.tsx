import { formatNumber } from "@/lib/utils";
import { BadgeCounts } from "@/Types/global";
import { MessageSquare, HelpCircle, Medal } from "lucide-react";
import StatsCard from "../cards/StastsCard";

interface Props {
  totalQuestions: number;
  totalAnswers: number;
  badges: BadgeCounts;
  reputation?: number;
}

function Stats({
  totalQuestions,
  totalAnswers,
  badges,
  reputation = 0,
  joinedAt,
}: Props) {
  return (
    <div className="mt-10">
      <h3 className="h3-bold text-dark200_light900 text-xl font-bold mb-5">
        Stats
      </h3>

      <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        {/* --- 1. Questions & Answers --- */}
        <div className="card-wrapper flex flex-wrap items-center justify-start gap-4 rounded-[10px] border border-border p-6 shadow-sm bg-card">
          <div className="rounded-md bg-blue-500/10 p-3">
            <HelpCircle className="text-blue-500" size={26} />
          </div>
          <div>
            <p className="paragraph-semibold text-foreground font-bold text-xl">
              {formatNumber(totalQuestions)}
            </p>
            <p className="body-medium text-muted-foreground">Questions</p>
          </div>
        </div>

        <div className="card-wrapper flex flex-wrap items-center justify-start gap-4 rounded-[10px] border border-border p-6 shadow-sm bg-card">
          <div className="rounded-md bg-orange-500/10 p-3">
            <MessageSquare className="text-orange-500" size={26} />
          </div>
          <div>
            <p className="paragraph-semibold text-foreground font-bold text-xl">
              {formatNumber(totalAnswers)}
            </p>
            <p className="body-medium text-muted-foreground">Answers</p>
          </div>
        </div>

        {/* --- 2. Badges (Gold, Silver, Bronze) --- */}
        {Object.entries(badges).map(([badge, count]) => (
          <StatsCard
            key={badge}
            imgName={badge.toLowerCase()}
            value={count}
            title={`${badge} Badges`}
            icon={<Medal className={`text-${badge.toLowerCase()}`} size={26} />}
            bgColor={`bg-${badge.toLowerCase()}/10`}
          />
        ))}
      </div>
    </div>
  );
}

export default Stats;
