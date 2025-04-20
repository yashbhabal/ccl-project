'use server'
import { PrismaClient, Order, OrderBooks, Book } from '@prisma/client';
import { GetOrders } from '@/backend/database'
import ShowOrderCard from '@/components/User/ShowOrderCard'
import Image from 'next/image'
import React, { Suspense } from 'react'
import CalculateTotalOrderPlace from '@/components/User/CalculateTotalOrderPlace';
import Loading from '@/components/Loading';
import { IsLogin } from '@/backend/auth';


async function CalculateTotalOrderPlace_Loading({page}:{page:number}){
    await IsLogin('/auth')
    const {data,success,error} = await GetOrders(page)
    return<>
        <div className='w-full h-full'>
           {data.length == 0 &&  <div className='flex min-h-[calc(100vh-10rem)] justify-center items-center'>
                <Image src={'/noorder.png'} width={300} height={100} alt='No order'/> 
            </div>}
            {success &&  <div className='grid grid-rows-1 gap-5 w-full h-full'>
                {data?.map((LargeOrders,i)=>{
                    return<>
                        <div key={`1${i}`} className='border border-gray-300 rounded-md p-3 grid grid-cols-3 gap-x-3'>
                            <div key={`2${i}`} className='flex w-full justify-center flex-col col-span-2'>
                                {data.length!=0 && LargeOrders.orderBooks.map((SmallOrders,i2)=>{
                                    return <>
                                        <ShowOrderCard key={`2${i2}`} address={LargeOrders.address} status={SmallOrders.status} data={SmallOrders?.book} qty={SmallOrders.qty} />    
                                    </>
                                })}
                            </div>
                            <div className='max-w-[100%] h-fit'>
                                <CalculateTotalOrderPlace total={LargeOrders.total} />
                            </div>
                        </div>
                    </>
                })}
            </div>}
        </div>
    </>
}

export default async function page({searchParams}:{
    searchParams?:{
        page:string
    }
  }) {
    let count = 1;
    if(searchParams?.page)
        count = isNaN(parseInt(searchParams.page)) ? 1 : parseInt(searchParams.page);
  return (
    <> 
        <div className='px-32 py-10 overflow-hidden'>
        <h4 className='text-3xl mb-5 '>Orders History</h4>
           <Suspense fallback={<Loading/>}>
                <CalculateTotalOrderPlace_Loading page={count}/>
           </Suspense>
        </div>
    </>
  )
}
    