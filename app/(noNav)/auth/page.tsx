import { verifySession } from '@/backend/session'
import AuthForm from '@/components/AuthForm'
import ToastServer from '@/components/ToastServer'
import React from 'react'

export default  async function page() {
  const {session} = await verifySession()
  if(session){
    return <ToastServer msz='You are Login In' type='success' path='/books'/>
  }
  return (
    <> 
      <div className='relative'>
        <AuthForm/>
      </div>
    </>
  )
}