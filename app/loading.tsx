import Image from 'next/image'
import React from 'react'

export default function loading() {
  return (
    <div className="h-full  w-full flex justify-center items-center">
        <Image className="self-center" alt="loading" src={'/loading.gif'} unoptimized width={150} height={150}/>
    </div>
  )
}
