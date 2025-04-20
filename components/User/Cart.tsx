'use client'
import { GetBookDic, GetBooks, SetQuery } from '@/backend/commonCli'
import { useParams, usePathname , useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import BookTable from './BookTable';
import ShowBook from './ShowBook';
import Link from 'next/link';
import Loading from "@/components/Loading"
import Image from 'next/image';

type data =   {
    image: string;
    name: string;
    author: string;
    price: number;
    qty: number;
    description: string;
    genres: string;
    id?: number | undefined,
    ebook:boolean
}[];

export default function Cart({data}:{data:data}) {
    const path = usePathname();
    const router = useRouter()
    const param = useParams()
    useEffect(()=>{
        const qdata = JSON.stringify(GetBooks());
        SetQuery([router,path,param],{"cart":qdata})
    },[])
    function onOrder(){
        const books = GetBookDic()
        const queryString = encodeURIComponent(JSON.stringify(books));
        const path =`/placeorder?book=${queryString}`
        return router.push(path)
    }
    return (
        <>
          <div className="w-full max-w-6xl mx-auto px-6 pt-16 pb-10">
            <h4 className="text-4xl font-extrabold text-gray-800 dark:text-gray-300 mb-10 border-b border-gray-300 pb-4">
              Shopping Cart
            </h4>
      
            <BookTable>
              {data.map((e, i) => (
                <ShowBook key={i} data={e} recommendations={false} cart={true} />
              ))}
            </BookTable>
      
            {data.length === 0 && (
              <div className="flex justify-center items-center mt-12">
                <Image src="/emptycart.png" width={400} height={400} alt="emptycart" />
              </div>
            )}
      
            {data.length > 0 && (
              <div className="w-full flex justify-end mt-8">
                <button
                  onClick={onOrder}
                  className="inline-flex items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-semibold rounded-xl text-base px-6 py-3 transition-all duration-200 shadow-md dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Place Order
                </button>
              </div>
            )}
          </div>
        </>
      );
      
}
