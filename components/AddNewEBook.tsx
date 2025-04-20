"use client"
import { AWSUpload } from '@/backend/cloud';
import {  computeSHA256 } from '@/backend/commonCli';
import { GetBookTitleSimilar } from '@/backend/database';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FormEvent} from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';

export default function AddNewEBook() {
  const [show,setShow] = useState<boolean>(false);
  const [load,setLoad] = useState<boolean>(false);
  const [bookId,setBookId] = useState<[string,number]|[]>([]);
  const [suggestion,setSuggestion] = useState<{[key:string]:number}>({});
  const [file,setFile] = useState<File | null>(null);
  const router = useRouter()
  let id:NodeJS.Timeout;
  async function handleSubmit(e:FormEvent<HTMLInputElement>){
      const title = e.currentTarget.value
      if(title == "")
        return setSuggestion({})
        
      clearTimeout(id)
      id = setTimeout(async ()=>{
          const req = await GetBookTitleSimilar(title)
            setSuggestion(req.data);
      },350)
  }
  function onSelectSuggestionTitle(data:[string,number]){
    setSuggestion({})
    setBookId(data);
  }
  function handleFileSelect(e:FormEvent<HTMLInputElement>){
      if(e.currentTarget.files && e.currentTarget.files[0])
          setFile(e.currentTarget.files[0])
  }
  // useEffect(()=>{
  //   if(preStat.success){
  //     console.log("yes eys trye")
  //     toast.success("Book upload sucessfull")
  //     router.push("/admin/ebooks")
  //     setShow(false)
  //     setLoad(false)
  //   }
  // },[preStat,router])
  async function handleFileUpload(){
    try{
      setLoad(false)
      if(!file || !bookId || !bookId[0])
        return 
      const checksum = await computeSHA256(file);
      const {data,error,success} = await AWSUpload(file.type,file.size,checksum,bookId[1]!)
      if(!success){
        throw new Error(error);
      }
      const req = await fetch(data, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      })
      toast.success("Ebook Upload Successful");
      router.refresh();
    }catch(e){
        let error = "";
        (e instanceof Error) ? error = e.message : "Error occured while uplading file";
        toast.error(`${e}`) 
    }finally{
      setShow(false)
      setLoad(false)
      setFile(null)
    }
  }
  return (        
    <>
    <button onClick={()=>{setShow(e=>!e); setSuggestion({}); setBookId([])}} className=' z-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Add new book</button>
    <div className='overflow-hidden mb-8 w-[150px] z-10 h-full'>
      <div  onClick={()=> setShow(e=>!e)} className={`fixed backdrop-blur-3xl h-full bg-grey min-w-[100%] min-h-[95vh] top-0 left-[0%] ${!show && "hidden"}`} />
      <div className={`absolute left-[35%] top-[2%]  ${!show && 'hidden'} `}>
        <div className='flex fixed flex-row content-between items-start' >
            {/* Search title  */}

            {bookId.length == 0 && <form onSubmit={e=>e.preventDefault()}  className=" max-w-sm mx-auto  w-[500px] bg-white p-[30px] rounded-lg">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" onChange={handleSubmit} onEmptied={()=>setSuggestion({})} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Ebook Title To Add" required />
                    {Object.keys(suggestion).length > 0 && <div className='absolute z-10 rounded-b-md bg-white px-5 w-full h-fit'>
                      {Object.keys(suggestion).map((e,i)=><p className='py-3 cursor-pointer' onClick={()=>onSelectSuggestionTitle([e,suggestion[e]])}  key={i} >{e}</p>)}
                    </div>}
                </div>
            </form> }
            {bookId.length > 0 && <form  className=" max-w-sm mx-auto  w-[500px] bg-white p-[30px] rounded-lg text-center">
              <p className="text-start mb-3 text-gray-500 dark:text-gray-400">Name - <br/>{bookId[0]}</p>
                {!file && <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Upload Ebook</p>
                            <p className="my-1 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">EPUB</p>
                        </div>
                        <input id="dropzone-file" onChange={handleFileSelect} type="file" className="hidden"  />
                    </label>
                </div> }
                {file && <div id="alert-5" className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="alert">
                  <div className="ms-3 text-sm fo nt-medium text-gray-800 dark:text-gray-300">
                      {file.name}
                  </div>
                  <button type="button" onClick={e=>setFile(null)} className="ms-auto -mx-1.5 -my-1.5 bg-gray-50 text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white" data-dismiss-target="#alert-5" aria-label="Close">
                    <span className="sr-only">Dismiss</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                  </button>
                </div>}
                {file && <button type="button" disabled={load} onClick={handleFileUpload} className="text-white my-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  {!load ? "Upload" : "Uploading....."}
                </button>}
            </form>} 
        </div>
      </div>
    </div>
    </>
  )
}
