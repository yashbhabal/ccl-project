'use server'
import { verifySession } from '@/backend/session'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoutBTN from './LogoutBTN'

export default async function Navbar({links}:{
    links:{[key:string]:string}
}) {
    const {user,session,admin} = await verifySession();
  return (
    <nav className="border-gray-200  dark:bg-gray-800 dark:border-gray-700 sticky">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="text-white text-2xl font-bold">BookHive</span>

            </a>
        <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
            <ul className="flex flex-col items-center font-medium mt-4 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
               {Object.keys(links).length != 0 && Object.keys(links).map((e,i)=>{
                   return <li key={i}>
                     <Link href={links[e]} className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">
                        {e}
                    </Link>
                    </li>
                })}
                {session && <li>
                    <Link href={'/dashboard'} className="relative  md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">
                        
                        <button type="button" className="relative inline-flex items-center text-sm font-medium text-center text-blue ">
                            Dashboard
                        </button>

                    </Link>
                </li>}
                {admin && <li>
                    <Link href={'/admin'} className="relative  md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">
                        
                        <button type="button" className="relative inline-flex items-center text-sm font-medium text-center text-blue ">
                            Admin Dashboard
                        </button>

                    </Link>
                </li>}
                {!session && <li>
                    <Link href={"auth"} className="relative  md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">
                        
                        <span  className="relative inline-flex items-center text-sm font-medium text-center text-blue ">
                            Login/Register
                        </span>

                    </Link>
                </li>}
                <li>
                    <Link href={'/cart'} className="relative  md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">
                        
                        <button type="button" className="relative inline-flex items-center text-sm font-medium text-center text-white ">
                            <Image src={'/cart.png'} width={30} height={30} alt='cart'/>
                        </button>

                    </Link>
                </li>
                {session && <li>
                    <LogoutBTN /> 
                </li>}
            </ul>
            </div>
        </div>
    </nav>
  )
}
