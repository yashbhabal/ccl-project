/* eslint-disable react-hooks/rules-of-hooks */
'use server'
import { GetEBooks, } from '@/backend/database'
import AddNewEBook from '@/components/AddNewEBook';

import { z } from 'zod';
import { Book } from '@/backend/datatypes';
import Image from 'next/image';
import { TableRowEbook } from './TableRowEbook';

type BookType = z.infer<typeof Book>
export default async function Page() {
    const {data} = await GetEBooks();
    return (
    <>
        <div className="relative overflow-x-auto rounded-lg">
        <AddNewEBook/>
            {data.length!=0 && <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Books name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                   {data.map((e,i)=><TableRowEbook  key={i} data={{name:e.name,id:e.id!}} />)}
                </tbody>
            </table>}
            {data.length == 0 && <div className='w-full h-full flex justify-center items-center mt-32'> <Image src={"/nobook.png"} height={300} width={300} alt="no book"/></div>}
        </div>
    </>
  )
}


