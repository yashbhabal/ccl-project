'use client'
import { GetBookDic } from '@/backend/commonCli'
import { Book } from '@/backend/datatypes'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
type BookType = z.infer<typeof Book>
type Data = {
    sucess: boolean;
    data: BookType[];
    error: string[];
}
export default function ShowOrderPlaceTable({data,bookQty}:{data:Data,bookQty:{[book_id:string]:{qty:number,ebook:boolean}}}) {
  return (
    <>
        <div className='mx-5  min-w-[300px] w-[30%] '>
              <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" className="font-extrabold px-6 py-3 text-gray-900">
                                  Book Name
                              </th>
                              <th scope="col" className="font-extrabold px-6 py-3 text-gray-900">
                                  Price
                              </th>
                              <th scope="col" className="font-extrabold px-6 py-3 text-gray-900">
                                  Qty
                              </th>
                              <th scope="col" className="font-extrabold px-6 py-3 text-gray-900">
                                  Total
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          {data.data && data.data.map(e=><TableRow key={e.id} isEbook={bookQty[e.id!]['ebook']} data={e} Qty={bookQty[e.id!]['qty'] }/>)}
                      </tbody>
                  </table>
              </div>

          </div>
    </>
  )
}

function TableRow({data,Qty,isEbook}:{data:BookType,Qty:number,isEbook:boolean}){

    return(
        <>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4  text-wrap">
                {isEbook && "(Ebook) "}{data.name} 
                </th>
                <td className="px-6 py-4">
                    {data.price}
                </td>
                <td className="px-6 py-4">
                    {Qty ? Qty : 1}
                </td>
                <td className="px-6 py-4">
                    {data.price * Qty}
                </td>
            </tr>
        </>
    )
}