'use client'
import React from 'react'
import ShowBook from '@/components/User/ShowBook'
import { error } from 'console';

type data = {
    name: string;
    author: string;
    price: number;
    qty: number;
    description: string;
    image: string;
    id?: number | undefined;
}[] | {
    error: string[];
    sucess: boolean;
}
// export const dynamic = "force-dynamic";
export default function BookTable({children}:{children?:React.ReactNode}) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {children}
    </div>
    
  )
}
