import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, LogIn, UserPlus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import ROUTES from "@/constant/routes" 
import NavLink from './NavLink'
const MobileNavigation = () => {
  return (
    <Sheet>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-foreground">
             <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      {/* Sheet Content - Opens from Left */}
      <SheetContent side="left" className="w-[300px] border-r border-border bg-background/95 backdrop-blur-xl">
        
        {/* Header: Logo & Brand Name */}
        <SheetHeader className=" text-left">
          <SheetTitle asChild>
            <Link href="/" className="flex items-center gap-3">
              <Image 
                className="rounded-full object-cover border border-border"
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold text-foreground">
                code<span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">Love</span>
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="">
             <NavLink isMobileNav/>
        </div>

        {/* Authentication Buttons */}
        <div className="flex flex-col gap-4 p-1 ">
            
            {/* Login Button */}
            <Link href={ROUTES.SIGNIN || "/signin"} className="w-full">
                <Button variant="outline" className="w-full justify-start gap-2 h-11 bg-transparent border-border hover:bg-secondary">
                    <LogIn size={18} className="text-muted-foreground" />
                    <span className="font-medium">Log In</span>
                </Button>
            </Link>

            {/* Sign Up Button */}
            <Link href={ROUTES.SIGNUP || "/signup"} className="w-full">
                <Button className="w-full justify-start gap-2 h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                    <UserPlus size={18} />
                    <span className="font-bold">Sign Up</span>
                </Button>
            </Link>

        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavigation