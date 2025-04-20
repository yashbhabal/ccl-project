'use client'
import { CompleteOrder } from '@/backend/serverAction'
import { useState } from 'react';
import { useFormState } from 'react-dom'
type data =({
    book: {
        id: number;
        name: string;
        author: string;
        image: string;
        price: number;
        qty: number;
        description: string;
    };   
} & {
    id: number;
    book_id: number;
    order_id: number;
    cost: number;
    qty: number;
    status:string;
})
export function TableRow({data}:{data:data}){
    const [preState,fromData] = useFormState(CompleteOrder,{success:false,error:"",data:{} as data})
    function handleChange(e:React.ChangeEvent<HTMLFormElement>){
        const data = new FormData(e.currentTarget);
        fromData(data);
    }
    
    return (
        <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data.book.name}
        </th>
        <td className="px-6 py-4">
            {data.qty}
        </td>
        <td className="px-6 py-4">
            {data.qty*data.cost}
        </td>
        <td className="px-6 py-4">
            {preState.success ? preState.data?.status : data.status}
        </td>
        <td className="px-0 py-4 ">
            <form action={fromData} onChange={handleChange}>
                <input type="text" name='id' value={data.id}  hidden />
                <select name="value" defaultValue={data.status}>
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                </select>
                {/* <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                    Complete
                </button> */}
            </form>
        </td>
    </tr>
    )
}