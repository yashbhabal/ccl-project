'use client'
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="min-h-screen flex justify-center flex-col items-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col lg:flex-row w-[90%] max-w-screen-xl items-center justify-between py-12">

          {/* Left Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start space-y-6">
            <a href="#" className="flex items-center space-x-3">
              <span className="text-indigo-600 text-5xl font-extrabold drop-shadow-md">BookHive</span>
            </a>
            <h1 className="text-4xl font-semibold text-slate-800 dark:text-slate-100 leading-tight">
              Your next chapter starts here
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              From textbooks to timeless tales, browse our curated collection made for students, dreamers, and book lovers alike.
            </p>

            {/* Search Bar */}
            <div className="w-full">
              <div className="relative">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search books, authors, or genres..."
                  className="block w-full p-4 ps-10 text-sm text-slate-900 rounded-lg border border-slate-300 bg-slate-100 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
                  </svg>
                </div>
                <button
                  onClick={() => router.push(`/books?search=${search}`)}
                  type="submit"
                  className="absolute end-2.5 bottom-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm px-4 py-2 transition"
                >
                  {search.length === 0 ? "Explore" : "Search"}
                </button>
              </div>
            </div>

            {/* Explore Button */}
            <div className="mt-4">
              <Link
                href="/books"
                className="inline-flex items-center px-6 py-3 bg-slate-100 text-indigo-600 font-semibold rounded-lg shadow-sm hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                Browse Library
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side (Image) */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center" style={{ marginLeft: '10px' }}>
            <Image src="/hero_books.png" alt="Stack of books illustration" width={450} height={450} />
          </div>
        </div>
      </div>
    </>
  );
}
