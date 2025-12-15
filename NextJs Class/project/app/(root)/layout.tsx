import Navbar from '@/components/navigation/navbar'
import RightSideBar from '@/components/navigation/RightSideBar'
import React from 'react'


function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <div>
      <Navbar/>
      {children}
      <RightSideBar/>
    </div>
  )
}

export default RootLayout