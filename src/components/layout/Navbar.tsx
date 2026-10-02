"use client";

import Link from 'next/link';
import { Ambulance, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-gray-200/20 bg-white/80 backdrop-blur-md dark:bg-black/50 dark:border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-red-500 p-2 rounded-xl text-white shadow-lg shadow-red-500/30">
              <Ambulance size={28} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              SwiftRescue
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 font-semibold transition-colors">Home</Link>
            <Link href="#features" className="text-sm text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 font-semibold transition-colors">Features</Link>
            <Link href="#roles" className="text-sm text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 font-semibold transition-colors">How it Works</Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 font-semibold transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-sm text-gray-900 dark:text-white font-semibold hover:text-red-500 transition-colors px-4 py-2">
              Log in
            </Link>
            <Link href="/register" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5">
              Sign up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 shadow-xl absolute w-full left-0 top-20">
          <div className="px-4 py-6 space-y-2">
            <Link onClick={() => setIsOpen(false)} href="/" className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">Home</Link>
            <Link onClick={() => setIsOpen(false)} href="#features" className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">Features</Link>
            <Link onClick={() => setIsOpen(false)} href="#roles" className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">How it Works</Link>
            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-zinc-800 flex flex-col gap-3">
              <Link onClick={() => setIsOpen(false)} href="/login" className="block w-full px-4 py-3 text-center rounded-xl text-base font-medium bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white">Log in</Link>
              <Link onClick={() => setIsOpen(false)} href="/register" className="block w-full px-4 py-3 text-center rounded-xl text-base font-medium bg-red-500 text-white shadow-md shadow-red-500/20">Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
