'use client'
import { getQueryParam } from '@/backend/commonCli';
import { GetBookTitleSimilar } from '@/backend/database';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, {useEffect, useRef, useState } from 'react'


export default function SerachBar({}) {
    const path = usePathname();
    const router = useRouter()
    const param = useSearchParams();
    const [suggsetion,setSuggsetion] = useState<string[]>([]);
    const [query,setQuery] = useState<string>("")
    let id:any;
    let sug_id:any;
    const  ref = useRef<HTMLInputElement>(null)
    function onChange(searchQuery:string){
        const params = new URLSearchParams(param);
        if (searchQuery) {
            params.set('search', searchQuery);
        } else {
            params.delete('search');
        }    
        router.replace(`${path}?${params.toString()}`);
    }
    useEffect(()=>{
        let searchParam = getQueryParam('search');
        if(searchParam)
            setQuery(searchParam);
        ref.current!.value = query;
    },[query])
    useEffect(()=>{
        const query = ref.current?.value;
        if(!query){
            setSuggsetion([]);
            return;
        }
    },[ref.current?.value])
    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const query = data.get("query") as string;
        setSuggsetion([]);
        onChange(query)
    }
    function handleSuggestion(e:React.FormEvent<HTMLInputElement>){
        const title = e.currentTarget.value as string;
        clearTimeout(sug_id);
        if(title == ""){
            onChange("")
            return setSuggsetion([]) ;
        }
        sug_id = setTimeout(async ()=>{
            const {data} = await GetBookTitleSimilar(title);
            setSuggsetion(Object.keys(data).length > 0 ? Object.keys(data) : ['No book found']);
        },800)
        e.currentTarget.value = title;
    }
  return (
    <>
        <form className="max-w-md mx-auto min-w-[70%] my-5 relative" onSubmit={handleSubmit}>   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input ref={ref} onKeyDown={e=>{if(e.key=="enter")setSuggsetion([])}}  type="search" name="query" onChange={handleSuggestion} defaultValue={query}  id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
            {suggsetion.length > 0 && <div className='absolute z-10 rounded-b-md bg-white px-5 w-full h-fit'>
                {suggsetion.map((e,i)=><p className='py-3 cursor-pointer' onClick={(event)=>{
                    let title = event.currentTarget.innerText;
                    setSuggsetion([])
                    if(title == 'No book found')
                            return 
                    setQuery(title)
                    onChange(title);
                }} key={i}>{e}</p>)}
            </div>}
        </form>

    </>
  )
}
