import LocalSearch from "@/components/search/LocalSearch"
import { Button } from "@/components/ui/button"
import ROUTES from "@/constant/routes"
import Link from "next/link"


const Home = async() => {

  return (
    <>
    <section className="flex items-center justify-between mb-6 ">
      <h1>All Question</h1>
      <Button >
      <Link href={ROUTES.ASK_QUESTIONS}>
      Ask a Question
      </Link>
      </Button>
    </section>
    <section>
      <LocalSearch placeholder='Search questions...' otherClasses='flex-1mki' />
    </section>
    Home filter 
        </>
  )
}

export default Home