import React from 'react'
import NavLink from './navbar/NavLink'
import Link from 'next/link'
import ROUTES from '@/constant/route'
import { Button } from '../ui/button'
import { LogIn, LogOut, UserPlus } from 'lucide-react'
import { auth, signOut } from '@/auth'

const  LeftSideBar =async()=> {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <section className="hidden md:flex h-screen flex-col justify-between sticky left-0 top-0 overflow-y-auto border-r border-border bg-background pt-8 pb-6 shadow-sm
      md:w-20 lg:w-64 transition-all duration-300 ease-in-out">
      
      {/* Top Section: Navigation */}
      <div className="flex flex-col gap-4 px-2 lg:px-4">
        {/* Note: You will need to update NavLink internally to hide text on tablets too */}
        <NavLink userId={userId}/>
      </div>

      {/* Bottom Section: Auth Buttons */}
      <div className="flex flex-col gap-3 px-2 lg:px-4">
        {userId ? (<form 
        action={async ()=>{
          "use server"
          await signOut()
        }}
        >
            <Button type='submit' variant="outline" className="w-full h-11 bg-transparent border-border hover:bg-secondary gap-2
            md:justify-center lg:justify-start text-center px-0 lg:px-4">
            <LogOut size={20} className="text-muted-foreground" />
            <span className="font-medium max-lg:hidden">Logout</span>
          </Button>
        </form>):(
        <>
        <Link href={ROUTES.SIGNIN || "/signin"} className="w-full">
          {/* Changed justify-start to dynamic justification */}
          <Button variant="outline" className="w-full h-11 bg-transparent border-border hover:bg-secondary gap-2
            md:justify-center lg:justify-start px-0 lg:px-4">
            <LogIn size={20} className="text-muted-foreground" />
            <span className="font-medium max-lg:hidden">Log In</span>
          </Button>
        </Link>

        <Link href={ROUTES.SIGNUP || "/signup"} className="w-full">
          <Button className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md gap-2
            md:justify-center lg:justify-start px-0 lg:px-4">
            <UserPlus size={20} />
            <span className="font-bold max-lg:hidden">Sign Up</span>
          </Button>
        </Link>
        </>)
        }
      </div>
    </section>
  )
}

export default LeftSideBar