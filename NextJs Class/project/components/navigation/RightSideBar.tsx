import React from 'react'
import Link from 'next/link'
import ROUTES from '@/constant/routes';
import TagCard from '../cards/TagCard';
import { ChevronRight } from 'lucide-react';

const hotQuestions = [
    { id: 1, title: "How to center a div in CSS?", answers: 42, votes: 128 },
    { id: 2, title: "What is the difference between let and var in JavaScript?", answers: 30, votes: 95 },
    { id: 3, title: "How to optimize React performance?", answers: 25, votes: 80 },
    { id: 4, title: "What is the use of useEffect?", answers: 15, votes: 50 },
    { id: 5, title: "Explain Redux Toolkit vs Context API", answers: 12, votes: 40 },
];

const popularTags = [
    { id: 1, name: "JavaScript", questions: 1500 },
    { id: 2, name: "React", questions: 1200 },
    { id: 3, name: "CSS", questions: 900 },
    { id: 4, name: "Next.js", questions: 500 },
    { id: 5, name: "TypeScript", questions: 400 },
];

const RightSideBar = () => {
  return (
    <section className="hidden xl:flex h-screen w-[330px] flex-col  border-l border-border bg-background p-6 sticky right-0 top-0 shadow-light-300 dark:shadow-none custom-scrollbar">
        <div className="flex flex-col gap-6">
            <h3 className="h3-bold text-foreground font-bold text-lg">Top Questions</h3>
            
            <div className="flex flex-col gap-[30px]">
                {hotQuestions.map((question) => (
                    <Link 
                        key={question.id} 
                        href={ROUTES.PROFILE(question.id)} 
                        className='flex cursor-pointer items-center justify-between gap-7 group'
                    >
                        <p className="body-medium text-muted-foreground group-hover:text-primary text-sm font-medium line-clamp-2">
                            {question.title}
                        </p>
                        
                        <ChevronRight 
                            size={20} 
                            className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" 
                        />
                    </Link>
                ))}
            </div>
        </div>

        {/* --- Popular Tags Section --- */}
        <div className="mt-16 flex flex-col gap-6">
            <h3 className="h3-bold text-foreground font-bold text-lg">Popular Tags</h3>
            
            <div className="flex flex-col gap-4">
               {popularTags.map(({id, name, questions}) => (
                <TagCard 
                    key={id} 
                    id={id} 
                    name={name} 
                    questions={questions} 
                    showCount 
                    compact 
                />
               ))}
            </div>
        </div>
    </section>
  )
}

export default RightSideBar