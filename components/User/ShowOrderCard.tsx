import { Address, Book } from '@/backend/datatypes'
import Image from 'next/image'
import React from 'react'
import { z } from 'zod'
type BookDeatils = z.infer<typeof Book>
type AddressDeatils = z.infer<typeof Address>
export default function ShowOrderCard({data,qty,address,status}:{data:BookDeatils,qty:number,address?:AddressDeatils,status:string}) {
  return (
    <>
        <a href="#" className="flex mb-3 w-full flex-col items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <Image alt={"book"} src={data.image}  width={300} height={400} className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" />
            <div className="flex flex-row  p-6 leading-normal w-fit h-full">
                <div className='flex flex-col text-wrap mx-5'>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.name}</h5>
                    <p className="text-end mb-3 font-normal text-gray-700 dark:text-gray-400">-{data.author}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Qty - {qty}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Price - {data.price}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Total - {qty*data.price}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Status - {status}</p>
                </div>
                <div className='flex flex-col text-wrap mx-5'>
                    <p>Name - {address?.name}</p>
                    <p>Phone - {address?.phone}</p>
                    <p>{address?.state} {address?.city} {address?.pincode}</p>
                    <p>{address?.landmark?.trim() !="" ? "LandMark -"+address?.address : ""}</p>
                </div>
            </div>
        </a>
    </>
)
}
