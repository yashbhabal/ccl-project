'use client'
import { ChangeEbookType } from '@/backend/commonCli'
import { Book } from '@/backend/datatypes'
import Link from 'next/link'
import React, { Dispatch, useEffect, useState } from 'react'
import { z } from 'zod'
type BookType = z.infer<typeof Book>
export default function ChangeBookType({data,buyBTN}:{data:BookType,buyBTN:boolean}) {
    const [type,SetType] = useState<"P"|"E">(data.qty==0 ? "E" :"P");
    useEffect(()=>{
        if(data.qty < 0){
          ChangeEbookType(data.id!,type=="E")
          return
        }
        ChangeEbookType(data.id!,type=="E")
      },[type,data])
  return (
    <>
        {(data.ebook || data.qty > 0) &&<div className={`flex items-${buyBTN ? "start my-2 " : "center"} flex-col `}>
          <div className="flex items-center">
            <button type="button" onClick={()=>data.qty > 0 && SetType("P")} disabled={type == "P"} className={`w-full ${type =='P' ? 'bg-blue-600 text-white' : "bg-white"} ${data.qty == 0 && "disabled cursor-not-allowed text-red-600 line-through"} m-0 border text-base font-medium rounded-l-md   px-2 py-1`}>
               Physical
            </button>
            <button type="button" onClick={()=>data.ebook && SetType("E")} disabled={type == "E"} className={`w-full  ${type =='E' ? 'bg-blue-600 text-white ' : "bg-white"} ${!data.ebook && "disabled cursor-not-allowed text-red-600 line-through"} m-0  border text-base font-medium rounded-r-md    px-2 py-1`}>
              Ebook
            </button>
          </div>
      </div>}
      {buyBTN && data.qty == 0 && !data.ebook && <p className='text-red-600 self-center  select-none cursor-default'> Out of stock </p>}
          {buyBTN && (data.qty != 0 || data.ebook) && <Link  href={data.qty!=0 ? `/placeorder?book=${encodeURIComponent(JSON.stringify({[data.id!]:{qty:1,ebook:type=='E'}}))}` : "#"}  >
              <button  className={` bg-blue-600 text-white py-2 px-4  rounded-md mb-5`}>
                  Buy Now
              </button>
      </Link>}
    </>
  )
}
