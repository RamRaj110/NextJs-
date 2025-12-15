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
      <h1>I am Home</h1>
      <form action={
        async ()=>{
          "use server"
          await signOut({redirectTo: ROUTES.SIGNIN})
        }
      }>
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
        </>
  )
}

export default Home