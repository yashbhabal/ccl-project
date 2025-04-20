'use client'
import { AddAdressAction } from '@/backend/serverAction'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

export default function AddAddress() {
    const [show , setShow] = useState(false)
    const [preState,formAction] = useFormState(AddAdressAction,{error:"",success:false});
    const ref = useRef<HTMLFormElement>(null);
    function onClose(){
        ref.current?.reset();
        setShow(e=>!e)
    }
    useEffect(()=>{
        if(preState.success){
            onClose();
        }
    },[preState])
    function handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        const target = e.currentTarget;
        const data = new FormData(target)
        const phone = data.get("phone")
        const pin = data.get('pincode')
        if(!/^\d{10}$/.test(phone as string)){
            return toast.error("Enter valid phone number")
        }
        if(!/^\d{6}$/.test(pin as string)){
            return toast.error("Enter valid pincode")
        }
        formAction(data);
    }
  return (
    <>
    <div className='mt-8 relative '>
    <button onClick={onClose} className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"}>
        Add Address
    </button>
    <div className='overflow-hidden w-full z-10 flex justify-center h-full'>
    <div onClick={onClose}  className={`overflow-hidden backdrop-blur-3xl w-full h-full fixed top-0 left-[0%] ${!show && 'hidden' }`} />
        <div className={`min-w-96 z-10 p-5 ${!show && 'hidden' }`}>
        <form onSubmit={handleSubmit} ref={ref} className="max-w-lg mx-auto  rounded-sm p-7 ring-2 ring-gray-300">
            <div className="relative z-0 w-full mb-5 group">
                <input type="name" name="name" id="name"   className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" " required />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Name
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="number" pattern='^\d{10}$' minLength={10} maxLength={10} name="phone" id="phone"   className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" " required />
                <label htmlFor="phone"  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Phone
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="state" id="state"   className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" " required />
                <label htmlFor="state" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    State
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="city" id="city"   className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" " required />
                <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    City
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="number" pattern='^\d{6}$'  minLength={6} maxLength={6}  name="pincode" id="pincode"   className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" " required />
                <label htmlFor="pincode"  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Pincode
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="address" id="address"   className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" " required />
                <label htmlFor="address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Address
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="landmark" id="landmark"   className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-600 peer" placeholder=" " required />
                <label htmlFor="landmark" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Landmark
                </label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
        </div>
    </div>
    </div>
    </>
  )
}