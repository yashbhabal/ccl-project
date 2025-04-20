"use client"
import { Book } from '@/backend/datatypes';
import Image from 'next/image';
import React, { FormEvent } from 'react'
import { useState } from 'react'
import { AddNewBookToDB } from '@/backend/database';
import { z } from 'zod';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { DeleteQuery, Genres, SetQuery } from '@/backend/commonCli';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
export default function AddNewBook() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParam = useSearchParams()
  const [show,setShow] = useState<boolean>(false);
  const [img,setimg] = useState<string |null>(null);
  type book = z.infer<typeof Book>;
  async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const FormElement = e.currentTarget;
    const formData = new FormData(e.target as HTMLFormElement);
    const data:book = {
      name:formData.get("name") as string,
      author:formData.get('author') as string,
      price:parseInt(formData.get('price') as string),
      qty:parseInt(formData.get("qty") as string) ,
      description:formData.get("description") as string,
      image:img as string,
      genres:formData.get("genres") as string,
      ebook:false
    }
    const req = await AddNewBookToDB(data);
      if(req.sucess){
      FormElement.reset();
      setimg(null);
      setShow(false)
    }else{
    }
  }
  async function deleteImage() {
    if(!img)
        return
    SetQuery([router,pathName,searchParam],{'deleteImg':img as string})
    setTimeout(()=>{
      DeleteQuery([router,pathName,searchParam],'deleteImg')
    },300)
    setimg(null)
  }
  function closeBlur(){
    // this function delete image if it's alread upload to cloud
    if(img){
      deleteImage()
    }
    setimg(null)
    setShow(e=>!e)
  }
  return (
    <>
    <button onClick={()=>setShow(e=>!e)} className=' z-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Add new book</button>
    <div className='overflow-hidden mb-8 w-[150px] z-10 h-full'>
      <div  onClick={closeBlur} className={`fixed backdrop-blur-3xl h-full bg-grey min-w-[100%] min-h-[95vh] top-0 left-[0%] ${!show && "hidden"}`} />
      <div className={`absolute left-[35%] top-[2%]  ${!show && 'hidden'} `}>
        <div className='flex fixed flex-row content-between items-start' >
            <form onSubmit={handleSubmit} className=" max-w-sm mx-auto  w-[500px] bg-white p-[30px] rounded-lg">
              <div  className="relative z-0 w-full mb-5 group">
                <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Book Name</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="author" id="author" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="author" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author Name</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                  <label htmlFor="genres" className="block mb-2 text-gray-500 text-sm font-medium  dark:text-white">Genres</label>
                    <select id="genres" name='genres' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>Choose a Genres</option>
                      {Genres.map((e,i)=><option key={i} value={e}>{e}</option>)}
                  </select>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input type="number" name="price" id="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input type="number" name="qty" id="qty" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="qty" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantity</label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book description</label>
                <textarea id="message" name='description'  rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
              </div>
              <div className='flex justify-evenly'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                <button type="reset" onClick={()=>setimg(null)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reset</button>
              </div>
              <div className={`flex items-center justify-center w-full ${img && 'hidden'}`}>
                  <label   className="flex flex-col items-center justify-center w-full h-32 mt-5 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      
                      <CldUploadWidget uploadPreset={`ebook_upload`}
                      //@ts-ignore
                      onSuccess={(result:{info:{secure_url:string},event:string}) => {
                          if(result.event == 'success')
                            setimg(result?.info?.secure_url);
                      }}
                      >
                          {({ open }) => { 
                            return (
                              <div onClick={()=>open()} className="flex flex-col items-center justify-center pt-2 pb-3">
                                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                  </svg>
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                              </div>
                            );
                          }}
                      </CldUploadWidget>
                  </label>
              </div> 
            </form>
            <div className='mx-3'>
              <Image src="/close.png" onClick={deleteImage} className={`${img==null && "hidden"} absolute right-[-3%] top-[-3%]`} width={30} height={30} alt='Image placeholder'/>
              <Image src={img ? img : "/imageholder.svg"} className='mx-5' height={600} width={200} alt='Image placeholder'/>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
