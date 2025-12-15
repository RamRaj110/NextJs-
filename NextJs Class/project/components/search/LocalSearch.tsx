'use client'
import React from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'

function LocalSearch() {
  return (
    <div>
         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
              <Input
                type="text"
                className="block w-full rounded-full border border-input bg-secondary/50 p-2.5 pl-10 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground transition-all duration-300"
                placeholder="Search..."
              />
            </div>
       
    </div>
  )
}

export default LocalSearch