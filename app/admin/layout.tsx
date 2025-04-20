import Image from "next/image"
import Link from "next/link"
import React from "react"
import "../globals.css";
import { Logout } from "@/backend/auth";
import LogoutBTN from "@/components/LogoutBTN";
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const navLinks = [
        {name:"Home",path:"/"},
        {name:"Manage books",path:"/admin/books"},
        {name:"Manage Ebooks",path:"/admin/ebooks"},
        {name:"User accounts",path:"/admin/user"},
        {name:"Orders",path:"/admin/orders"},
        {name:"Reports",path:"/admin/report"},
        // {name:"Email management",path:"/admin"},
    ]
    return (
        <>
        

        <nav className="bg-transparent border-gray-200 dark:bg-gray-900 dark:border-gray-700 mb-8 capitalize">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="text-blue-600 text-2xl font-bold">BookHive</span>
            </a>
            <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {navLinks.map((e,i)=><li key={i}>
                <Link  href={`${e.path}`} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">{e.name}</Link>
                </li>)}
                <LogoutBTN />
            </ul>
            </div>
        </div>
        </nav>
        <div className="h-full flex justify-center">
            <div className="h-fullw-52 min-w-[70%]">
                {children}
            </div>
        </div>
        </>
    )
  }