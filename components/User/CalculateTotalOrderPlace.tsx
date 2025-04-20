'use client'
import { GetBookDic } from '@/backend/commonCli'
import { Book } from '@/backend/datatypes'
import { getRedirectTypeFromError } from 'next/dist/client/components/redirect'
import { toASCII } from 'punycode'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DefaultDeserializer } from 'v8'
import { z } from 'zod'
type Data = {
        id: number;
        name: string;
        author: string;
        image: string;
        price: number;
        qty: number;
        description: string;
    }[] | never[];

export default function CalculateTotalOrderPlace({total}:{total:number}) {
    let tax = .18 * total;
    return (
    <>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
            <tbody className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
              <tr>
                  <th scope="row" className="px-6 py-4  font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                      Total books
                  </th>
                  <td className="px-6 py-4">
                      {total}
                  </td>
              </tr>
              <tr>
                  <td scope="row" className="px-6 py-4 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                      Tax
                  </td>
                  <td className="px-6 py-4">
                      {tax}
                  </td>
              </tr>
              <tr>
                  <td scope="row" className="px-6 py-4 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                        Total
                  </td>
                  <td className="px-6 py-4">
                      {total+tax}
                  </td>
              </tr>
            </tbody>
        </table>
    </>
  )
}
