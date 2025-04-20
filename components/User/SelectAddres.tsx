'use client'
import { Address } from '@/backend/datatypes'
import React, { FormEvent, ReactEventHandler, useEffect, useState } from 'react'
import { z } from 'zod'
import AddressCard from './addressCard'
import Link from 'next/link'
import PaymentBTN from '../PaymentBTN'
type Address = z.infer<typeof Address>
export default function SelectAddres({address,book,total}:{
    address:Address[],book:{[book_id:string]:{qty:number,ebook:boolean}},total:number
}) {
    const [add,setAdd] = useState<number>((address.length != 0) ? address[0].id! : -1);
    const [show,setShow] = useState<boolean>(false)
    function setAddress(e:React.ChangeEvent<HTMLInputElement>){
        setAdd(parseInt(e.currentTarget.value))
        setShow(false)
    }
  return (
    <>
            <div  className='my-2 w-full  flex flex-col items-center  rounded-md py-4'>
                <div className='px-2'>
                    {add !== -1 && <AddressCard address={address.find(e=>e.id == add)!}/>}
                </div>
                {show && <div >
                    <div onClick={()=>setShow(e=>!e)} className={` overflow-hidden   backdrop-blur-3xl  w-full h-full fixed top-0 left-[0%] ${!show && 'hidden' }`} />
                            <div className='bg-white w-[400px] items-center scrollbar-hide absolute top-32 left-[35%]  px-10 py-5  h-[50%] overflow-y-scroll'>
                                {address.length > 0 && address.map((e,i)=><div className='flex my-5 justify-center items-center' key={e.id}>
                                    <input type="radio" className='mr-3 sr-only' id={`${i}`} value={e.id} name='address' onChange={setAddress}/>
                                    <label htmlFor={`${i}`} >
                                        <AddressCard address={e} />
                                    </label>
                            </div>)}
                            {address.length==0 && <Link  href={'/dashboard/address'}><p className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                                Add new Addres</p></Link>
                            }
                    </div>
                </div>}
                <button onClick={()=>setShow(e=>!e)}  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-0  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' >
                    Select Address
                </button>
            </div>
            <PaymentBTN book={book} total={total} add={add}/>
    </>
  )
}
