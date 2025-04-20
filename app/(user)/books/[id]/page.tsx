
import { GetBooks, ManageCart } from '@/backend/commonCli';
import { GetAllBooks, GetBookByIDDB } from '@/backend/database';
import { Book } from '@/backend/datatypes';
import { BookCard } from '@/components/BookCard';
import Loading from '@/components/Loading';
import BookTable from '@/components/User/BookTable';
import ChangeBookType from '@/components/User/ChangeBookType';
import ShowBook from '@/components/User/ShowBook';
import Image from 'next/image';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation'
import React, { Suspense, useRef } from 'react'


async function PageLoading({id}:{id:number}){
  const {data,Recommendation} = await GetBookByIDDB(id); 
  console.log('234',id,data)
  if(!data) permanentRedirect('/books')
  return(
  <>
    <div className='py-5 flex justify-center flex-col'>
      <Link href={'/books'} className="align-top pl-[12%]">
        <span className="mt-3 inline-flex items-center font-medium text-blue-600 dark:text-blue-500 ">
            <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
            </svg>
            go back
        </span>
      </Link>
      <div className="container mx-auto py-10 px-16 flex flex-col md:flex-row">
        <div className="flex-shrink-0">
          <div className="w-80 h-fit rounded-md overflow-hidden shadow-lg">
            <div className="w-full h-full flex items-center justify-center">
              <Image width={400} height={600} alt={data.name} src={data.image}/>
            </div>
          </div>
        </div>
        <div className="ml-0 md:ml-8 mt-4 md:mt-0 flex-grow">
          <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
          <p className="text-lg mb-4">
            <strong>Author:</strong> {data.author}
          </p>
          <ChangeBookType data={data} buyBTN={true}/>
          <p className="text-md mb-6">
            <strong>Description:</strong> 
            <br />
            {data.description}
          </p>
          
        </div>
      </div>
      {Recommendation.length != 0 && <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h4 className="text-2xl font-bold dark:text-white mb-5">Recommended books</h4>
          <BookTable>
            {Recommendation.map((e,i)=><ShowBook cart={false} key={i} recommendations={false} data={e}/>)}
          </BookTable>
      </div>}
    </div>
  </>)
} 

export default async function Page({params}:{params:{id:string}}) {
  const id = parseInt(params.id)
  console.clear();
  console.log(id)
  if(isNaN(id)) permanentRedirect('/books');
  return (
    <>
      <Suspense fallback={<Loading/>}>
          <PageLoading id={id}/>
      </Suspense>
    </>
  )
}
