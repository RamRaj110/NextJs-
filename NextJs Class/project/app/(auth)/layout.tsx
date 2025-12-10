import SocialAuth from '@/components/forms/SocialAuth'
import React from 'react'
import Image from 'next/image'

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-12">
      {/* Main Card Container */}
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8 shadow-xl">
        
        {/* Header Section: Logo & Title */}
        <div className="flex flex-col items-center space-y-3 text-center">
          <Image
            className="rounded-full object-cover border border-border"
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
          />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Join <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">CodeLove</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to get started
            </p>
          </div>
        </div>

        {/* Main Form Content (Inputs passed as children) */}
        <div className="space-y-4">
          {children}
        </div>

        {/* Social Authentication Section */}
        <SocialAuth />
        
      </div>
    </div>
  )
}

export default AuthLayout