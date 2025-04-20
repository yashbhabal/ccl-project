import { IsLogin } from '@/backend/auth'
import { GetAddress } from '@/backend/database'
import { verifySession } from '@/backend/session'
import AddAddress from '@/components/AddAddress'
import Loading from '@/components/Loading'
import AddressCard from '@/components/User/addressCard'
import { verify } from 'crypto'
import { EDGE_RUNTIME_WEBPACK } from 'next/dist/shared/lib/constants'
import Image from 'next/image'
import { permanentRedirect } from 'next/navigation'
import React, { Suspense } from 'react'

async function AddressCard_Loading(){
  await IsLogin('/auth')
  const {data}= await GetAddress()
  return(
    <>
      {data.length == 0 &&<div className='w-full h-full flex justify-center items-center'>
        <figure>
         <Image height={300} width={300} src={"/noAddress.png"} alt='no address'/>
          <figcaption className='text-center'>
            No address
          </figcaption>
        </figure>
         
      </div>}
      
      {data.length != 0 && <div className='grid grid-cols-3 gap-4 p-10 '>
            {data && data.map((e,i)=><AddressCard isdelete={true} key={i} address={e}/>)}
      </div>}
    </>
  ) 
}

export default async function page() {
  return (
    <>  
    <div className='flex justify-start items-center flex-col w-full h-full'>
        <AddAddress/>	
        <Suspense fallback={<Loading/>}>
            <AddressCard_Loading/>
        </Suspense>
    </div>
    </>
  )
}
