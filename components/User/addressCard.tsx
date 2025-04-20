'use client'
import { Address } from '@/backend/datatypes'
import { DeletAddressAction } from '@/backend/serverAction'
import React from 'react'
import { useFormState } from 'react-dom'
import { z } from 'zod'

type address = z.infer<typeof Address>
export default function AddressCard({address,isdelete}:{address:address,isdelete?:boolean}) {
  const [preState,formAction] = useFormState(DeletAddressAction,{error:'',success:false})
  return (
    <>
      <div className='flex flex-col'>
        <div className='border border-black  w-[280px] p-5 my-3 min-h-[186px] rounded-md text-wrap'>
            <p>Name {address?.name}</p>
            <p>Phone Number {address?.phone}</p>
            <p>state {address?.state} city {address?.city} pincode {address?.pincode}  </p>
            <p>address {address?.address}</p>
            <p>Landmark {address?.landmark}</p>
        </div>
        {isdelete && <form action={formAction}>
            <input value={address.id} type='hidden' name='address_id'/>
            <button className='text-red-500 cursor-pointer' type='submit'>Delete</button>
        </form>}
      </div>
    </>
  )
}
