import React from 'react';
import Image from 'next/image';
import { Search, Menu,  } from 'lucide-react';
import Theme from './Theme';
import Link from 'next/link';
import MobileNavigation from './MobileNavigation';
import { auth } from '@/auth';
import UserAvtar from '@/components/UserAvtar';

const  Navbar=async()=> {
  const session = await auth()
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
<div className="flex  items-center justify-center cursor-pointer gap-0.5">
    <Link href="/">
  <Image
    className="rounded-full object-cover border border-border"
    src="/logo.png"
    alt="Logo"
    width={30}  
    height={30}
  /></Link>
  <p className=" hidden sm:inline text-2xl  sm:text-xl font-bold text-foreground leading-none tracking-wide">
    code<span className="bg-linear-to-r from-primary to-violet-500 bg-clip-text text-transparent">Love</span>
  </p>
</div>
          <div className="flex flex-1 items-center justify-center max-w-md mx-auto">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                className="block w-full rounded-full border border-input bg-secondary/50 p-2.5 pl-10 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground transition-all duration-300"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hover:bg-accent hover:text-accent-foreground p-2 rounded-full transition-colors">
                 <Theme />
            </div>
            {session?.user?.id&&(
              <UserAvtar id={session.user.id}
              name={session.user.name}
            imageUrl={session.user?.image}
              />
            )}

            <MobileNavigation />
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;