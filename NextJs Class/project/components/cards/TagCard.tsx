import React from 'react'
import Link from 'next/link'
import ROUTES from '@/constant/routes';
import { Badge } from '../ui/badge';
import { getIconClassName } from '@/lib/utils';

interface Props {
  id: number;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
}

function TagCard({ id, name, questions, showCount, compact }: Props) {
  const iconClass = getIconClassName(name);
  
  return (
    <Link 
        href={ROUTES.TAGS(id)} 
        // FIX: Conditional width based on 'compact' prop
        className={`flex justify-between gap-2 group items-center ${compact ? 'w-fit' : 'w-full'}`}
    >
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
  )
}

export default TagCard