'use client'
import { LogOutAction } from '@/backend/serverAction'
import { Redirect } from 'next';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect, useRouter} from 'next/navigation';
import React, { FormEvent, useEffect } from 'react'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast';

export default function LogoutBTN() {
    const [admin, formAction] = useFormState(LogOutAction,{error:"",success:false});
    const Router = useRouter()
    function handleLogout(e:FormEvent<HTMLElement>){
        // e.preventDefault();
        toast.success('Logout sucessfull')
        // const data = new FormData();
        // formAction(data)
        return Router.push('/books')
    }
    return (
    <>
        <form  onSubmit={handleLogout} action={formAction} >
                <input type="hidden" value={admin.error}/>
                <button type='submit'  className="text-blue-600 relative inline-flex items-center text-sm font-medium text-center text-blue ">
                    Logout
                </button>
        </form>
    </>
  )
}
