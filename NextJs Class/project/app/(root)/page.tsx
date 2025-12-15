import { signOut } from '@/auth';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constant/routes';
import React from 'react'

const Home = async() => {
  const session = await auth();
  console.log(session)

  return (
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
  )
}

export default Home