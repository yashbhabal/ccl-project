import { GetBooks } from '@/backend/commonCli'
import { getCartBookDB } from '@/backend/database'
import BookTable from '@/components/User/BookTable'
import Cart from '@/components/User/Cart'
import React, { useEffect } from 'react'

type Props = {}
type data = never[] | {
    sucess: boolean;
    error: never[];
    data: {
        id: number;
        name: string;
        author: string;
        image: string;
        price: number;
        qty: number;
        description: string;
    }[];
} | {
    error: string[];
    sucess: boolean;
    data: never[];
}

export const dynamic = 'force-dynamic'

export default async function Page({searchParams}: {
    searchParams:{
        cart:string
    }
}) {
    const cart = JSON.parse(searchParams?.cart ? searchParams.cart : "[]");
    const {data}= await getCartBookDB(cart as number[]);
    return (
        <>
           <Cart data={data}/>
        </>
    )
}   