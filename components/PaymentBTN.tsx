'use client'
import { StartRazorPayment } from '@/backend/commonCli';
import { Address } from '@/backend/datatypes';
import { AddOrderAction } from '@/backend/serverAction';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Script from 'next/script'
import React, { FormEvent, useEffect, useState } from 'react'
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
export default function PaymentBTN({book,add,total}:{book:{[book_id:string]:{qty:number,ebook:boolean}},add:number,total:number}) {
    const route = useRouter();
    let order_id = ""// singleton pattern for order_id api 
    const [prevState,FormAction] = useFormState(AddOrderAction,{error:"",success:false})
    const [payment,setPayment] = useState<boolean>(true)
    let cod:boolean = !Object.keys(book).some(e=>book[e].ebook);
    if(prevState.success && prevState.error == ""){
    }
    useEffect(()=>{
        if(prevState.success){
            localStorage.removeItem('cart')
            toast.success("Order placed")
            route.push("/books")
        }        
    },[prevState,route])
    function submitPlaceOrder(e:FormData){
        return ()=>{
            FormAction(e);
        }
    }
    // handle order and payment
    function handleChange(e:FormEvent<HTMLFormElement>){
        const target = e.currentTarget;
        const data = new FormData(target);
        setPayment(data.get("payment")=="NOCOD")
    }
    async function handleSubmit(e:FormEvent<HTMLFormElement>){
            e.preventDefault()
            if(add == -1) 
                return toast.error("Select address")
            const form = e.currentTarget;
            if(order_id==""){
                const res = await fetch("/api/razorpay", { method: "POST" ,body:JSON.stringify(book)});
                let {orderId}:{orderId:string} = await res.json();
                order_id = orderId
            }
            if (!order_id && cod) {
                throw new Error('Order ID not received from server');
            }
            const formData = new FormData(form);
            
            if(payment){
                await StartRazorPayment({
                    total: total, // Set the appropriate total amount
                    order_id,
                    handleSuccess: submitPlaceOrder(formData)
                });
            }else {
                submitPlaceOrder(formData)();
            }
    } 
    return (
        <>  
        
            
            <form className="w-full bg-white" onChange={handleChange}>
                {cod && <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input id="COD" type="radio" value="COD" name="payment" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="COD" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cash on delivery</label>
                </div>}
                <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input defaultChecked id="RAZORPAY" type="radio" value="NOCOD" name="payment" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="RAZORPAY" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Razorpay</label>
                </div>
            </form> 

            <form onSubmit={handleSubmit}>
                <input type='number' hidden value={add} name='address'/>
                <input type='text' hidden value={JSON.stringify(book)} name='books'/>
                <Script src="https://checkout.razorpay.com/v1/checkout.js" />
                <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                    Place Order
                </button>
            </form>
        </>
    )
}
