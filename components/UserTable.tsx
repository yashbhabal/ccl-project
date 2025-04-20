'use client'
import { MakeAdmin } from '@/backend/auth';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
type data ={
        id: number;
        password: string;
        email: string;
        admin: boolean;
    }[] | null; 
export default function UserTable({data}:{data:data}) {
  return (
    

<div className="relative overflow-x-auto">
    <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Username
                </th>
                <th scope="col" className="px-6 py-3">
                    Admin   
                </th>
                <th scope="col text-center" className="px-6 py-3">
                    Option
                </th>
            </tr>
        </thead>
        <tbody>
           {data && data.map((e,i)=><TableRow key={i} data={e} />)}

        </tbody>
    </table>
</div>

  )
}

function TableRow({data}:{data: {
    id: number;
    password: string;
    email: string;
    admin: boolean;}})
    {
    const [preState,formAction] = useFormState(MakeAdmin,{error:"",success:false});
    const [admin,setAdmin] = useState(data.admin)
    useEffect(()=>{
        if(preState.success)
                setAdmin(e=>!e)
    },[preState])
    return(
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.email}
            </th>
            <td className="px-6 py-4">
                Username
            </td>
            <td className="px-6 py-4">
                {admin ? "Yes" : "No"}
            </td> 
            <td className="px-2 py-2">
                <form action={formAction}>
                    <input type="hidden" value={data.id} name='id'/>
                    <input type="hidden" value={admin ? "true" : 'false'} name='admin'/>
                <button className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Make Admin</button>
                </form>
            </td>
        </tr>
    )
}