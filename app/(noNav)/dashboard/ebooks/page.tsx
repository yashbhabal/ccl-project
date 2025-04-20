import { GetAllBooks, GetAllEBookForUser, GetBookByIDsDB } from '@/backend/database'
import { Book } from '@/backend/datatypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { z } from 'zod'
type BookTypes = z.infer<typeof Book>
export default async function page() {
    const UserEbooksPurchases = await GetAllEBookForUser();
    const req = await GetBookByIDsDB(Object.keys(UserEbooksPurchases).map(e=>parseInt(e)));
  return (
    <>  
        <div className='py-10 px-16'>
        <h4 className='text-3xl mb-5'>Library</h4>
        <div className='flex flex-wrap w-full gap-2 justify-start'>
            {req.data.map((e,i)=><Link href={`/read/${e.id}`} key={i} className='flex-basis-1/4 p-4'><EbookCard data={e} /></Link>)}
        </div>
        </div>
    </>
  )
}

function EbookCard({data}:{data:BookTypes}){
    return( 
    <>
        <div className='h-[300px] bg-black w-[200px] '>
            <Image height={400} width={100} src={data.image} alt={data.name} className="w-full h-full rounded-lg hover:opacity-80 hover:cursor-pointer"/>
        </div>
    </>)
}