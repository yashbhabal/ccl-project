'use client'
import { ebookFonts } from "@/backend/commonCli";
import { Rendition } from "epubjs";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";

export default function Reader({url}:{url:string}) {
  const [location, setLocation] = useState<string | number>(0)
  const rendition = useRef<Rendition | undefined>(undefined)
  const [lang,setLang] = useState<string>("")
  const[size,setSize] = useState<number>(0)
  useEffect(() => {
    rendition.current?.themes.fontSize(`${size}px`)
    rendition.current?.themes.override('font-family', lang)
    if(lang == "" && size == 0){
        const size = localStorage.getItem("ebook-size")
        const font = localStorage.getItem("ebook-font-family")
        setLang(font ? font : ebookFonts[0])
        setSize(size && !isNaN(parseInt(size)) ? parseInt(size) : 12)
    }else{
        localStorage.setItem("ebook-size",`${size}px`)
        localStorage.setItem("ebook-font-family",`${lang}`)
    }
  }, [size,lang])
  return (
    <>
    <div className='w-full h-[88vh] flex justify-center align-middle items-start flex-row-reverse'>
      <div  className="h-full w-[80%] mt-16">
        <ReactReader
          url={url}
          location={location}
          locationChanged={(epubcfi: string) => setLocation(epubcfi)}
          getRendition={(_rendition: Rendition) => {
            rendition.current = _rendition
            _rendition.themes.fontSize(`${size}px`)
            _rendition.themes.override('font-family',lang)
          }}
          />
      </div>
      <div className="bg-white h-fit mt-16 mx-3 p-5">
        <div>
            <form className="max-w-xs mx-auto">
                <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Font size</label>
                <div className="relative flex items-center max-w-[8rem]">
                    <button onClick={()=>setSize(e=>e-2)} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                        </svg>
                    </button>
                    <input  value={size} type="text" id="quantity-input"  data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                    <button onClick={()=>setSize(e=>e+2)} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
        <div>
            <form className="max-w-sm mt-5">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Change Font</label>
            <select id="countries" onChange={e=>setLang(e.currentTarget.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option >Select Font</option>
                {ebookFonts.map(e=><option key={e} selected={e == lang} value={e}>{e}</option>)}
            </select>
            </form>
        </div>
        <Link href={'/dashboard/ebooks'} className="text-center">
            <span className="mt-3 inline-flex items-center font-medium text-blue-600 dark:text-blue-500 ">
                <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                </svg>
                go back
            </span>
        </Link>
      </div>
    </div>
    </>
  )
}
