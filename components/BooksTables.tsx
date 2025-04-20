'use client'
import { Book } from '@/backend/datatypes';
import React from 'react'
import { z } from 'zod';
import { BookCard } from './BookCard';
import BookInfinityLoad from './BookInfinityLoad';

export const dynamic = "force-dynamic";
export default  function BooksTables({data}:{data:{ image: string, name: string, author: string, price: number, qty: number, description: string, id?: number | undefined }[] | { error: string[], sucess: boolean } }){
  return (
    <>
      <div className='w-[100%] grid-cols-2 gap-3 gap-x-0 grid justify-center z-2'>
            {!("sucess" in data) &&  data.map((e,i:number)=><BookCard key={i}  BookDetails={e}/>)}
            <BookInfinityLoad load={8} admin={true} skip={8}/>
      </div>
    </>
  )
}

