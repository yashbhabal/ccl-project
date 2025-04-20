'use client'
import { GetBookDic, GetBooks, ManageCart } from '@/backend/commonCli'
import { Book } from '@/backend/datatypes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import Loading from '../Loading'
import Link from 'next/link'
import ChangeBookType from './ChangeBookType'
type data = z.infer<typeof Book>
export default function ShowBook({data , cart ,recommendations}:{data:data,cart:boolean,recommendations:boolean}) {
  const [qty,setQty] = useState<number>(0)
  useEffect(() => {
    setQty(GetBookDic()[data.id!] ? GetBookDic()[data.id!]['qty']:1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function onAddCard(){
    ManageCart(data.id as number,true);
    setQty(e=>e+1);
  }
  function onSubCard(){
    if(qty <= 0) return;
    ManageCart(data.id as number,false);
    setQty(e=>e-1);
  }
  return (
    <>
    <div className={`bg-white shadow rounded w-fit  ${qty <= 0 && 'hidden'}`}>
      <div className='relative w-fit'>
      <Image
          src={data.image}
          alt="Book Cover"
          className="w-full object-cover"
          width={192}
          height={100}
          >
        </Image>
        {recommendations && <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
          Recommended
        </span>}
      </div>
      <div className={`p-4 `}>
          <h3 className="text-lg font-bold ps-2">{data.name.slice(0,20).concat(data.name.length > 20 ? "..." : "")}</h3>
          <p className="text-gray-600 text-end">-{data.author}</p>
          <p className="mt-2 text-blue-600 ps-2">&#8377;{data.price}</p>
          {!cart && <div className='flex justify-center'>
            {data.qty == 0  && !data.ebook && <p className='text-red-600 self-center mx-3 select-none cursor-default'> Out of stock </p>}
           {(data.qty != 0 || data.ebook) && <button type="button" onClick={onAddCard}  className="text-white ms-2 my-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add To cart
          </button> }
          <Link href={`/books/${data.id}`} className="text-white ms-2 my-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            View 
          </Link>
          </div>}
         {cart &&<div >
         <div className='inline-block'>
            <button onClick={onAddCard} className='text-white ms-2 my-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
              +
            </button>
            {qty}
            <button onClick={onSubCard}  className='text-white ms-2 my-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' 
            >-</button>
          </div>
          <div className='inline-block'>
            <ChangeBookType data={data} buyBTN={false}/>
          </div>
          
          </div> }
      </div>
    </div>
    </>
  )
}
