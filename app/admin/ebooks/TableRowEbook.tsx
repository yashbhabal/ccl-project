'use client'
import { AWSDelete } from "@/backend/cloud";
import { Book } from "@/backend/datatypes";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
type BookType = z.infer<typeof Book>
export function TableRowEbook({data}:{data:{name:String,id:number}
}){
    const [load,setLoad] = useState<boolean>(false);
    async function handleDelete(){
        try{
            setLoad(true);
            const res = await AWSDelete(data.id)
            if(!res.success){
                throw new Error(res.error)
            }
            toast.success("Ebook Delete from cloud")
        }catch(e){
            toast.error((e instanceof Error) ? e.message : "Error occured Deleting Ebook")
        }finally{
            setLoad(false);
        }
    }

    return(<>
        <tr  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-12 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.name}
            </th>
            
            <td className="px-4 py-4 flex justify-center">
                <button type="button" onClick={handleDelete} disabled={load} className="focus:outline-none text-white bg-red-700 hover:bg-red-800  focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    {!load ? "Delete" : "Deleting...."} 
                </button>
            </td>
        </tr>
        
    </>)
}