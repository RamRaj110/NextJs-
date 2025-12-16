import HomeFilter from "@/components/filter/HomeFilter"
import LocalSearch from "@/components/search/LocalSearch"
import { Button } from "@/components/ui/button"
import ROUTES from "@/constant/routes"
import Link from "next/link"

const questions = [
  {
    id: 1,
    title: 'How to learn Next.js?',
    content: 'I am new to web development and want to learn Next.js...',
    description: 'Looking for resources and tips to get started with Next.js.',
    tags: [{ id: 1, name: 'Next.js' }, { id: 2, name: 'Web Development' }],
    author: { id: 1, name: 'John Doe' },
    upvotes: 10,
    answers: 2,
    views: 150,
    createdAt: '2023-10-01T10:00:00Z'
  }, 
  {
    id: 2,
    title: 'How to learn JavaScript?',
    content: 'I am new to web development...',
    description: 'Looking for resources and tips to get started with JS.',
    tags: [{ id: 3, name: 'JavaScript' }, { id: 2, name: 'Web Development' }],
    author: { id: 1, name: 'John Doe' },
    upvotes: 10,
    answers: 5,
    views: 200,
    createdAt: '2023-10-02T10:00:00Z'
  }
]

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { search = '' } = await searchParams;

  // Filter questions based on search query
  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* HEADER SECTION */}
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-3xl font-bold">All Questions</h1>
        
        <Link href={ROUTES.ASK_QUESTION} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 w-full sm:w-auto">
            Ask a Question
          </Button>
        </Link>
      </section>

      {/* SEARCH SECTION */}
      <section className="mt-11">
        <LocalSearch 
            route="/"
            placeholder='Search questions...' 
            otherClasses='flex-1' 
        />
      </section>

   <HomeFilter />

      {/* QUESTION LIST (Inlined styles - no QuestionCard) */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <div key={question.id} className="card-wrapper rounded-[10px] p-9 sm:px-11 bg-card border border-border shadow-sm">
                
                {/* Title & Date */}
                <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
                    <div>
                        <span className="text-muted-foreground text-xs line-clamp-1 flex sm:hidden">
                            {new Date(question.createdAt).toLocaleDateString()}
                        </span>
                        <Link href={ROUTES.PROFILE(question.id)}>
                            <h3 className="sm:h3-semibold base-semibold text-foreground hover:text-primary transition-colors text-xl font-bold line-clamp-1 flex-1">
                                {question.title}
                            </h3>
                        </Link>
                    </div>
                </div>

                <p className="mt-3.5 text-muted-foreground text-sm line-clamp-2">{question.description}</p>

                {/* Tags */}
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <span key={tag.id} className="subtle-medium bg-secondary text-secondary-foreground rounded-md px-4 py-2 text-xs uppercase font-medium">
                        {tag.name}
                    </span>
                  ))}
                </div>

                {/* Footer: Author & Metrics */}
                <div className="flex justify-between items-center mt-6 w-full flex-wrap gap-3 text-xs text-muted-foreground font-medium">
                  <div className="flex items-center gap-1">
                      <span>{question.author.name}</span>
                      <span className="hidden sm:inline"> • asked {new Date(question.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-3">
                      <span>{question.upvotes} Votes</span>
                      <span>{question.answers} Answers</span>
                      <span>{question.views} Views</span>
                  </div>
                </div>
              </div>
            ))
        ) : (
             <div className="mt-10 flex w-full items-center justify-center">
                <p className="text-muted-foreground">No questions found.</p>
             </div>
        )}
      </div>
    </>
  )
}

export default Home