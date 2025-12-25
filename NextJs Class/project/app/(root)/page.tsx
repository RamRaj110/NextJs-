import QuestionCard from "@/components/cards/QuestionCard"
import HomeFilter from "@/components/filter/HomeFilter"
import LocalSearch from "@/components/search/LocalSearch"
import { Button } from "@/components/ui/button"
import ROUTES from "@/constant/routes"
import { api } from "@/lib/api"
import handleError from "@/lib/handlers/errors"
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
    image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.tvaMwK3QuFxhTYg4PSNNVAHaHa%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=7b8313f1cb91f9661c0fab1d3ff1d9384ebfe8b337b65d3309c089007f9e18f7&ipo=images',
    createdAt: '2023-10-02T10:00:00Z'
  }, {
    id: 3,
    title: 'How to learn React?',
    content: 'I am new to web development...',
    description: 'Looking for resources and tips to get started with JS.',
    tags: [{ id: 3, name: 'React' }, { id: 2, name: 'Web Development' }],
    author: { id: 1, name: 'John Doe' },
    upvotes: 10,
    answers: 5,
    views: 200,
    image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.tvaMwK3QuFxhTYg4PSNNVAHaHa%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=7b8313f1cb91f9661c0fab1d3ff1d9384ebfe8b337b65d3309c089007f9e18f7&ipo=images',
    createdAt: '2023-10-02T10:00:00Z'
  },
   {
    id: 4,
    title: 'How to learn node?',
    content: 'I am new to web development...',
    description: 'Looking for resources and tips to get started with JS.',
    tags: [{ id: 3, name: 'Node' }, { id: 2, name: 'Web Development' }],
    author: { id: 1, name: 'John Doe' },
    upvotes: 10,
    answers: 5,
    views: 200,
    image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.tvaMwK3QuFxhTYg4PSNNVAHaHa%3Fcb%3Ducfimg2%26pid%3DApi%26ucfimg%3D1&f=1&ipt=7b8313f1cb91f9661c0fab1d3ff1d9384ebfe8b337b65d3309c089007f9e18f7&ipo=images',
    createdAt: '2023-10-02T10:00:00Z'
  }
]


interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const test = async()=>{
  try {
    return await api.users.getAll();
  }catch(error){
    return handleError(error,"api");
  }
}
const Home = async ({ searchParams }: SearchParams) => {
  const users = await test();
  console.log("users",users);
  const { search = '', filter = '' } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.title.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter 
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase() 
      : true; 
    return matchesSearch && matchesFilter;
  });
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-3xl font-bold">All Questions</h1>
        
        <Link href={ROUTES.ASK_QUESTION} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 w-full sm:w-auto">
            Ask a Question
          </Button>
        </Link>
      </section>

      <section className="mt-11">
        <LocalSearch 
            route="/"
            placeholder='Search questions...' 
            otherClasses='flex-1' 
        />
      </section>

   <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
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