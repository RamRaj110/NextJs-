"use client";
import { use, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          MyLogo
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li className="hover:text-blue-400 transition">
             <Link href="/">Home</Link>
            </li>
           <li className="hover:text-blue-400 transition">
            <Link href="/about">About Us</Link>
            </li>
          <li className="hover:text-blue-400 transition">
            <Link href="/service">Services</Link>
            </li>
          <li className="hover:text-blue-400 transition">
            <Link href="/contact">Contact</Link>
            </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <span className="text-3xl">&times;</span>
          ) : (
            <span className="text-3xl">&#9776;</span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800 overflow-hidden transition-all duration-300 ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 space-y-4 text-lg">
          <li className="hover:text-blue-400 transition">Home</li>
          <li className="hover:text-blue-400 transition">About</li>
          <li className="hover:text-blue-400 transition">Services</li>
          <li className="hover:text-blue-400 transition">Contact</li>
        </ul>
      </div>
    </nav>
  );
}
