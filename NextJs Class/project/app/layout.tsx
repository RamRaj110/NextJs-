import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project",
  description: "A Next.js project using the App Router and Google Fonts.",
};

const RootLayout=async({ children }: { children: React.ReactNode }) =>{
  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
            <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <SessionProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
        {children}
        </ThemeProvider>
           <Toaster />
      </body>
      </SessionProvider>
    </html>
  );
}

export default RootLayout;