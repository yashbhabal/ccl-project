'use server'
import { GetAllBooks } from '@/backend/database';
import BookInfinityLoad from '@/components/BookInfinityLoad';
import SerachBar from '@/components/SerachBar';
import BookTable from '@/components/User/BookTable';
import ShowBook from '@/components/User/ShowBook';
import Image from 'next/image';


export default async function Page({searchParams}:{searchParams:{search:string}}) {

  const {sucess,data,recommendations} = await GetAllBooks(searchParams?.search );
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
          <SerachBar/>
          
          {data.length != 0 && <BookTable>
            {data.map(((e,i)=><ShowBook cart={false} recommendations={recommendations.includes(e.id!)} data={e} key={i}/>))} 
           <BookInfinityLoad load={8} admin={false} skip={8} />
          </BookTable>}

          {data.length == 0 &&<div className='w-full h-full flex justify-center items-center mt-32'> <Image src={"/nobook.png"} height={300} width={300} alt="no book"/></div>}
      </div>
    </>
  )
}