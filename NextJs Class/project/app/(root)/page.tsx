import LocalSearch from "@/components/search/LocalSearch"
import { Button } from "@/components/ui/button"
import ROUTES from "@/constant/routes"
import Link from "next/link"


const Home = async() => {

  return (
    <>
    <section>
      <h1>All Question</h1>
      <Button >
      <Link href={ROUTES.ASK_QUESTIONS}>
      Ask a Question
      </Link>
      </Button>
    </section>
    <section>
      <LocalSearch/>
    </section>
    Home filter 
    <div>
      <p>
        Question List
      </p>
      <p> questio 1</p>
      <p> questio 1</p>
      <p> questio 1</p>
      <p> questio 1</p>
    </div>
        </>
  )
}

export default Home