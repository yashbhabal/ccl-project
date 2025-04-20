import Image from 'next/image'
import React from 'react'

export default function loading() {
  return (
    <div className="h-screen  w-full flex justify-center">
        <Image className="self-center" alt="loading" src={'/loading.gif'} unoptimized width={150} height={150}/>
    </div>
  )
}
