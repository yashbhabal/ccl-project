'use client'
import { SetQuery } from "@/backend/commonCli";
import { DeleteBook } from "@/backend/database";
import { Book } from "@/backend/datatypes";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { z } from "zod";
type book = z.infer<typeof Book>;
type BookDetailsType= {
  name: string;
  author: string;
  price: number;
  qty: number;
  description: string;
  image: string;
  id?: number | undefined;
} & {
  id: number;
}
export function BookCard({BookDetails}:{BookDetails:BookDetailsType | any}){
  const data:book&{id:number} = BookDetails!; 
  const path = usePathname();
  const router = useRouter()
  const param = useSearchParams();
  async function handleDelete(){
    const req = await DeleteBook(data.id)
  }
  function handleEdit(){
      SetQuery([router,path,param],{"mode":"edit","id":`${BookDetails.id}`,'data':`${JSON.stringify(BookDetails)}`})
  }
  return (
    <>
      <span className="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={data.image ? data.image : ''}  alt="" height={300} width={200}/>
          <div className="flex flex-col justify-start h-full  p-5 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.name}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">-{data.author}</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">-{data.price}</p>   
              <div className='flex justify-start mt-auto w-52'>
                  <button onClick={handleEdit} type='button'className="text-white mx-3 bg-blue-700 hover:bg-blue-800 focus:ring-3 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                  <button  onClick={handleDelete} className="focus:outline-none mx-3 text-white bg-red-700 hover:bg-red-800 focus:ring-3 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:ring-red-900">Delete</button>
              </div>
          </div>
      </span>
    </>
  )
}