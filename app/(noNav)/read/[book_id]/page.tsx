import { AWSGet } from '@/backend/cloud'
import { GetAllEBookForUser } from '@/backend/database';
import Loading from '@/components/Loading';
import Reader from '@/components/Reader/Reader'
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import toast from 'react-hot-toast';

export default async function page({params}:{params:{book_id:string}}) {
  const bookID = parseInt(params.book_id);
  const isBougth = await GetAllEBookForUser(bookID);
  if(!isBougth)
    return redirect('/dashboard/ebooks');
  return (
  <>
    <Suspense fallback={<Loading/>}>
      <LoadApp bookID={bookID}/>
    </Suspense>
  </>
  )
}

async function LoadApp({bookID}:{bookID:number}){
  if(!bookID){
    return redirect('/books');
  }

  const {data,error,success} = await AWSGet(bookID)
  if(!success){
    toast.error(error);
    return redirect("/dashboard/ebooks")
  }
  if(!success){
    return redirect('/books');
  }
  return(<>
    <Reader url={data}/>
  </>)
}