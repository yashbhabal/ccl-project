'use server'
import { GetAddress, GetAllEBookForUser, getCartBookDB } from '@/backend/database'
import { verifySession } from '@/backend/session'
import ToastServer from '@/components/ToastServer'
import CalculateTotalOrderPlace from '@/components/User/CalculateTotalOrderPlace'
import SelectAddres from '@/components/User/SelectAddres'
import ShowOrderPlaceTable from '@/components/User/ShowOrderPlaceTable'
import { permanentRedirect } from 'next/navigation'
import React from 'react'
import { boolean, number } from 'zod'
export default async function page({searchParams}:{
  searchParams?:{
      book:string
  }
}) {
  const {user} =await verifySession()
  if(!user) permanentRedirect('/auth')
  if(!searchParams?.book) permanentRedirect('/books')
  let target_books:{[book_id:string]:{qty:number,ebook:boolean}} = JSON.parse(searchParams.book)
  
  let books = await getCartBookDB(Object.keys(target_books).map(e=>parseInt(e)).filter(e=>!isNaN(e)));
  const {data} =  await GetAddress()
  let total = 0;
  let unavailable_books:{[key:string]:number} = {}
  const UsersEBooks = await GetAllEBookForUser()
  if(typeof UsersEBooks == "boolean") // don't worry just to remove type error 
      return
  Object.keys(target_books).forEach((id)=>{
    const target_book = books.data.find(e=>e.id == parseInt(id))!;
    // book not available
    if(target_book.qty == 0 && !target_book.ebook)
        unavailable_books[target_book.id!] = 1;
      // ebook not available and type is ebook 
      if(target_books[target_book.id!]['ebook'] && !target_book.ebook)
        unavailable_books[target_book.id!] = 1;
      // physical not available and type is physical
      if(!target_books[target_book.id!]['ebook'] && target_books[target_book.id!]['qty'] > target_book.qty)
        target_books[target_book.id!]['qty'] = target_book.qty;
      // user already has Ebook and trying to buy ebook again
      if(target_books[target_book.id!]['ebook'] && id in UsersEBooks)
        unavailable_books[target_book.id!] = 1;
  },)
  books.data = books.data.filter(e=>{
    if(!(e.id! in unavailable_books))
      return e;
  })
  if(books.data.length === 0)
      return <ToastServer msz='Books not available' path='/books' type='error'/>
  books.data.forEach(e=>{
    if(target_books[e.id!]['ebook']){
      target_books[e.id!]['qty'] = 1; // make sure to only able to buy 1 ebook
    }
    total += target_books[e.id!]['qty']*e.price
  })
  return (
    <>
    
      <div className='overflow-hidden min-h-fit w-full'>
      <div className='flex justify-center items-center  flex-wrap pt-14 box-border'>
        <div className='flex justify-center items-start flex-wrap w-full'>
          <ShowOrderPlaceTable data={books} bookQty={target_books}/>
          <div className='mx-5  w-[300px] h-fit rounded-l-2xl flex flex-col items-center'>
              <CalculateTotalOrderPlace total={total}/>
              <SelectAddres address={data} total={total} book={target_books} />
          </div>
        </div>  
      </div>
    </div>
    </>
  )
}
