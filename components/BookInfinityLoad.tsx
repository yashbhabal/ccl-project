/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { GetRangeBookServerAPI } from '@/backend/serverAction';
import React, { useEffect, useState } from 'react'
import {  z } from 'zod';
import {Book} from "@/backend/datatypes"
import { BookCard } from './BookCard';
import ShowBook from './User/ShowBook';
type BookType = z.infer<typeof Book>
export default function BookInfinityLoad({skip,load,admin}:{skip:number,load:number,admin:boolean}) {
    // load - load is number of book you want to load each time
    // skip is number of book 
  const [books,setBooks] = useState<BookType[]>([]);
  const [count,setCount] = useState(skip);
  const [hide,setHide] = useState(false)
  useEffect(()=>{
    FetchMoreBooks().then(async e=>{
      if(e.length == 0)
        setHide(true)
    })
  },[])
  async function FetchMoreBooks(){
    const req = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ range:{start:count,end:count+load} }),
    })
    return (await req.json())['data'];
  }
  function handleClick(){
    FetchMoreBooks()
    .then(async (data) => {
      if(data.length>0){
        setBooks(e=>[...e,...data])
        setCount(e=>e+load)
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });  
  }
  return (
    <>
    {!admin && books.map((e,i)=><ShowBook key={i} cart={false} data={e} recommendations={false} />)}
    {admin && books.map((e,i)=><BookCard key={i}  BookDetails={e} />)}
    <div className={`col-span-full flex justify-center ${hide && "hidden"}`}>
        <button onClick={handleClick} className=" rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white">
        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
        <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">Load more</span>
        </button>
    </div>
    </>
  )
}
