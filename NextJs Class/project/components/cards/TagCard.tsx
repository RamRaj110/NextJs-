import React from 'react'
import Link from 'next/link'
import ROUTES from '@/constant/route';
import { Badge } from '../ui/badge';
import { getIconClassName, getTechDescription } from '@/lib/utils';

interface Props {
  id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  children?: React.ReactNode;
}

const TagCard = ({ id, name, questions, showCount, compact, children }: Props) => {
  const iconClass = getIconClassName(name);
  const description = getTechDescription(name);
  if (compact) {
    return (
      <Link href={ROUTES.TAG(id)} className="flex justify-between gap-2">
        <Badge className="subtle-medium bg-secondary text-secondary-foreground hover:bg-primary/20 rounded-md border-none px-4 py-2 uppercase transition-all">
          <div className="flex items-center gap-2">
            <i className={`${iconClass} text-sm`}></i>
            <span className="font-medium text-xs sm:text-sm">{name}</span>
          </div>
        </Badge>
        
        {showCount && (
          <p className="small-medium text-muted-foreground text-xs font-semibold">
            {questions}+
          </p>
        )}
      </Link>
    );
  }
  return (
    <Link 
      href={ROUTES.TAG(id)} 
      className="shadow-sm dark:shadow-none card-wrapper flex w-full flex-col rounded-2xl border bg-card p-8 transition-all hover:shadow-lg hover:border-primary dark:bg-black dark:border-zinc-800 dark:hover:border-primary"
    >
      <div className="flex w-full flex-col justify-between gap-4">
        <div className="flex items-center justify-between w-full">
            <Badge className="subtle-medium bg-secondary text-secondary-foreground hover:bg-primary/20 rounded-md border-none px-4 py-2 uppercase transition-all">
                <div className="flex items-center gap-2">
                    <i className={`${iconClass} text-xl`}></i>
                    <span className="font-medium text-base">{name}</span>
                </div>
            </Badge>
        </div>

        <p className="body-regular text-muted-foreground mt-4 line-clamp-3">
          {description}
        </p>

        <p className="small-medium text-primary mt-4 flex items-center gap-1">
          <span className="font-semibold text-lg">{questions}+</span> 
          <span className="text-muted-foreground">Questions</span>
        </p>
      </div>
    </Link>
  );
};

export default TagCard
