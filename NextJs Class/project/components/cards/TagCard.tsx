import React from 'react'
import Link from 'next/link'
import ROUTES from '@/constant/route';
import { Badge } from '../ui/badge';
import { getIconClassName } from '@/lib/utils';

interface Props {
  id: number;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  children?: React.ReactNode; // Add children prop
}

function TagCard({ id, name, questions, showCount, compact, children }: Props) {
  const iconClass = getIconClassName(name);
  
  const content = (
    <>
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
      
      {children}
    </>
  );

  // If children exist (remove button), don't use Link wrapper
  if (children) {
    return (
      <div className={`flex justify-between gap-2 group items-center ${compact ? 'w-fit' : 'w-full'}`}>
        {content}
      </div>
    );
  }

  return (
    <Link 
      href={ROUTES.TAGS(id)} 
      className={`flex justify-between gap-2 group items-center ${compact ? 'w-fit' : 'w-full'}`}
    >
      {content}
    </Link>
  );
}

export default TagCard
