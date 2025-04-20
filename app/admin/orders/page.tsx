import { GetAllOrders, } from '@/backend/database'
import React from 'react'
import { TableRow } from './tableRow';

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
})

export default async function page() {
    const {data} = await GetAllOrders();
    return (
    <>

        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total 
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status 
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                   {data && data.map((e,i)=><TableRow key={i} data={e}/>)}
                </tbody>
            </table>
        </div>
    </>
  )
}

