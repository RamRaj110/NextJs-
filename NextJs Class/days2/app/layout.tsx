import type { Metadata } from "next";

import "./globals.css";
import Nav from "./(root)/components/Nav";




export const metadata: Metadata = {
  title: "Days 2 Layout Example",
  description: "A simple layout example for Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
    
        {children}
      </body>
    </html>
  );
}
