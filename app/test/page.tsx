/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import AddNewBook from '@/components/AddNewBook'
import Reader from '@/components/Reader/Reader'
import React, { useState } from 'react'

export default function page() {
  const [type,SetType] = useState<"P"|"E">("E");
  return (
    <>
        
    <div>
      <div className="flex items-center flex-col">
          <div className="flex items-center mt-5">
            <button type="button" onClick={()=>SetType("P")} disabled={type == "P"} className={`w-full ${type =='P' && 'bg-blue-600 text-white'}  m-0 border text-base font-medium rounded-l-md   px-4 py-2`}>
               Physical
            </button>
            <button type="button" onClick={()=>SetType("E")} disabled={type == "E"} className={`w-full  ${type =='E' && 'bg-blue-600 text-white'}  m-0  border text-base font-medium rounded-r-md    px-4 py-2`}>
              Ebook
            </button> 
          </div>
      </div>
    </div>


    </>
  )
}
